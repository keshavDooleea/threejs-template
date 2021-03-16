import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// debug panel
const gui = new dat.GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// 1st: objects: shape/body
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

// 2nd: materials: skin/cloth
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0xff0000);

// 3rd: combine with Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * window sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// allow responsiveness
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// for animation
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // update Orbital Controls
  // controls.update()

  // render
  renderer.render(scene, camera);

  // animate again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
