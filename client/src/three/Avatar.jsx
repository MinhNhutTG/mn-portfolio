import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Capsule, Sphere, Torus, Octahedron, Icosahedron } from '@react-three/drei';

const GOLD = '#d4af37';
const GOLD_LIGHT = '#f5e1a4';
const PURPLE = '#8b5cf6';
const DARK = '#15151f';

const goldMaterial = (
  <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.25} />
);
const goldLightMaterial = (
  <meshStandardMaterial color={GOLD_LIGHT} metalness={0.7} roughness={0.2} />
);
const darkMaterial = (
  <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.4} />
);
const purpleGlow = (intensity = 1.5) => (
  <meshStandardMaterial color={PURPLE} emissive={PURPLE} emissiveIntensity={intensity} roughness={0.2} />
);

export default function Avatar(props) {
  const group = useRef();
  const ringOuter = useRef();
  const ringInner = useRef();
  const head = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y += delta * 0.35;
    if (ringOuter.current) ringOuter.current.rotation.z += delta * 0.6;
    if (ringInner.current) ringInner.current.rotation.z -= delta * 0.9;
    if (head.current) head.current.position.y = 1.62 + Math.sin(t * 1.5) * 0.03;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Head */}
      <group ref={head} position={[0, 1.62, 0]}>
        <Icosahedron args={[0.32, 1]}>{goldMaterial}</Icosahedron>
        {/* Visor */}
        <mesh position={[0, 0.02, 0.22]} rotation={[0.15, 0, 0]}>
          <sphereGeometry args={[0.19, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial
            color={PURPLE}
            emissive={PURPLE}
            emissiveIntensity={1.4}
            metalness={0.2}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Neck */}
      <Capsule args={[0.08, 0.06, 4, 8]} position={[0, 1.32, 0]}>
        {darkMaterial}
      </Capsule>

      {/* Torso */}
      <RoundedBox args={[0.7, 0.9, 0.42]} radius={0.12} smoothness={4} position={[0, 0.75, 0]}>
        {goldMaterial}
      </RoundedBox>

      {/* Chest emblem */}
      <Octahedron args={[0.1, 0]} position={[0, 0.85, 0.23]}>
        {purpleGlow(2)}
      </Octahedron>

      {/* Shoulders + Arms */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Sphere args={[0.13, 16, 16]} position={[0.46 * side, 1.1, 0]}>
            {goldLightMaterial}
          </Sphere>
          <Capsule args={[0.09, 0.46, 4, 8]} position={[0.46 * side, 0.72, 0]}>
            {darkMaterial}
          </Capsule>
          <Sphere args={[0.1, 16, 16]} position={[0.46 * side, 0.4, 0]}>
            {goldMaterial}
          </Sphere>
        </group>
      ))}

      {/* Hips */}
      <RoundedBox args={[0.55, 0.25, 0.36]} radius={0.1} smoothness={4} position={[0, 0.2, 0]}>
        {darkMaterial}
      </RoundedBox>

      {/* Legs */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Capsule args={[0.11, 0.6, 4, 8]} position={[0.16 * side, -0.25, 0]}>
            {goldMaterial}
          </Capsule>
          <RoundedBox args={[0.18, 0.1, 0.3]} radius={0.04} position={[0.16 * side, -0.62, 0.06]}>
            {purpleGlow(0.6)}
          </RoundedBox>
        </group>
      ))}

      {/* Floating rings */}
      <Torus ref={ringOuter} args={[0.95, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} metalness={1} roughness={0} />
      </Torus>
      <Torus ref={ringInner} args={[1.15, 0.006, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.88, 0]}>
        {purpleGlow(1.6)}
      </Torus>
    </group>
  );
}
