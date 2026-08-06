import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';

/* ------------------------------------------------------------------ */
/*  Custom fresnel-glass shader                                        */
/*  A hand-written ShaderMaterial: rim-lit glass with an animated       */
/*  internal noise displacement driven by a uTime uniform, plus a      */
/*  cyan -> lime gradient mixed by view-angle fresnel.                  */
/* ------------------------------------------------------------------ */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying float vNoise;

  // Simple 3D noise (Ashima-style, trimmed for size)
  vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNoise = snoise(position * 1.6 + uTime * 0.25);
    vec3 displaced = position + normal * vNoise * uDistort;

    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying float vNoise;

  void main() {
    float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0), 2.4);
    vec3 base = mix(uColorA, uColorB, fresnel);
    float glow = smoothstep(-0.4, 0.9, vNoise) * 0.35;
    vec3 color = base + glow * uColorB;
    float alpha = clamp(fresnel * 1.4 + 0.12, 0.0, uOpacity);
    gl_FragColor = vec4(color, alpha);
  }
`;

function GlassKnot({ reducedMotion }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const targetTilt = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.18 },
      uColorA: { value: new THREE.Color('#5CF4E8') },
      uColorB: { value: new THREE.Color('#C7FF3E') },
      uOpacity: { value: 0.9 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = t;

    // Idle autorotation — always on, slower if reduced motion
    const rotSpeed = reducedMotion ? 0.05 : 0.14;
    meshRef.current.rotation.y += delta * rotSpeed;
    meshRef.current.rotation.z += delta * (rotSpeed * 0.4);

    // Pointer-tracked tilt (disabled under reduced motion)
    if (!reducedMotion) {
      targetTilt.current.x = (state.pointer.y * Math.PI) / 10;
      targetTilt.current.y = (state.pointer.x * Math.PI) / 8;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetTilt.current.x,
        0.04
      );
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        state.pointer.x * 0.4,
        0.03
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        state.pointer.y * 0.25,
        0.03
      );
    }

    // Hover scale smoothing
    const target = hovered ? 1.12 : 1;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.08);
    meshRef.current.scale.setScalar(scaleRef.current * Math.min(viewport.width / 8, 1.2));

    materialRef.current.uniforms.uDistort.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uDistort.value,
      hovered ? 0.32 : 0.18,
      0.06
    );
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={reducedMotion ? 0 : 0.3} floatIntensity={reducedMotion ? 0 : 0.6}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1.15, 0.36, 260, 32, 2, 3]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function AmbientParticles({ count = 400 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#5CF4E8"
        size={0.014}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} intensity={12} color="#5CF4E8" />
      <pointLight position={[-4, -2, -3]} intensity={8} color="#C7FF3E" />
    </>
  );
}

/**
 * HeroScene — the immersive 3D canvas anchoring the hero section.
 * Exposes a `canvasWrapperRef` target class ("hero-canvas-wrapper")
 * so GSAP ScrollTrigger in Hero.jsx can move/scale the whole canvas
 * as a DOM element during scroll, without touching R3F internals.
 */
export default function HeroScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="hero-canvas-wrapper absolute inset-0 md:relative w-full h-full">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5.2], fov: 40 }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <GlassKnot reducedMotion={reducedMotion} />
          {!reducedMotion && <AmbientParticles />}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
