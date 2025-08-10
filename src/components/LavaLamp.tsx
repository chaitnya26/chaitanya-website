import { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";


// Custom lava lamp shader material
const LavaLampMaterial = shaderMaterial(
  {
    iResolution: [1, 1, 1],
    iTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Enhanced for glow, fluidity, color depth)
  `
    uniform vec3 iResolution;
    uniform float iTime;
    varying vec2 vUv;

    float rand(int i) {
      return sin(float(i) * 1.64);
    }

    vec3 get_blob(int i, float time) {
      float spd = 0.22;
      float move_range = 0.49;
      vec2 center = vec2(0.5) + 0.11 * vec2(rand(i), rand(i + 44));
      center += move_range * vec2(
        sin(spd * time * rand(i + 31)) * rand(i * 4 + 67),
        cos(spd * time * rand(i + 13)) * rand(i * 7 + 19)
      );
      float radius = 0.18 + 0.13 * abs(rand(i + 9));
      return vec3(center.xy, radius);
    }

    float metaballField(vec2 uv, int num_blobs, float time) {
      float sum = 0.0;
      for (int i = 0; i < 24; i++) {
        if (i >= num_blobs) break;
        vec3 blob = get_blob(i, time);
        float r = blob.z;
        float d = length(uv - blob.xy) / r;
        sum += exp(-4.5 * d * d) * 0.95 + exp(-10.5 * d);
      }
      return sum;
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec2 uv = fragCoord / iResolution.xy;
      uv.x *= iResolution.x / iResolution.y;

      vec3 bg_col     = vec3(0.045, 0.03, 0.065);
      vec3 color_core = vec3(1.0, 0.24, 0.05);
      vec3 color_mid  = vec3(1.0, 0.58, 0.08);
      vec3 color_edge = vec3(1.0, 0.9, 0.22);

      int blob_count = 18;
      float field = metaballField(uv, blob_count, iTime);

      float edge = smoothstep(0.31, 0.15, field - 0.69);
      float core = smoothstep(0.61, 0.21, field - 0.89);

      vec3 color = bg_col;
      color = mix(color, color_edge, edge * 0.89);
      color = mix(color, color_mid, core * 0.92);
      color = mix(color, color_core, core * 1.13);

      float bloom = pow(core, 2.4) + pow(edge, 2.6);
      color += (color_core * bloom * 0.36);
      color += (color_mid  * bloom * 0.19);

      float smooth_bg = smoothstep(0.07, 0.16, field - 0.2);
      color = mix(bg_col, color, smooth_bg);

      float finalAlpha = 1.0;
      if (field < 0.18) finalAlpha = 0.94 * smooth_bg;

      gl_FragColor = vec4(color, finalAlpha);
    }
  `
);

extend({ LavaLampMaterial });

function LavaLampShaderBG() {
  const mat = useRef<any>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (mat.current) {
      mat.current.iTime = state.clock.getElapsedTime();
      mat.current.iResolution = [size.width, size.height, 1];
    }
  });

  return (
    <mesh scale={[1, 1, 1]}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <lavaLampMaterial ref={mat} transparent />
    </mesh>
  );
}

export default function LavaLamp() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[-2] blur-2xl"
      style={{ background: "#000000" }}
      aria-hidden="true"
    >
      <Canvas
      orthographic
      camera={{ position: [1, 1, 1], zoom: 3 }}
      gl={{ alpha: true, antialias: true }}
      style={{
        position: "absolute",      // <--- critical to overlay inside parent
        top: 0,
        left: 0,
        width: "200%",
        height: "200%",
        zIndex: 1,
        pointerEvents: "none",    // <--- lets user interact with content above
      }}
    >
        <LavaLampShaderBG />
      </Canvas>
    </div>
  );
}
