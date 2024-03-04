/**
  test.js 

  Main code for the project.

  @author mvievaz@inf.upv.es (c)
*/

// Necessary modules
import Stats from "../lib/stats.module.js";
import * as THREE from "../lib/three.module.js";
import { OrbitControls } from "../lib/OrbitControls.module.js";
import { TWEEN } from "../lib/tween.module.min.js";
import { GUI } from "../lib/lil-gui.module.min.js";

import * as MODELS from "./models.js";
import * as GEO from "./geometry.js";
// Standard variables
let renderer, scene, camera, ground;
let cameraControls, effectController;

//Cont

const wardrobeWidth = 1.5;
const wardrobeHeight = 2;
const wardrobeDepth = 0.6;

// Actions
init();
loadScene();
loadModels();
setupGUI();
render();

function init() {
    // Instantiate the rendering engine
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Instantiate the root node of the scene.
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.5, 0.5, 0.5);

    // Instantiate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(0.5, 2, 7);
    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 1, 0);
    camera.lookAt(0, 1, 0);

    //Light

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0); // from top
    scene.add(directionalLight);

    // Point light (optional)
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 3, 0); // above the scene
    scene.add(pointLight);

    // // Events
    // renderer.domElement.addEventListener('dblclick', animate);
}

function loadScene() {
    // Material
    const material = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true });

    // Ground
    ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.2;
    scene.add(ground)

    // Axes
    scene.add(new THREE.AxesHelper(3));

    // Stats
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    // Create the furniture

    //Lode Geometry using GEO from geometry.js
    GEO.createTable(scene);
    GEO.createBed(scene);
    GEO.createWardrobe(scene,wardrobeWidth,wardrobeHeight,wardrobeDepth);

    // Call the functions to create the room
    GEO.createRoom(scene);
    GEO.createWalls(scene);
    // createWindow(scene);
    GEO.createFrame(scene);
}

//Lode Models using MODELS from models.js
function loadModels() {
    MODELS.addClothesHanger(scene,wardrobeWidth,wardrobeHeight)
    MODELS.tShirtsFolded(scene,wardrobeWidth,wardrobeHeight)
    MODELS.cowboyBoots(scene,wardrobeWidth,wardrobeHeight)
    MODELS.flipFlops(scene,wardrobeWidth,wardrobeHeight)
    MODELS.pairOfShoes(scene,wardrobeWidth,wardrobeHeight)
    MODELS.sneakers(scene,wardrobeWidth,wardrobeHeight)
}

function setupGUI() {
    // Controls
    effectController = {
        groundColor: "rgb(255,255,0)"
    };

    // Creation UI
    const gui = new GUI();

    // Menu construction
    const h = gui.addFolder("Ground Color");
    h.addColor(effectController, "groundColor").name("Ground wire color");

}

function animate(event) {

}

function update() {

    ground.material.setValues({ color: effectController.groundColor });
    TWEEN.update();
}

function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}