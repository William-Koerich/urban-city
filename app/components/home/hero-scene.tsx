"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Grid 3D discreto no fundo do hero — atmosfera "urbana/blueprint", nada
 * figurativo. Cuidados de performance, já que isso é 100% decorativo:
 * - não desenha nada se o usuário pedir menos movimento;
 * - geometria bem leve (grid 40x40) e sem antialiasing forçado;
 * - pixel ratio limitado a 1.5, mesmo em telas retina/4K;
 * - o loop de animação para quando a seção sai da viewport ou a aba perde
 *   foco, e é sempre cancelado/destruído ao desmontar.
 */
export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const styles = getComputedStyle(document.documentElement);
    const inkColor = styles.getPropertyValue("--foreground").trim() || "#15140f";
    const bgColor = styles.getPropertyValue("--background").trim() || "#f7f5f0";

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color(bgColor).getHex(), 6, 15);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
    camera.position.set(0, 2.6, 6);
    camera.lookAt(0, 0, -3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const segments = 40;
    const geometry = new THREE.PlaneGeometry(24, 24, segments, segments);
    geometry.rotateX(-Math.PI / 2.4);
    const basePositions = Float32Array.from(
      geometry.attributes.position.array
    );

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(inkColor),
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const grid = new THREE.Mesh(geometry, material);
    grid.position.y = -1.4;
    grid.position.z = -4;
    scene.add(grid);

    function resize() {
      if (!container) return;
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pausa o loop de render fora da viewport (scroll) ou com a aba oculta.
    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
      },
      { threshold: 0 }
    );
    io.observe(container);

    function onVisibilityChange() {
      if (document.hidden) running = false;
      else {
        const rect = container!.getBoundingClientRect();
        running = rect.bottom > 0 && rect.top < window.innerHeight;
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Leve parallax de mouse, sem sair muito da posição original da câmera.
    const pointer = { x: 0, y: 0 };
    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    container.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    let frameId = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!running) return;

      const t = clock.getElapsedTime();
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        const wave =
          Math.sin(x * 0.35 + t * 0.5) * 0.18 +
          Math.cos(y * 0.3 + t * 0.4) * 0.18;
        positions.setZ(i, basePositions[i * 3 + 2] + wave);
      }
      positions.needsUpdate = true;

      camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (2.6 - pointer.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -3);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10"
    />
  );
}
