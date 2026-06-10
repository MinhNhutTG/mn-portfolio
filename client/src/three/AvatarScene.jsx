import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows, PresentationControls } from '@react-three/drei';
import Avatar from './Avatar';

export default function AvatarScene() {
  return (
    <Canvas camera={{ position: [0, 0.6, 4], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} color="#f5e1a4" />
      <pointLight position={[-4, 1, -3]} intensity={6} color="#8b5cf6" />
      <pointLight position={[3, -2, 3]} intensity={3} color="#d4af37" />

      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0, 0.35, 0]}
          polar={[-0.2, 0.25]}
          azimuth={[-1.2, 1.2]}
          config={{ mass: 2, tension: 180 }}
          snap={{ mass: 4, tension: 200 }}
        >
          <Float rotationIntensity={0.35} floatIntensity={0.7} speed={1.4}>
            <Avatar position={[0, -0.25, 0]} scale={1.15} />
          </Float>
        </PresentationControls>

        <Sparkles count={70} scale={5} size={2.5} speed={0.4} color="#d4af37" />
        <ContactShadows position={[0, -1.45, 0]} opacity={0.5} scale={6} blur={2.6} far={2} color="#000000" />
      </Suspense>
    </Canvas>
  );
}
