/**
 * viewer/platform.js
 * Crea la plataforma decorativa (base + pasto) sobre la que se muestra el modelo 3D.
 */
import * as THREE from "three";

export function createPlatform() {
  const group = new THREE.Group();

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.9, 2.1, 0.18, 96),
    new THREE.MeshStandardMaterial({ color: 0xd8c7a8, roughness: 0.82, metalness: 0.02 })
  );
  base.position.y = -0.1;
  base.receiveShadow = true;
  group.add(base);

  const grassMat = new THREE.MeshStandardMaterial({ color: 0x8f9364, roughness: 0.9 });
  for (let i = 0; i < 28; i++) {
    const blade  = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.32, 5), grassMat);
    const angle  = (i / 28) * Math.PI * 2;
    const radius = 0.65 + Math.random() * 1.05;
    blade.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);
    blade.rotation.set(Math.random() * 0.35, angle, Math.random() * 0.35);
    group.add(blade);
  }

  return group;
}
