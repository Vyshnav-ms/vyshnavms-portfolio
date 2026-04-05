import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Camera z=10, fov=60 → visible height ≈ 11.5, width ≈ 20.5 at z=0

interface ShootingStar {
  line: THREE.Line;
  mat: THREE.LineBasicMaterial;
  startX: number;
  startY: number;
  z: number;
  vx: number;
  vy: number;
  speed: number;
  life: number;
  maxLife: number;
  trailLen: number;
}

function randomStar(): Omit<ShootingStar, "line" | "mat"> {
  const angle = (-Math.PI / 4) + (Math.random() - 0.5) * 0.6; // mostly down-right
  return {
    startX: -12 + Math.random() * 18,
    startY: 3.5 + Math.random() * 4,
    z: -1 + Math.random() * 2,
    vx: Math.cos(angle),
    vy: Math.sin(angle),
    speed: 6 + Math.random() * 9,
    life: Math.random() * 3,   // stagger initial positions
    maxLife: 2.5 + Math.random() * 2,
    trailLen: 1.2 + Math.random() * 2.5,
  };
}

function ShootingStarField({ count = 10 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const group = groupRef.current;
    const stars: ShootingStar[] = [];

    for (let i = 0; i < count; i++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));

      const mat = new THREE.LineBasicMaterial({
        color: 0xe8c96a,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;
      group.add(line);

      stars.push({ line, mat, ...randomStar() });
    }

    starsRef.current = stars;
    return () => { group.clear(); };
  }, [count]);

  useFrame((_, delta) => {
    starsRef.current.forEach((s) => {
      s.life += delta;

      // Respawn when done
      if (s.life >= s.maxLife) {
        const next = randomStar();
        s.startX  = next.startX;
        s.startY  = next.startY;
        s.z       = next.z;
        s.vx      = next.vx;
        s.vy      = next.vy;
        s.speed   = next.speed;
        s.maxLife = next.maxLife;
        s.trailLen = next.trailLen;
        s.life    = 0;
        s.mat.opacity = 0;
        return;
      }

      const t = s.life / s.maxLife;

      // Head position
      const hx = s.startX + s.vx * s.life * s.speed;
      const hy = s.startY + s.vy * s.life * s.speed;

      // Tail trails behind by trailLen, but fades in over first 20% of life
      const trailFade = Math.min(t / 0.2, 1);
      const tx = hx - s.vx * s.trailLen * trailFade;
      const ty = hy - s.vy * s.trailLen * trailFade;

      const pos = s.line.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, tx, ty, s.z);  // tail
      pos.setXYZ(1, hx, hy, s.z);  // head
      pos.needsUpdate = true;

      // Fade in quickly, hold, fade out near the end
      s.mat.opacity = Math.sin(Math.min(t, 1 - t) * Math.PI * 1.4) * 0.9;
    });
  });

  return <group ref={groupRef} />;
}

function Scene() {
  return (
    <>
      {/* Deep star field */}
      <Stars
        radius={100}
        depth={60}
        count={3500}
        factor={3}
        saturation={0.1}
        fade
        speed={0.3}
      />
      {/* Shooting stars */}
      <ShootingStarField count={10} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 200 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
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
