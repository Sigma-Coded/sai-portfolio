"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type BackgroundProps = {
  theme: "light" | "dark";
};

export default function Background({ theme }: BackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(theme === "dark" ? 0x040507 : 0xf8fafc, 12, 28);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "-1";
    renderer.domElement.style.pointerEvents = "none";

    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const pointer = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const cleanupFns: Array<() => void> = [];

    const addBlackHole = () => {
      const geometries: THREE.BufferGeometry[] = [];
      const materials: THREE.Material[] = [];
      const objects: THREE.Object3D[] = [];

      const coreGeometry = new THREE.SphereGeometry(1.35, 96, 96);
      geometries.push(coreGeometry);
      const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      materials.push(coreMaterial);
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      objects.push(core);
      group.add(core);

      const rimInnerRadius = 1.45;
      const rimOuterRadius = 2.9;
      const rimGeometry = new THREE.RingGeometry(rimInnerRadius, rimOuterRadius, 220, 4);
      geometries.push(rimGeometry);

      const innerColor = new THREE.Color(0xff5a2f); // golden red
      const outerColor = new THREE.Color(0xffd28a); // light orange
      const colorArray = new Float32Array(rimGeometry.attributes.position.count * 3);
      const pos = rimGeometry.attributes.position;
      for (let i = 0; i < pos.count; i += 1) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const radius = Math.sqrt(x * x + y * y);
        const t = Math.min(1, Math.max(0, (radius - rimInnerRadius) / (rimOuterRadius - rimInnerRadius)));
        const c = innerColor.clone().lerp(outerColor, t);
        colorArray[i * 3] = c.r;
        colorArray[i * 3 + 1] = c.g;
        colorArray[i * 3 + 2] = c.b;
      }
      rimGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

      const rimMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });
      materials.push(rimMaterial);
      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.rotation.x = Math.PI / 2;
      (rim as THREE.Mesh).userData.spin = 0.0015;
      objects.push(rim);
      group.add(rim);

      const glowGeometry = new THREE.RingGeometry(rimInnerRadius + 0.2, rimOuterRadius + 0.5, 180, 3);
      geometries.push(glowGeometry);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffb87a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });
      materials.push(glowMaterial);
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.rotation.x = Math.PI / 2;
      (glow as THREE.Mesh).userData.spin = -0.0009;
      objects.push(glow);
      group.add(glow);

      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 1400;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        const radius = 2 + Math.random() * 3.6;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.7;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometries.push(particleGeometry);
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.032,
        color: 0xffc999,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
      });
      materials.push(particleMaterial);
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      objects.push(particles);
      group.add(particles);

      const emberGeometry = new THREE.BufferGeometry();
      const emberCount = 900;
      const emberPositions = new Float32Array(emberCount * 3);
      for (let i = 0; i < emberCount; i += 1) {
        const radius = 2 + Math.random() * 4.2;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.35;
        emberPositions[i * 3] = Math.cos(angle) * radius;
        emberPositions[i * 3 + 1] = y;
        emberPositions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      emberGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(emberPositions, 3)
      );
      geometries.push(emberGeometry);
      const emberMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xff7b45,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      materials.push(emberMaterial);
      const embers = new THREE.Points(emberGeometry, emberMaterial);
      objects.push(embers);
      group.add(embers);

      return () => {
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        objects.forEach((object) => group.remove(object));
      };
    };

    const addCodeGrid = () => {
      const sprites: THREE.Sprite[] = [];
      const chars = ["{", "}", "<", "/", ";", "#", "$", "=>", "01", "()"];

      const createCharTexture = (value: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext("2d");
        if (!context) return new THREE.CanvasTexture(canvas);
        context.fillStyle = "rgba(15,23,42,0.05)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(14,165,233,0.9)";
        context.font = "bold 28px monospace";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(value, canvas.width / 2, canvas.height / 2);
        return new THREE.CanvasTexture(canvas);
      };

      for (let i = 0; i < 90; i += 1) {
        const label = chars[i % chars.length];
        const texture = createCharTexture(label);
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(material);
        sprite.position.set(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4
        );
        const scale = 0.7 + Math.random() * 0.6;
        sprite.scale.set(scale, scale, scale);
        group.add(sprite);
        sprites.push(sprite);
      }

      const nodes: THREE.Mesh[] = [];
      for (let i = 0; i < 180; i += 1) {
        const geometry = new THREE.SphereGeometry(0.02, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x0f172a : 0x0ea5e9,
          transparent: true,
          opacity: 0.65,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 4
        );
        group.add(mesh);
        nodes.push(mesh);
      }

      return () => {
        sprites.forEach((sprite) => {
          sprite.material.dispose();
          sprite.material.map?.dispose();
          group.remove(sprite);
        });
        nodes.forEach((node) => {
          node.geometry.dispose();
          (node.material as THREE.Material).dispose();
          group.remove(node);
        });
      };
    };

    cleanupFns.push(theme === "dark" ? addBlackHole() : addCodeGrid());

    const ambient = new THREE.AmbientLight(
      theme === "dark" ? 0xffcfa3 : 0x0ea5e9,
      theme === "dark" ? 0.7 : 0.8
    );
    scene.add(ambient);

    const pointLight = new THREE.PointLight(
      theme === "dark" ? 0xff8c5a : 0xa855f7,
      theme === "dark" ? 1.8 : 1.4,
      90
    );
    pointLight.position.set(0, 3, 8);
    scene.add(pointLight);

    const onMouseMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.7;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.7;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    onResize();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y += 0.001 + pointer.x * 0.002;
      group.rotation.x += pointer.y * 0.001;

      group.children.forEach((child) => {
        const spin = (child as THREE.Object3D & { userData?: { spin?: number } }).userData
          ?.spin;
        if (typeof spin === "number") {
          child.rotation.z += spin;
        }
        if (child instanceof THREE.Points) {
          child.rotation.y += 0.0008;
          child.rotation.x = Math.sin(elapsed * 0.08) * 0.05;
        }
        if (child instanceof THREE.Sprite) {
          child.position.y += 0.006;
          if (child.position.y > 4) child.position.y = -4.5;
        }
      });

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cleanupFns.forEach((fn) => fn());
      scene.clear();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [theme]);

  return <div ref={mountRef} aria-hidden className="pointer-events-none" />;
}
