// Sunset.tsx
import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Define the shader material with extra uniforms: speed, scale
const SunsetMaterial = shaderMaterial(
  {
    iTime: 0,
    iResolution: new THREE.Vector2(1, 1),
    speed: 0.3, // default slower speed
    scale: 1.0, // default scale (no scale change)
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
  `,
  // Fragment Shader with speed and scale uniforms used
  `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform float speed;
  uniform float scale;
  varying vec2 vUv;

  vec3 calc(float x, vec3 a, vec3 b, vec3 c, vec3 d)
  {
    return (b - d) * sin(1.0 / (vec3(x) / c + 2.0 / radians(180.0) - a)) + d;
  }

  void main() {
    // Scale uv around the center (0.5, 0.5)
    vec2 uv = (vUv - 0.5) * scale + 0.5;

    vec3 p_dark[4];
    p_dark[0] = vec3(0.3720705374951474, 0.3037080684557225, 0.26548632969565816);
    p_dark[1] = vec3(0.446163834012046, 0.39405890487346595, 0.425676737673072);
    p_dark[2] = vec3(0.16514907579431481, 0.40461292460006665, 0.8799446225003938);
    p_dark[3] = vec3(-7.057075230154481e-17, -0.08647963850488945, -0.269042973306185);

    vec3 p_bright[4];
    p_bright[0] = vec3(0.38976745480184677, 0.31560358280318124, 0.27932656874);
    p_bright[1] = vec3(1.2874522895367628, 1.0100154283349794, 0.862325457544);
    p_bright[2] = vec3(0.12605043174959588, 0.23134451619328716, 0.526179948359);
    p_bright[3] = vec3(-0.0929868539256387, -0.07334463258550537, -0.192877259333);

    float x = 0.3 + 0.7 * sin(uv.x * radians(60.0) + (iTime * speed - 4.0) * radians(30.0));

    vec3 a = mix(p_dark[0], p_bright[0], x);
    vec3 b = mix(p_dark[1], p_bright[1], x);
    vec3 c = mix(p_dark[2], p_bright[2], x);
    vec3 d = mix(p_dark[3], p_bright[3], x);

    vec3 col = calc(uv.y, a, b, c, d);

    gl_FragColor = vec4(col, 1.0);
  }
`
);

extend({ SunsetMaterial });

type SunsetProps = {
  speed?: number; // Optional speed control (default slower)
  scale?: number; // Optional scaling (default 1)
};

const SunsetShaderPlane = ({ speed = 0.3, scale = 1 }: SunsetProps) => {
  const ref = useRef<any>(null);

  useFrame(({ clock, size }) => {
    if (ref.current) {
      ref.current.uniforms.iTime.value = clock.elapsedTime;
      ref.current.uniforms.iResolution.value.set(size.width, size.height);
      ref.current.uniforms.speed.value = speed;
      ref.current.uniforms.scale.value = scale;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[4, 1.5]} />
      <sunsetMaterial ref={ref} />
    </mesh>
  );
};

const Sunset = ({ speed, scale }: SunsetProps) => {
  return (
    <Canvas
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}
className="blur-sm"    >
      <SunsetShaderPlane speed={speed} scale={scale} />
    </Canvas>
  );
};

export default Sunset;
