"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AiOrbCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.sin(t * 0.15 + 1) * 0.1;
      glowRef.current.rotation.y = Math.sin(t * 0.25 + 1) * 0.1;
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <MeshDistortMaterial
          color="#2563EB"
          emissive="#2563EB"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          distort={0.3}
          speed={2}
          wireframe
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshDistortMaterial
          color="#2563EB"
          emissive="#06B6D4"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
          distort={0.15}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function ParticleRing({ radius = 3, count = 60, color = "#2563EB" }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + Math.sin(i * 0.5) * 0.3;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle * 2) * 0.3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [radius, count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingParticles({ count = 100 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 3;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pos[i * 3 + 2] = Math.cos(phi) * r;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7C3AED"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function AiOrbScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#2563EB" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7C3AED" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <AiOrbCore />
        </Float>
        <ParticleRing radius={3.2} count={80} color="#2563EB" />
        <ParticleRing radius={3.8} count={50} color="#7C3AED" />
        <FloatingParticles count={120} />
      </Canvas>
    </div>
  );
}
