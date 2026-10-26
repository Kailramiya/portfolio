import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// Shared, normalized pointer (-1..1). Module-level so mousemove never triggers
// a React re-render; the animation loop reads it directly each frame.
const pointer = { x: 0, y: 0 };

const CREAM = '#e8e2d7';
const LIME = '#d3ff43';

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

// Faceted planet with a tilted lime ring and two orbiting lime solids.
function Planet() {
  const planet = useRef();
  const outer = useRef();

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (planet.current) planet.current.rotation.y += d * 0.12;
    if (outer.current) {
      outer.current.rotation.y += (pointer.x * 0.35 - outer.current.rotation.y) * 0.03;
      outer.current.rotation.x += (-pointer.y * 0.2 - outer.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={outer}>
      <mesh ref={planet}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshStandardMaterial color={CREAM} flatShading roughness={0.85} metalness={0.05} />
      </mesh>

      <group rotation={[1.25, 0.25, -0.35]}>
        <mesh>
          <torusGeometry args={[2.35, 0.025, 12, 160]} />
          <meshBasicMaterial color={LIME} />
        </mesh>
      </group>

      {/* Faint outer orbits */}
      <mesh rotation={[1.5, 0, 0.2]}>
        <torusGeometry args={[3.0, 0.004, 8, 200]} />
        <meshBasicMaterial color={CREAM} transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[3.35, 0.003, 8, 200]} />
        <meshBasicMaterial color={CREAM} transparent opacity={0.1} />
      </mesh>

      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[1.75, 0.85, 0.6]} rotation={[1.2, 0.3, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.32, 6]} />
          <meshStandardMaterial color={LIME} flatShading roughness={0.6} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={1.6} floatIntensity={1.6}>
        <mesh position={[-1.1, -1.65, 0.9]} rotation={[0.4, 0, 0.6]}>
          <tetrahedronGeometry args={[0.42]} />
          <meshStandardMaterial color={LIME} flatShading roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  usePointerTracking();
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-4, 5, 6]} intensity={1.6} />
      <directionalLight position={[5, -3, -2]} intensity={0.35} color={LIME} />
      <Planet />
    </Canvas>
  );
}
