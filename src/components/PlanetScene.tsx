import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  isExoplanet: boolean;
}

const Planet = ({ isExoplanet }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      // Add gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const planetColor = isExoplanet ? "#10b981" : "#ec4899";

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={planetColor}
        emissive={planetColor}
        emissiveIntensity={0.3}
        roughness={0.7}
        metalness={0.2}
      />
    </Sphere>
  );
};

const PlanetScene = ({ isExoplanet }: PlanetProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      <Planet isExoplanet={isExoplanet} />
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  );
};

export default PlanetScene;
