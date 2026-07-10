import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Laptop Model constructed from 3D primitives (very light, high performance)
const Laptop = () => {
  const groupRef = useRef();

  // Slow organic rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Laptop Keyboard Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Screen Hinge & Lid */}
      <group position={[0, 0.04, -0.8]} rotation={[Math.PI / 2.3, 0, 0]}>
        {/* Screen Backing */}
        <mesh castShadow position={[0, 0.75, 0]}>
          <boxGeometry args={[2.4, 1.5, 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, 0.75, 0.035]}>
          <planeGeometry args={[2.3, 1.4]} />
          <meshBasicMaterial color="#0c0f1d" />
        </mesh>

        {/* Floating Code Simulation / Glowing Screen graphics */}
        <mesh position={[0, 0.75, 0.038]}>
          <planeGeometry args={[2.1, 1.2]} />
          {/* Create an glowing digital mesh */}
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} toneMapped={false}>
            <canvasTexture attach="map" image={createCodeCanvas()} />
          </meshBasicMaterial>
        </mesh>

        {/* Screen light emission */}
        <pointLight position={[0, 0.5, 0.5]} intensity={1.5} color="#38bdf8" distance={3} />
      </group>

      {/* Trackpad */}
      <mesh position={[0, 0.045, 0.55]}>
        <planeGeometry args={[0.5, 0.35]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Generates a mock editor screen text texture dynamically on a canvas element
const createCodeCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Editor background
    ctx.fillStyle = '#0c1020';
    ctx.fillRect(0, 0, 512, 320);

    // Sidebar
    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, 45, 320);

    // Top window controls (Red, Yellow, Green dots)
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(12, 12, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.arc(24, 12, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(36, 12, 4, 0, Math.PI * 2); ctx.fill();

    // Editor tab
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(55, 5, 120, 25);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('App.jsx', 70, 22);

    // Lines numbers
    ctx.fillStyle = '#334155';
    ctx.font = '11px monospace';
    for (let i = 1; i <= 14; i++) {
      ctx.fillText(String(i), 15, 35 + i * 18);
    }

    // Mock Code Writing
    const codeLines = [
      { text: "import React from 'react';", color: "#8b5cf6" },
      { text: "import { Canvas } from '@react-three/fiber';", color: "#8b5cf6" },
      { text: "", color: "" },
      { text: "const SimranPortfolio = () => {", color: "#e2e8f0" },
      { text: "  const [skills, setSkills] = useState({", color: "#38bdf8" },
      { text: "    frontend: 'React.js',", color: "#f43f5e" },
      { text: "    backend: 'Node.js',", color: "#f43f5e" },
      { text: "    database: 'MongoDB'", color: "#f43f5e" },
      { text: "  });", color: "#38bdf8" },
      { text: "", color: "" },
      { text: "  return (", color: "#e2e8f0" },
      { text: "    <div className='world-class-ux'>", color: "#10b981" },
      { text: "      <MernDeveloper name='Simran' />", color: "#f43f5e" },
      { text: "    </div>", color: "#10b981" },
    ];

    codeLines.forEach((line, idx) => {
      if (line.text) {
        ctx.fillStyle = line.color;
        ctx.font = 'bold 12px monospace';
        ctx.fillText(line.text, 65, 53 + idx * 18);
      }
    });
  }

  return canvas;
};

// Floating digital particle ring / sphere
const FloatingRing = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={sphereRef} position={[-2.4, 1.2, -1.5]}>
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh scale={1.05}>
        <sphereGeometry args={[0.7, 8, 8]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// Ambient floating shapes
const FloatingShapes = () => {
  return (
    <>
      {/* 3D Cube */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} position={[2.2, 1, -1]}>
        <mesh rotation={[1, 1, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>

      {/* 3D Torus Node */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.2} position={[-1.8, -1.2, 0.5]}>
        <mesh rotation={[0.5, 0.2, 1.5]}>
          <torusGeometry args={[0.25, 0.08, 12, 24]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
    </>
  );
};

// Scene controls and mouse parallax
const Scene = () => {
  const sceneRef = useRef();

  // Mouse Parallax effect on the scene group
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.4;
      if (sceneRef.current) {
        sceneRef.current.rotation.y = x;
        sceneRef.current.rotation.x = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <group ref={sceneRef}>
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow />
      <spotLight position={[-5, 5, 2]} angle={0.3} penumbra={1} intensity={1} color="#8b5cf6" />
      <pointLight position={[2, -2, -2]} intensity={0.5} color="#38bdf8" />

      {/* Floating Laptop */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6} floatingRange={[-0.1, 0.1]}>
        <Laptop />
      </Float>

      {/* Orbit Sphere */}
      <FloatingRing />

      {/* Floating primitives */}
      <FloatingShapes />

      {/* Background digital grid floor */}
      <group position={[0, -1.8, 0]}>
        <Grid 
          renderOrder={-1} 
          position={[0, -0.01, 0]} 
          args={[30, 30]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#334155" 
          sectionSize={5} 
          sectionThickness={1} 
          sectionColor="#38bdf8" 
          fadeDistance={10} 
        />
      </group>
    </group>
  );
};

export const ThreeCanvas = () => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
