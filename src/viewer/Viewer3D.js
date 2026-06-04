/**
 * viewer/Viewer3D.js
 * Clase que encapsula la escena Three.js, cámara, renderer,
 * controles y loop de animación. Diseñada para usarse desde
 * React vía useRef + useEffect.
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createPlatform } from "./platform.js";
import { loadModel, disposeObject } from "./modelLoader.js";

export class Viewer3D {
  constructor(canvas) {
    this.canvas = canvas;
    this._activeKey  = null;   // "<slug>/<layer>" para evitar recargas
    this._model      = null;
    this._raf        = 0;

    // Escena
    this._scene = new THREE.Scene();
    this._scene.background = null;

    // Cámara
    this._camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    // Renderer
    this._renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this._renderer.outputColorSpace  = THREE.SRGBColorSpace;
    this._renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.12;
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    // Controles de órbita
    this._controls = new OrbitControls(this._camera, canvas);
    this._controls.enableDamping    = true;
    this._controls.dampingFactor    = 0.06;
    this._controls.enablePan        = false;
    this._controls.minDistance      = 2.2;
    this._controls.maxDistance      = 9;
    this._controls.autoRotate       = true;
    this._controls.autoRotateSpeed  = 0.95;

    // Iluminación
    const hemi = new THREE.HemisphereLight(0xffffff, 0x8f886f, 2.8);
    this._scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 2.9);
    key.position.set(4, 6, 5);
    this._scene.add(key);

    const fill = new THREE.DirectionalLight(0xfff2d2, 1.35);
    fill.position.set(-4, 3, -4);
    this._scene.add(fill);

    // Plataforma decorativa
    this._platform = createPlatform();
    this._scene.add(this._platform);

    // Ajuste de tamaño con ResizeObserver
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(canvas);
    this._resize();

    // Arrancar loop
    this._loop();
  }

  // ─── Privados ────────────────────────────────────────────────────────────

  _resize() {
    const { width: w, height: h } = this.canvas.getBoundingClientRect();
    const W = Math.max(1, Math.floor(w));
    const H = Math.max(1, Math.floor(h));
    this._renderer.setSize(W, H, false);
    this._camera.aspect = W / H;
    this._camera.updateProjectionMatrix();
  }

  _loop() {
    this._raf = requestAnimationFrame(() => this._loop());
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }

  _fitModel(model, speciesData) {
    const box    = new THREE.Box3().setFromObject(model);
    const size   = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    model.position.sub(center);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    model.scale.setScalar(speciesData.viewer.scale / maxAxis);

    const fitted = new THREE.Box3().setFromObject(model);
    model.position.y -= fitted.min.y - 0.02;
    model.rotation.y = speciesData.viewer.rotationY ?? 0;
  }

  // ─── Públicos ────────────────────────────────────────────────────────────

  /**
   * Carga la especie y capa indicadas. Si ya están activas, no hace nada.
   * @param {object} speciesData  Datos de la especie (de data/species/)
   * @param {string} layerSlug    Slug de la capa ("general" | "huesos" | ...)
   * @param {Function} onLoad     Callback ejecutado cuando el modelo carga
   */
  async loadSpecies(speciesData, layerSlug = "general", onLoad = null) {
    const key = `${speciesData.slug}/${layerSlug}`;
    if (this._activeKey === key) return;
    this._activeKey = key;

    const layer    = speciesData.layers.find(l => l.slug === layerSlug) ?? speciesData.layers[0];
    const modelUrl = layer?.modelUrl ?? speciesData.layers[0].modelUrl;

    // Limpiar modelo anterior
    if (this._model) {
      this._scene.remove(this._model);
      disposeObject(this._model);
      this._model = null;
    }

    try {
      const gltf  = await loadModel(modelUrl);
      const model = gltf.scene.clone(true);

      model.traverse(child => {
        if (!child.isMesh) return;
        child.castShadow = child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.min(child.material.roughness ?? 0.8, 0.92);
        }
      });

      this._fitModel(model, speciesData);
      this._scene.add(model);
      this._model = model;

      this._camera.position.set(...speciesData.viewer.camera);
      this._controls.target.set(0, 0.72, 0);
      this._controls.update();

      onLoad?.();
    } catch (err) {
      console.error("[Viewer3D] Error al cargar modelo:", err);
      throw err;
    }
  }

  /** Libera todos los recursos de WebGL y cancela el RAF. */
  dispose() {
    cancelAnimationFrame(this._raf);
    this._ro?.disconnect();
    if (this._model) disposeObject(this._model);
    disposeObject(this._platform);
    this._renderer.dispose();
    this._activeKey = null;
  }
}
