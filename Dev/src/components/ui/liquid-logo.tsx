'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';
import { cn } from '@/src/lib/utils';

interface LiquidLogoProps {
  imageUrl: string;
  className?: string;
  size?: number;
}

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D u_tex;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;
    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.);
      sine_acc = rotate(sine_acc, 1.);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer);
      res += (.5 + .5 * cos(layer)) / scale;
      scale *= 1.2;
    }
    return res.x + res.y;
  }

  void main() {
    vec4 tex = texture2D(u_tex, vUv);
    if (tex.a < 0.01) discard;

    vec2 uv = vUv * 0.5;
    float t = u_time * 0.001;
    float noise = neuro_shape(uv, t);

    // Adjust noise to be a shimmer effect rather than a transparency mask
    noise = clamp(noise, 0.0, 1.0);
    float shimmer = 0.5 + 0.5 * noise; // Shimmer between 50% and 100% brightness

    // Use the logo's original color and alpha, but modulate brightness with the liquid effect
    gl_FragColor = vec4(tex.rgb * shimmer, tex.a);
  }
`;

export const LiquidLogo: React.FC<LiquidLogoProps> = ({
  imageUrl,
  className,
  size = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      width: size,
      height: size,
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;

    const camera = new Camera(gl);
    camera.position.z = 5;

    const scene = new Transform();

    const texture = new Texture(gl);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      texture.image = img;
    };

    const geometry = new Plane(gl, { width: 2, height: 2 });
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_tex: { value: texture },
        u_time: { value: 0 },
        u_resolution: { value: [size, size] },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let animationFrameId: number;
    const render = (time: number) => {
      program.uniforms.u_time.value = time;
      renderer.render({ scene, camera });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageUrl, size]);

  return (
    <div ref={containerRef} className={cn("relative flex items-center justify-center", className)}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
    </div>
  );
};

export default LiquidLogo;
