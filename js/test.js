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

const tableWidth = -2;
const tableHeight = 0.7;
const tableDepth = -3.3;

const bedWidth = 1.5;
const bedHeight = 0.35;
const bedDepth = -2.5;

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

    // Ambient light
    var ambientLight = new THREE.AmbientLight(0x404040); // Grey color.
    scene.add(ambientLight);

    // // Crear una luz direccional
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direccional blanca con intensidad 0.5
    // directionalLight.position.set(0, 1, 0); // Posición de la luz
    // scene.add(directionalLight);

    // // Crear una luz puntual
    // var pointLight = new THREE.PointLight(0xffffcc, 0.5, 20); // Luz puntual roja con intensidad 1 y distancia 100
    // pointLight.position.set(0, 3, 0); // Posición de la luz
    // pointLight.decay = 2;
    // scene.add(pointLight);

    // Test of lights
    for (let i = 1; i < 7; i++) {
        var spotLight = new THREE.PointLight(0xffffcc, i / 10); // yellow
        spotLight.position.set(0, 6, 0);
        // spotLight.target.position.set(0, 0, 0); 
        spotLight.distance = 20;
        spotLight.decay = 1.5;
        spotLight.angle = (45 + i * 3 * Math.PI) / 180;
        const slHelper2 = new THREE.PointLightHelper(spotLight);
        scene.add(spotLight, slHelper2);
    }


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
    GEO.createWardrobe(scene, wardrobeWidth, wardrobeHeight, wardrobeDepth);

    // Call the functions to create the room
    GEO.createRoom(scene);
    GEO.createWalls(scene);
    // createWindow(scene);
    GEO.createFrame(scene);
}

//Lode Models using MODELS from models.js
function loadModels() {
    MODELS.addClothesHanger(scene, wardrobeWidth, wardrobeHeight)
    MODELS.tShirtsFolded(scene, wardrobeWidth, wardrobeHeight)
    MODELS.cowboyBoots(scene, wardrobeWidth, wardrobeHeight)
    MODELS.flipFlops(scene, wardrobeWidth, wardrobeHeight)
    MODELS.pairOfShoes(scene, wardrobeWidth, wardrobeHeight)
    MODELS.sneakers(scene, wardrobeWidth, wardrobeHeight)
    MODELS.dualMonitors(scene, tableWidth, tableHeight, tableDepth)
    MODELS.pc(scene, tableWidth, tableHeight, tableDepth)
    MODELS.mug(scene, tableWidth, tableHeight, tableDepth)
    MODELS.pencil(scene, tableWidth, tableHeight, tableDepth)
    MODELS.pillow(scene, bedWidth, bedHeight, bedDepth)
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
    scene.spotLight.position;
}

function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}