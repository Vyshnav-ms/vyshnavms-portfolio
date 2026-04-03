import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { Github, ExternalLink } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  index: string;
}

// ─── 3D Card ──────────────────────────────────────────────────────────────────

interface Card3DProps {
  project: Project;
  posX: number;
  posZ: number;
}

function Card3D({ project, posX, posZ }: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const planeRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const cardColors = {
    border: hovered ? "#06b6d4" : "#1a3050",
    emissive: hovered ? "#06b6d4" : "#061020",
    emissiveIntensity: hovered ? 0.6 : 0.05,
  };

  useFrame(({ clock }) => {
    if (!groupRef.current || !planeRef.current) return;
    // Gentle float
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.6 + posX) * 0.12;
    // Hover tilt
    const targetRotY = hovered ? -0.08 : 0;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    // Emissive pulse on hover
    const mat = planeRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity +=
      (cardColors.emissiveIntensity - mat.emissiveIntensity) * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
      <group
        ref={groupRef}
        position={[posX, 0, posZ]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Glowing backing plane */}
        <mesh ref={planeRef}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshStandardMaterial
            color="#050c1a"
            emissive={cardColors.emissive}
            emissiveIntensity={cardColors.emissiveIntensity}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cyan border frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 2.2)]} />
          <lineBasicMaterial
            color={cardColors.border}
            transparent
            opacity={hovered ? 0.9 : 0.25}
          />
        </lineSegments>

        {/* HTML card content */}
        <Html
          transform
          position={[0, 0, 0.01]}
          style={{ width: "280px", pointerEvents: hovered ? "auto" : "none" }}
          occlude={false}
          center
        >
          <div
            style={{
              fontFamily: "'Orbitron', 'Inter', system-ui, sans-serif",
              background: "rgba(5,12,26,0.98)",
              border: `1px solid ${hovered ? "rgba(6,182,212,0.5)" : "rgba(6,182,212,0.1)"}`,
              borderRadius: "8px",
              padding: "16px",
              width: "280px",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              boxShadow: hovered
                ? "0 0 30px rgba(6,182,212,0.15), 0 8px 32px rgba(0,0,0,0.6)"
                : "0 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(6,182,212,0.4)" }}>
                  {project.index}
                </span>
                <h3 style={{ fontSize: "11px", fontWeight: 700, color: "rgba(200,230,255,0.9)", lineHeight: 1.3, letterSpacing: "0.05em" }}>
                  {project.title}
                </h3>
              </div>
              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "24px", height: "24px", borderRadius: "4px", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)",
                      color: "rgba(200,230,255,0.5)", textDecoration: "none",
                    }}
                  >
                    <Github size={11} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "24px", height: "24px", borderRadius: "4px", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)",
                      color: "rgba(200,230,255,0.5)", textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "10px", lineHeight: 1.6, color: "rgba(200,230,255,0.45)", marginBottom: "10px" }}>
              {project.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "monospace", fontSize: "9px", padding: "2px 6px",
                    borderRadius: "3px", color: "rgba(6,182,212,0.7)",
                    background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.12)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// ─── Lights for Project Scene ──────────────────────────────────────────────────

function ProjectLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} intensity={3} color="#06b6d4" distance={25} decay={2} />
      <pointLight position={[0, -5, 2]} intensity={2} color="#7c3aed" distance={20} decay={2} />
    </>
  );
}

// ─── Camera auto-orbit ─────────────────────────────────────────────────────────

function AutoOrbit({ active }: { active: boolean }) {
  const angle = useRef(0);

  useFrame(({ camera }) => {
    if (!active) return;
    angle.current += 0.003;
    camera.position.x = Math.sin(angle.current) * 10;
    camera.position.z = Math.cos(angle.current) * 10;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Exported canvas ───────────────────────────────────────────────────────────

const CARD_SPACING = 4.5;

interface ProjectSceneProps {
  projects: Project[];
}

export default function ProjectScene({ projects }: ProjectSceneProps) {
  const [autoOrbit, setAutoOrbit] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handlePointerEnter = useCallback(() => setAutoOrbit(false), []);
  const handlePointerLeave = useCallback(() => setAutoOrbit(true), []);

  // Lay out cards in a gentle arc
  const totalWidth = (projects.length - 1) * CARD_SPACING;

  return (
    <div
      ref={canvasRef}
      style={{ width: "100%", height: "520px", position: "relative" }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ProjectLights />
        <AutoOrbit active={autoOrbit} />

        {projects.map((project, i) => {
          const x = i * CARD_SPACING - totalWidth / 2;
          // Slight arc depth
          const z = -Math.abs(x) * 0.08;
          return (
            <Card3D
              key={project.title}
              project={project}
              posX={x}
              posZ={z}
            />
          );
        })}
      </Canvas>

      {/* Interaction hint */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.15em",
          color: "rgba(6,182,212,0.35)",
          pointerEvents: "none",
          textTransform: "uppercase",
        }}
      >
        hover to pause · 3D scene interactive
      </div>
    </div>
  );
}
