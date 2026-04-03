import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import FloatingObjects from "./FloatingObjects";
import ParticleField from "./ParticleField";

// ─── Lighting ─────────────────────────────────────────────────────────────────

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#0a1628" />
      <pointLight position={[-5, 5, 2]} intensity={2.5} color="#06b6d4" distance={20} decay={2} />
      <pointLight position={[5, -3, -2]} intensity={2} color="#7c3aed" distance={20} decay={2} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#c8f5ff" />
    </>
  );
}

// ─── Mouse-reactive camera ────────────────────────────────────────────────────

function CameraRig() {
  const { camera } = useThree();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    // Scroll-based camera depth
    const handleScroll = () => {
      const scrollProgress = window.scrollY / window.innerHeight;
      targetY.current = scrollProgress * 2;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock }) => {
    // Smooth mouse follow (gentle parallax)
    const eased = 0.03;
    camera.position.x += (mouseX.current * 0.6 - camera.position.x) * eased;
    camera.position.y += (-mouseY.current * 0.4 - targetY.current - camera.position.y) * eased;

    // Slow idle sway when not moving
    const t = clock.getElapsedTime() * 0.08;
    camera.position.x += Math.sin(t) * 0.003;
    camera.position.y += Math.cos(t * 0.7) * 0.002;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Inner scene (used inside Canvas) ────────────────────────────────────────

function Scene() {
  return (
    <>
      <SceneLights />
      <CameraRig />

      {/* Deep-space star field from Drei */}
      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={3}
        saturation={0.3}
        fade
        speed={0.5}
      />

      {/* Ambient coloured particle cloud */}
      <ParticleField count={1500} spread={14} speed={0.025} />

      {/* Animated 3D hero objects */}
      <FloatingObjects />
    </>
  );
}

// ─── Exported canvas wrapper ──────────────────────────────────────────────────

/**
 * Full-screen Three.js canvas rendered as the Hero section background.
 * Sits at z-index 0; HTML content overlays on top.
 *
 * Camera starts at z=6 with a narrow FOV for a cinematic feel.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Scene />
    </Canvas>
  );
}
