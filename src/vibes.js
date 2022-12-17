import './style/main.css'
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

let camera, scene, renderer, object, light, mouseMesh, stats;

const clock = new THREE.Clock();

var mouse = {
  x: 0,
  y: 0,
};
init();
animate();

function init() {
  var textureLoader = new THREE.TextureLoader();
  // var texture = textureLoader.load(
  //  "Z:/assets/3d_models/Facer Character/animations/DEEP MOTION/deepmotionfullbody-short-1080_default/deepmotionfullbody-short-1080_female-normal-dmface(includeTPose).fbm/FaceMap.jpg"
  // );
  var material = new THREE.MeshBasicMaterial({ map: texture });
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 100;

  scene = new THREE.Scene();

  //model

  const facer_body = new OBJLoader();
  facer_body.load("obj/glassface_centered_basemesh.obj", function (obj) {
    object = obj;
    object.scale.multiplyScalar(2);
    object.position.y = -340;
    //object = new THREE.Mesh(object, material);
    scene.add(object);
  });

  // const hair = new OBJLoader();
  // hair.load("obj/1.obj", function (obj) {
  //   object = obj;
  //   object.scale.multiplyScalar(200);
  //   object.position.y = -340;
  //   //object.position.x = 100;
  //   //object = new THREE.Mesh(object, material);
  //   //scene.add(object);
  // });

  const sphere = new THREE.SphereGeometry(0.5, 16, 8);

  //lights

  light = new THREE.PointLight(0xff00ff);
  light.position.set(0, 0, 15);
  scene.add(light);
  var lightAmb = new THREE.AmbientLight(0x000000);
  scene.add(lightAmb);

  // Create a circle around the mouse and move it
  // The sphere has opacity 0
  var mouseGeometry = new THREE.SphereGeometry(1, 100, 100);
  var mouseMaterial = new THREE.MeshLambertMaterial({});
  mouseMesh = new THREE.Mesh(mouseGeometry, mouseMaterial);

  mouseMesh.position.set(0, 0, 0);
  scene.add(mouseMesh);

  // When the mouse moves, call the given function

  document.body.addEventListener("mousemove", onMouseMove, false);

  function onMouseMove(event) {
    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Make the sphere follow the mouse
    var vector = new THREE.Vector3(mouse.x, mouse.y, 2);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    //mouseMesh.position.copy(pos);

    light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
  }

  //renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //stats

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


}

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  render();
}

function render() {
  const time = Date.now() * 0.0005;
  const delta = clock.getDelta();

  if (object) object.rotation.y -= 0.5 * delta;

  renderer.render(scene, camera);
}
