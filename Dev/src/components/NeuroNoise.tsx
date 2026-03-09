import React, { useEffect, useRef } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Transform } from 'ogl';

interface Props {
  hue?: number;
  saturation?: number;
  chroma?: number;
  className?: string;
}

export default function NeuroNoise({
  hue = 200,
  saturation = 0.8,
  chroma = 0.6,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
  });

  const vertexShader = `
    precision mediump float;

    attribute vec2 position;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;

    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;
    uniform float u_hue;
    uniform float u_saturation;
    uniform float u_chroma;

    vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;

        for (int j = 0; j < 15; j++) {
            uv = rotate(uv, 1.);
            sine_acc = rotate(sine_acc, 1.);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer); // Removed + 2.4 * p to prevent the dead zone
            res += (.5 + .5 * cos(layer)) / scale;
            scale *= (1.2);
        }
        return res.x + res.y;
    }

    // HSL to RGB conversion
    vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
        return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }

    void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        float p_effect = .5 * pow(1. - p, 2.);
        
        // Warp UV based on pointer to create interaction without destroying the noise
        uv += normalize(pointer + vec2(0.001)) * p_effect * 0.5;

        float t = .001 * u_time;
        vec3 color = vec3(0.);

        float noise = neuro_shape(uv, t, p_effect);

        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        // Removed vignette effect to keep background clean
        // noise *= (1. - length(vUv - .5));

        // Convert hue from degrees to 0-1 range
        float normalizedHue = u_hue / 360.0;
        
        // Create HSL color without animation to keep it consistently pink
        vec3 hsl = vec3(
            normalizedHue,
            u_saturation,
            u_chroma
        );

        // Convert to RGB
        vec3 baseColor = hsl2rgb(hsl);
        
        // Ensure the color stays pink and doesn't wash out to white
        // We use a base pink and add the noise on top
        vec3 backgroundPink = baseColor * 0.15; // Subtle dark pink base
        vec3 highlightPink = baseColor;
        
        // Smooth out the noise to avoid extreme white peaks
        float smoothNoise = clamp(noise, 0.0, 1.0);
        
        color = mix(backgroundPink, highlightPink, smoothNoise);

        // Set a higher base alpha to make it "pink always"
        float alpha = 0.4 + smoothNoise * 0.5;
        
        gl_FragColor = vec4(color, alpha);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const renderer = new Renderer({
        canvas,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      });

      const camera = new Camera(renderer.gl);
      const scene = new Transform();

      const geometry = new Plane(renderer.gl, {
        width: 2,
        height: 2,
      });

      const program = new Program(renderer.gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_ratio: { value: window.innerWidth / window.innerHeight },
          u_pointer_position: { value: [0, 0] },
          u_scroll_progress: { value: 0 },
          u_hue: { value: hue },
          u_saturation: { value: saturation },
          u_chroma: { value: chroma },
        },
      });

      const mesh = new Mesh(renderer.gl, {
        geometry,
        program,
      });

      mesh.setParent(scene);

      rendererRef.current = renderer;
      cameraRef.current = camera;
      sceneRef.current = scene;
      meshRef.current = mesh;

      const resizeCanvas = () => {
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        renderer.setSize(width, height);

        if (mesh.program && mesh.program.uniforms.u_ratio) {
          mesh.program.uniforms.u_ratio.value = width / height;
        }
      };

      let isVisible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(canvas);

      const render = () => {
        animationRef.current = requestAnimationFrame(render);
        if (!isVisible) return;

        const currentTime = performance.now();
        const pointer = pointerRef.current;

        pointer.x += (pointer.tX - pointer.x) * 0.2;
        pointer.y += (pointer.tY - pointer.y) * 0.2;

        if (mesh.program && mesh.program.uniforms) {
          const uniforms = mesh.program.uniforms;
          if (uniforms.u_time) uniforms.u_time.value = currentTime;
          if (uniforms.u_pointer_position) {
            uniforms.u_pointer_position.value = [
              pointer.x / window.innerWidth,
              1 - pointer.y / window.innerHeight,
            ];
          }
          if (uniforms.u_scroll_progress) {
            uniforms.u_scroll_progress.value = window.pageYOffset / (2 * window.innerHeight);
          }
        }

        renderer.render({ scene, camera });
      };

      const updateMousePosition = (x: number, y: number) => {
        pointerRef.current.tX = x;
        pointerRef.current.tY = y;
      };

      const handlePointerMove = (e: PointerEvent) => {
        updateMousePosition(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      };

      const handleClick = (e: MouseEvent) => {
        updateMousePosition(e.clientX, e.clientY);
      };

      resizeCanvas();
      render();

      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('click', handleClick);

      return () => {
        observer.disconnect();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('click', handleClick);
      };
    } catch (error) {
      console.error('Error initializing OGL:', error);
    }
  }, []);

  useEffect(() => {
    if (meshRef.current?.program?.uniforms) {
      meshRef.current.program.uniforms.u_hue.value = hue;
      meshRef.current.program.uniforms.u_saturation.value = saturation;
      meshRef.current.program.uniforms.u_chroma.value = chroma;
    }
  }, [hue, saturation, chroma]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-95 ${className}`}
    />
  );
}
