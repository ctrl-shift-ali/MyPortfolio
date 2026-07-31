import { Component } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Timeline from './components/Timeline';
import ContactFooter from './components/ContactFooter';

/**
 * Guards the WebGL canvas: if @react-three/fiber throws (e.g. no WebGL
 * support, context lost on a low-end device), the rest of the site
 * still renders instead of a blank crash.
 */
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('3D scene failed to mount:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-40 w-40 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/5" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="relative bg-obsidian">
      <div className="grain-overlay" />
      <Navigation />
      <main>
        <SceneErrorBoundary>
          <Hero />
        </SceneErrorBoundary>
        <ProjectsGrid />
        <Timeline />
        <ContactFooter />
      </main>
    </div>
  );
}
