"use client";
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Vertex Shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

// Fragment Shader
const fragmentShader = `
#define PI 3.14159
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

float counter = 0.0;

vec2 grain(vec2 inp){
  float fuzzSize = 0.02;
  float offsetTime = uTime + 20.0;
  counter += (((inp.x * offsetTime * uResolution.x) - 100.0) * (inp.y * offsetTime * uResolution.y));
  inp.x += sin(mod(counter, 6.2436346)) * fuzzSize;
  counter += (((inp.x * offsetTime * uResolution.x) - 100.0) * (inp.y * offsetTime * uResolution.y));
  inp.y += sin(mod(counter, 6.2436346)) * fuzzSize;
  return inp;
}

float isin(float inp){
  return ((sin(inp) + 1.0) * 0.5);
}

float icos(float inp){
  return ((cos(inp) + 1.0) * 0.5);
}

void main() {
  vec2 uv = vUv;
  uv = grain(uv);

  vec2 points[3];
  points[0] = vec2(isin(uTime), 0.5);
  points[1] = vec2(icos(uTime * 0.25), icos(uTime * 0.5));
  points[2] = vec2(0.9, icos(uTime * 0.25));

  float r0 = length(points[0] - uv);
  float r1 = length(points[1] - uv);
  float r2 = length(points[2] - uv);

  vec3 bgCol = vec3(15.0 / 255.0, 9.0 / 255.0, 24.0 / 255.0); // Dark blue
  vec3 blue = vec3(38.0 / 255.0, 83.0 / 255.0, 156.0 / 255.0); // OpenAI blue

  float blend = smoothstep(0.0, 0.4, min(r0, min(r1, r2)));
  vec3 color = mix(blue, bgCol, blend);

  color += 0.04 * sin(uTime * 2.0 + uv.x * 10.0 + uv.y * 10.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function ShaderPlane() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  // Update shader uniforms every frame
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.uResolution.value = [size.width, size.height];
    }
  });

  return (
    <mesh scale={[10, 10, 10]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: [size.width, size.height] },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const SmoothGR: React.FC = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2,
        pointerEvents: "none",
        background: "#0F0918",
      }}
      dpr={typeof window !== "undefined" ? window.devicePixelRatio : 1}
      gl={{ antialias: true }}
      onCreated={({ gl, size, camera }) => {
        camera.position.z = 5; // Optional: adjust camera position if needed
      }}
    >
      <ShaderPlane />
    </Canvas>
  );
};

export default SmoothGR;
