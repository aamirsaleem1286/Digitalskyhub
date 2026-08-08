"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function AwardScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 4, 5]} intensity={1.5} color="#FFD700" />
      <pointLight position={[-4, -2, 3]} intensity={0.6} color="#2563EB" />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#06B6D4" />

      {/* Golden trophy / medal knot */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh position={[3.2, 1.5, 0]}>
          <torusKnotGeometry args={[0.6, 0.22, 64, 8]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.08}
          />
        </mesh>
      </Float>

      {/* Cyan certificate ring */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh
          position={[-3.5, -1.8, -0.5]}
          rotation={[Math.PI / 3, Math.PI / 4, 0]}
        >
          <torusGeometry args={[0.55, 0.09, 32, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            metalness={0.6}
            roughness={0.3}
            emissive="#06B6D4"
            emissiveIntensity={0.05}
          />
        </mesh>
      </Float>

      {/* Small floating gold dots */}
      {[
        [-2, 2.5, -1],
        [4, -1, -1.5],
        [-4.5, 1, -2],
        [1.5, -2.5, -1.5],
        [-1, 0.5, -2.5],
      ].map((pos, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={0.2}
          floatIntensity={0.4 + i * 0.1}
        >
          <mesh position={pos as [number, number, number]}>
            <dodecahedronGeometry args={[0.05 + i * 0.01, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#D4AF37" : "#2563EB"}
              emissive={i % 2 === 0 ? "#D4AF37" : "#2563EB"}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function FloatingAward() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AwardScene />
      </Canvas>
    </div>
  );
}
