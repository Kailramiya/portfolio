import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Icosahedron } from '@react-three/drei';

// Shared, normalized pointer position (-1..1). A single module-level object
// avoids re-rendering React on every mousemove; the 3D loop reads it directly.
const pointer = { x: 0, y: 0 };

function usePointerTracking() {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}

// A spherical shell of particles — the "neural cloud" around the core.
function ParticleField({ count }) {
  const spin = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 1.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!spin.current) return;
    spin.current.rotation.y += delta * 0.05;
    spin.current.rotation.z += delta * 0.012;
  });

  return (
    <group ref={spin}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a78bfa"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
}

// Glowing wireframe core — the "model".
function Core() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.16;
  });
  return (
    <Icosahedron ref={ref} args={[1.35, 1]}>
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        emissive="#6366f1"
        emissiveIntensity={0.55}
        roughness={0.4}
      />
    </Icosahedron>
  );
}

// Drifting accent solids for depth and brand color.
function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2.7, 1.2, -1]}>
          <octahedronGeometry args={[0.34]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.6}>
        <mesh position={[-2.9, -1, -0.5]}>
          <torusGeometry args={[0.3, 0.12, 16, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.45} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={2.6} rotationIntensity={1} floatIntensity={2.6}>
        <mesh position={[2.1, -1.6, 0.4]}>
          <tetrahedronGeometry args={[0.32]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.45} roughness={0.3} />
        </mesh>
      </Float>
    </>
  );
}

// Whole scene tilts gently toward the pointer (eased), giving parallax depth
// without the runaway accumulation of a continuously-spinning group.
function Scene({ count }) {
  const outer = useRef();
  useFrame(() => {
    if (!outer.current) return;
    outer.current.rotation.y += (pointer.x * 0.4 - outer.current.rotation.y) * 0.03;
    outer.current.rotation.x += (-pointer.y * 0.25 - outer.current.rotation.x) * 0.03;
  });
  return (
    <group ref={outer}>
      <ParticleField count={count} />
      <Core />
      <FloatingShapes />
    </group>
  );
}

export default function Hero3D() {
  usePointerTracking();
  // Lighter particle budget on small screens for smooth mobile framerates.
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 1300 : 2800;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -5]} intensity={0.7} color="#10b981" />
      <Suspense fallback={null}>
        <Scene count={count} />
      </Suspense>
    </Canvas>
  );
}
