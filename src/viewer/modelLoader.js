/**
 * viewer/modelLoader.js
 * Singleton de GLTFLoader con caché por URL.
 * Evita recargar el mismo GLB al cambiar de capa y de vuelta.
 */
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const cache  = new Map(); // url → Promise<gltf>

/**
 * Carga un modelo GLB. Devuelve una promesa cacheada si ya fue pedido antes.
 * @param {string} url  Ruta al archivo .glb
 * @returns {Promise<GLTF>}
 */
export function loadModel(url) {
  if (!cache.has(url)) {
    const promise = new Promise((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
    cache.set(url, promise);
  }
  return cache.get(url);
}

/** Libera todos los recursos Three.js de un objeto y sus hijos. */
export function disposeObject(object) {
  if (!object) return;
  object.traverse(child => {
    child.geometry?.dispose();
    const mats = child.material
      ? Array.isArray(child.material) ? child.material : [child.material]
      : [];
    mats.forEach(m => {
      Object.values(m).forEach(v => { if (v?.isTexture) v.dispose(); });
      m.dispose();
    });
  });
}

/** Limpia la caché (útil si se actualizan los modelos en desarrollo). */
export function clearModelCache() {
  cache.clear();
}
