import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Torus, Cone } from "@react-three/drei";
import * as THREE from "three";

function Atom() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]} scale={0.8}>
      <Sphere args={[0.5, 16, 16]}>
        <meshBasicMaterial color="#0066ff" wireframe />
      </Sphere>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </Torus>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
      </Torus>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, -Math.PI / 4]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </Torus>
    </group>
  );
}

function FloatingBook({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <group rotation={rotation}>
        <Box args={[1.2, 0.2, 0.8]}>
          <meshStandardMaterial color="#131c35" roughness={0.2} metalness={0.8} />
        </Box>
        <Box args={[1.1, 0.18, 0.7]} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#f0f4ff" roughness={0.9} />
        </Box>
      </group>
    </Float>
  );
}

function GradCap() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[-3, 1, -1]}>
      <group rotation={[0.2, 0.5, 0]}>
        {/* Base of cap */}
        <Cone args={[0.6, 0.5, 32]} position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
          <meshStandardMaterial color="#0f1629" roughness={0.8} />
        </Cone>
        {/* Top flat part */}
        <Box args={[1.8, 0.05, 1.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#131c35" roughness={0.8} />
        </Box>
        {/* Tassel base */}
        <Sphere args={[0.08, 16, 16]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#fbbf24" />
        </Sphere>
      </group>
    </Float>
  );
}

export function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#3b82f6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
      
      <Atom />
      <FloatingBook position={[3, -2, -3]} rotation={[0.2, -0.4, 0.1]} />
      <FloatingBook position={[-2, -2, -4]} rotation={[-0.2, 0.8, -0.1]} />
      <GradCap />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true}
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </>
  );
}
