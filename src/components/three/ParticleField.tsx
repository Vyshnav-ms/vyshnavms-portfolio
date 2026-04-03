import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  speed?: number;
  colors?: string[];
}

/**
 * Ambient particle field rendered inside an R3F Canvas.
 * Uses BufferGeometry for performance (single draw call).
 */
export default function ParticleField({
  count = 2000,
  spread = 18,
  speed = 0.04,
  colors = ["#06b6d4", "#7c3aed", "#c8e6ff"],
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colorArray } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const palette = colors.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = spread * (0.3 + Math.random() * 0.7);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Assign color from palette
      const col = palette[Math.floor(Math.random() * palette.length)];
      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;
    }
    return { positions, colorArray };
  }, [count, spread, colors]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime() * speed;
    pointsRef.current.rotation.y = t;
    pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
