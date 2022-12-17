import './style/main.css'
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const gui = new dat.GUI()



const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

/**
 * Object
 */

const facer_body = new OBJLoader();
facer_body.load("obj/glassface_centered_basemesh.obj", function (obj) {
  object = obj;
  object.scale.multiplyScalar(2);
  object.position.y = 0;
  //object = new THREE.Mesh(object, material);
  scene.add(object);
});
//const geometry = new THREE.IcosahedronGeometry(20, 1)
//const material = new THREE.MeshNormalMaterial()
// Material Props.
//material.wireframe = true
// Create Mesh & Add To Scene
//const mesh = new THREE.Mesh(geometry, material)
//scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const textureLoader = new THREE.TextureLoader();
const texture = new THREE.Color(0xffffff);
const environmentLight = new THREE.CubeTexture( [ texture, texture, texture, texture, texture, texture ] );
scene.background = environmentLight;


window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  5000
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 50
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
// controls.enableZoom = false
controls.enablePan = false
controls.dampingFactor = 0.05
controls.maxDistance = 1000
controls.minDistance = 30
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //mesh.rotation.y += 0.01 * Math.sin(1)
  //mesh.rotation.y += 0.01 * Math.sin(1)
  //mesh.rotation.z += 0.01 * Math.sin(1)

  // Update controls
  controls.update()
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()



















// let camera, scene, renderer, object, light, mouseMesh, stats;

// const clock = new THREE.Clock();

// var mouse = {
//   x: 0,
//   y: 0,
// };
// init();
// animate();

// function init() {
//   var textureLoader = new THREE.TextureLoader();
//   // var texture = textureLoader.load(
//   //  "Z:/assets/3d_models/Facer Character/animations/DEEP MOTION/deepmotionfullbody-short-1080_default/deepmotionfullbody-short-1080_female-normal-dmface(includeTPose).fbm/FaceMap.jpg"
//   // );
//   var material = new THREE.MeshBasicMaterial({ map: texture });
//   camera = new THREE.PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     1,
//     1000
//   );
//   camera.position.z = 100;

//   scene = new THREE.Scene();

//   //model

//   const facer_body = new OBJLoader();
//   facer_body.load("obj/glassface_centered_basemesh.obj", function (obj) {
//     object = obj;
//     object.scale.multiplyScalar(2);
//     object.position.y = -340;
//     //object = new THREE.Mesh(object, material);
//     scene.add(object);
//   });

//   // const hair = new OBJLoader();
//   // hair.load("obj/1.obj", function (obj) {
//   //   object = obj;
//   //   object.scale.multiplyScalar(200);
//   //   object.position.y = -340;
//   //   //object.position.x = 100;
//   //   //object = new THREE.Mesh(object, material);
//   //   //scene.add(object);
//   // });

//   const sphere = new THREE.SphereGeometry(0.5, 16, 8);

//   //lights

//   light = new THREE.PointLight(0xff00ff);
//   light.position.set(0, 0, 15);
//   scene.add(light);
//   var lightAmb = new THREE.AmbientLight(0x000000);
//   scene.add(lightAmb);

//   // Create a circle around the mouse and move it
//   // The sphere has opacity 0
//   var mouseGeometry = new THREE.SphereGeometry(1, 100, 100);
//   var mouseMaterial = new THREE.MeshLambertMaterial({});
//   mouseMesh = new THREE.Mesh(mouseGeometry, mouseMaterial);

//   mouseMesh.position.set(0, 0, 0);
//   scene.add(mouseMesh);

//   // When the mouse moves, call the given function

//   document.body.addEventListener("mousemove", onMouseMove, false);

//   function onMouseMove(event) {
//     // Update the mouse variable
//     event.preventDefault();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // Make the sphere follow the mouse
//     var vector = new THREE.Vector3(mouse.x, mouse.y, 2);
//     vector.unproject(camera);
//     var dir = vector.sub(camera.position).normalize();
//     var distance = -camera.position.z / dir.z;
//     var pos = camera.position.clone().add(dir.multiplyScalar(distance));
//     //mouseMesh.position.copy(pos);

//     light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
//   }

//   //renderer

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   //stats

//   stats = new Stats();
//   document.body.appendChild(stats.dom);

//   window.addEventListener("resize", onWindowResize);

//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }
//   geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//   const cube = new THREE.Mesh( geometry, material );
//   scene.add( cube );


// }

// function animate() {
//   requestAnimationFrame(animate);
//   stats.update();
//   render();
// }

// function render() {
//   const time = Date.now() * 0.0005;
//   const delta = clock.getDelta();

//   if (object) object.rotation.y -= 0.5 * delta;

//   renderer.render(scene, camera);
// }
