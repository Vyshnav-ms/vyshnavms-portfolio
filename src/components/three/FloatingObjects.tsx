import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Neural network node — a glowing sphere representing a neuron.
 */
interface NeuronProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  pulseSpeed?: number;
  pulsePhase?: number;
}

function Neuron({ position, size = 0.08, color = "#06b6d4", pulseSpeed = 1, pulsePhase = 0 }: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * pulseSpeed + pulsePhase;
    const pulse = 0.85 + Math.sin(t) * 0.15;
    meshRef.current.scale.setScalar(pulse);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.5 + Math.sin(t) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/**
 * Animated signal pulse travelling along a neural edge.
 */
interface PulseProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  speed: number;
  phase: number;
}

function Pulse({ start, end, color, speed, phase }: PulseProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = ((clock.getElapsedTime() * speed + phase) % 1 + 1) % 1;
    meshRef.current.position.lerpVectors(start, end, t);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    // Fade at the endpoints
    const fade = Math.sin(t * Math.PI);
    mat.opacity = fade * 0.9;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/**
 * Glowing edge (line) between two neural nodes.
 */
interface EdgeProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  opacity?: number;
  color?: string;
}

function Edge({ start, end, opacity = 0.15, color = "#06b6d4" }: EdgeProps) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([start, end]);
    return g;
  }, [start, end]);

  return (
    <primitive object={new THREE.Line(geom, new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    }))} />
  );
}

// ─── Network layout ───────────────────────────────────────────────────────────

const NODE_CONFIGS = [
  // Layer 0 — input layer
  { pos: [-5, 1.5, -2] as [number, number, number], color: "#06b6d4", phase: 0 },
  { pos: [-5, -0.5, -2] as [number, number, number], color: "#06b6d4", phase: 1.2 },
  { pos: [-5, -2.5, -2] as [number, number, number], color: "#06b6d4", phase: 2.4 },
  // Layer 1 — hidden layer
  { pos: [-1.5, 3, -3] as [number, number, number], color: "#7c3aed", phase: 0.3 },
  { pos: [-1.5, 1, -3] as [number, number, number], color: "#7c3aed", phase: 1.1 },
  { pos: [-1.5, -1, -3] as [number, number, number], color: "#7c3aed", phase: 1.9 },
  { pos: [-1.5, -3, -3] as [number, number, number], color: "#7c3aed", phase: 2.7 },
  // Layer 2 — hidden layer 2
  { pos: [2, 2, -3] as [number, number, number], color: "#a78bfa", phase: 0.6 },
  { pos: [2, 0, -3] as [number, number, number], color: "#a78bfa", phase: 1.6 },
  { pos: [2, -2, -3] as [number, number, number], color: "#a78bfa", phase: 2.6 },
  // Layer 3 — output
  { pos: [5, 0.8, -2] as [number, number, number], color: "#10b981", phase: 0.8 },
  { pos: [5, -0.8, -2] as [number, number, number], color: "#10b981", phase: 2 },
];

// Edge connections [from, to] index pairs
const EDGE_PAIRS: [number, number][] = [
  // input → hidden1
  [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6],
  // hidden1 → hidden2
  [3, 7], [3, 8], [4, 7], [4, 8], [4, 9], [5, 8], [5, 9], [6, 8], [6, 9],
  // hidden2 → output
  [7, 10], [7, 11], [8, 10], [8, 11], [9, 10], [9, 11],
];

/**
 * Animated neural network mesh — the main 3D coding/AI hero element.
 */
export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Very slow Y rotation so the whole network gently rotates
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.25;
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
  });

  const nodeVecs = useMemo(
    () => NODE_CONFIGS.map((n) => new THREE.Vector3(...n.pos)),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {NODE_CONFIGS.map((node, i) => (
        <Neuron
          key={i}
          position={node.pos}
          color={node.color}
          pulseSpeed={0.8 + i * 0.07}
          pulsePhase={node.phase}
          size={0.11}
        />
      ))}

      {/* Edges */}
      {EDGE_PAIRS.map(([a, b], i) => (
        <Edge
          key={i}
          start={nodeVecs[a]}
          end={nodeVecs[b]}
          color={i % 3 === 0 ? "#7c3aed" : "#06b6d4"}
          opacity={0.12}
        />
      ))}

      {/* Signal pulses travelling along edges */}
      {EDGE_PAIRS.slice(0, 12).map(([a, b], i) => (
        <Pulse
          key={`p-${i}`}
          start={nodeVecs[a]}
          end={nodeVecs[b]}
          color={NODE_CONFIGS[a].color}
          speed={0.3 + i * 0.05}
          phase={i * 0.25}
        />
      ))}
    </group>
  );
}

// ─── Floating code symbols ────────────────────────────────────────────────────

const CODE_SYMBOLS = [
  { text: "</>", pos: [3.5, 2.5, -4] as [number, number, number], color: "#06b6d4" },
  { text: "{}", pos: [-3, 3, -5] as [number, number, number], color: "#7c3aed" },
  { text: "AI", pos: [4, -2, -4] as [number, number, number], color: "#10b981" },
  { text: "=>", pos: [-4, -1.5, -5] as [number, number, number], color: "#a78bfa" },
  { text: "λ", pos: [0, 3.5, -6] as [number, number, number], color: "#06b6d4" },
  { text: "∇", pos: [-1.5, -3, -5] as [number, number, number], color: "#7c3aed" },
];

interface CodeSymbolProps {
  text: string;
  position: [number, number, number];
  color: string;
  index: number;
}

function CodeSymbol({ position, color, index }: CodeSymbolProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.4 + index * 1.2;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.2;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.3;
  });

  // Use small geometric shapes to represent code symbols
  const geom = index % 2 === 0
    ? <boxGeometry args={[0.25, 0.25, 0.05]} />
    : <torusGeometry args={[0.12, 0.04, 8, 16]} />;

  return (
    <mesh ref={meshRef} position={position}>
      {geom}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.6}
        wireframe={index % 3 === 0}
      />
    </mesh>
  );
}

export function FloatingCodeSymbols() {
  return (
    <group>
      {CODE_SYMBOLS.map((s, i) => (
        <CodeSymbol
          key={i}
          text={s.text}
          position={s.pos}
          color={s.color}
          index={i}
        />
      ))}
    </group>
  );
}

// ─── Binary / data particle stream ───────────────────────────────────────────

export function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#06b6d4"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#10b981"),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = -8 - Math.random() * 12;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const t = clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      // Rain-like downward drift + a little horizontal sway
      let y = pos.getY(i) - 0.008;
      if (y < -7) y = 7;
      const x = pos.getX(i) + Math.sin(t * 0.3 + i * 0.1) * 0.001;
      pos.setXY(i, x, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Default export (backward-compatible) ────────────────────────────────────
export default function FloatingObjects() {
  return (
    <group>
      <NeuralNetwork />
      <FloatingCodeSymbols />
      <DataParticles />
    </group>
  );
}
