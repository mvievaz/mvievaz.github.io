/**
  shop.js 

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

let initialCamPos

let wardrobeGroup, wardrobeGroup2, wardrobeGroup3
let lDoor, lDoor2, lDoor3
let rDoor, rDoor2, rDoor3

let tableGroup
let lDrawer, rDrawer

let marked
let bedMark, tableMark, wardrobeMark

// Constants
const wardrobeWidth = 1.5;
const wardrobeHeight = 2;
const wardrobeDepth = 0.6;

const tableWidth = -2;
const tableHeight = 0.7;
const tableDepth = -3.3;

const bedWidth = 1.5;
const bedHeight = 0.35;
const bedDepth = -2.5;

// Detect clicks on the object
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Actions
init();
loadScene();
loadModels();
setupGUI();
render();

// Initialization function
function init() {
    // Instantiate the rendering engine
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Instantiate the root node of the scene.
    scene = new THREE.Scene();
    backGroundDay();

    // Instantiate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(0.5, 2, 7);
    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.enablePan = false
    cameraControls.target.set(0, 1, 0);
    camera.lookAt(0, 1, 0);

    // Limit the minimum and maximum distance of the camera.
    cameraControls.minDistance = 5;
    cameraControls.maxDistance = 10;

    // Limit the camera's rotation.
    cameraControls.minAzimuthAngle = - 7 * Math.PI / 12;
    cameraControls.maxAzimuthAngle = Math.PI / 12;
    cameraControls.maxPolarAngle = Math.PI / 2;

    // Ambient light
    var ambientLight = new THREE.AmbientLight(0x404040); // Grey color.
    scene.add(ambientLight);

    // Test of lights
    lightOn();

    // Add the click event to the document.
    document.addEventListener('click', onMouseClick, false);

    // Remove
    // // Events
    // renderer.domElement.addEventListener('dblclick', animate);

    // Maintain aspect ratio when resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

//  Load all scene (Geometry using GEO from geometry.js)
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

    // Lode Geometry using GEO from geometry.js
    tableGroup = GEO.createTable(scene);
    lDrawer = tableGroup.getObjectByName("LDrawer")
    rDrawer = tableGroup.getObjectByName("RDrawer")
    GEO.createBed(scene);
    [wardrobeGroup, wardrobeGroup2, wardrobeGroup3] = GEO.createWardrobe(scene, wardrobeWidth, wardrobeHeight, wardrobeDepth);
    lDoor = wardrobeGroup.getObjectByName("LDoor")
    rDoor = wardrobeGroup.getObjectByName("RDoor")
    lDoor2 = wardrobeGroup2.getObjectByName("LDoor")
    rDoor2 = wardrobeGroup2.getObjectByName("RDoor")
    lDoor3 = wardrobeGroup3.getObjectByName("LDoor")
    rDoor3 = wardrobeGroup3.getObjectByName("RDoor")
    // Call the functions to create the room
    marked = GEO.marks(scene);
    bedMark = marked.getObjectByName("bedMark")
    tableMark = marked.getObjectByName("tableMark")
    wardrobeMark = marked.getObjectByName("wardrobeMark")
    GEO.createRoom(scene);
    GEO.createWalls(scene);
    GEO.createFrame(scene);

}

// Lode Models using MODELS from models.js
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

// Set up GUI using lil-gui module
function setupGUI() {

    const menuControllerTime = {
        options: ['Day', 'Night'], // List of options
        selectedOption: 'Day' // Initially selected option
    };
    const menuControllerLight = {
        options: ['On', 'Off'], // List of options
        selectedOption: 'On' // Initially selected option
    };
    // Creation UI
    const gui = new GUI();


    const menuControllerTimeObject = gui.add(menuControllerTime, 'selectedOption', menuControllerTime.options).name('Time');
    menuControllerTimeObject.onChange(handleMenuChangeTime);
    const menuControllerLightObject = gui.add(menuControllerLight, 'selectedOption', menuControllerLight.options).name('Light');
    menuControllerLightObject.onChange(handleMenuChangeLight);

}

// Function to handle the change in menu selection
function handleMenuChangeTime(selectedValue) {
    if (selectedValue === 'Night') {
        backGroundNight()
    }
    else {
        backGroundDay()
    }
}

// Function to handle the change in menu selection
function handleMenuChangeLight(selectedValue) {
    if (selectedValue === 'On') {
        lightOn();
    }
    else {
        lightOff();
    }
}

// Remove??
function animate(event) {

}

// Update function
function update() {
    TWEEN.update();
}

// Render function
function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

// Function to handle mouse click
function onMouseClick(event) {
    // Calculate the mouse position within the range [-1, 1]
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Set the ray origin from the camera position and the direction of the mouse vector
    raycaster.setFromCamera(mouse, camera);

    // Calculate the objects intersecting with the ray
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        clickEvent(clickedObject);
    }
}

// Check if is left (Return 0) or right(Return 1), if not return NaN
function checkLR(object, l, r) {
    if (object === l) {
        console.log('Hola LDoor');
        return 0; //Left
    } else if (object === r) {
        console.log('Hola RDoor');
        return 1; //Right
    }
    return NaN; //Not a door
}

// Check what has been clicked
function clickEvent(clickedObject) {
    switch (clickedObject.parent) {
        case wardrobeGroup:
            checkLR(clickedObject, lDoor, rDoor);
            break;
        case wardrobeGroup2:
            checkLR(clickedObject, lDoor2, rDoor2);
            break;
        case wardrobeGroup3:
            checkLR(clickedObject, lDoor3, rDoor3);
            break;
        case lDrawer:
            console.log('Hola LDrawer');
            break;
        case rDrawer:
            console.log('Hola RDrawer');
            break;
        case marked:
            isMark(clickedObject);
            break;
    }
}

// Check witch mark has been clicked
function isMark(clickedObject) {
    switch (clickedObject) {
        case tableMark:
            moveToTable();
            break;
        case bedMark:
            moveToBed();
            break;
        case wardrobeMark:
            moveToWardrobe()
            break;
    }
}

// Save Night and day so we don't needed to load every time ??? //Remove
// Switch to Day
function backGroundDay() {
    const backLoader = new THREE.CubeTextureLoader();
    const backGround = backLoader.load([
        'textures/skyBoxDay/Daylight_Box_Right.bmp', // Right
        'textures/skyBoxDay/Daylight_Box_Left.bmp', // Left
        'textures/skyBoxDay/Daylight_Box_Top.bmp', // Top
        'textures/skyBoxDay/Daylight_Box_Bottom.bmp', // Bottom
        'textures/skyBoxDay/Daylight_Box_Front.bmp', // Front
        'textures/skyBoxDay/Daylight_Box_Back.bmp'  // Back
    ]);
    scene.background = backGround;
}

// Switch to night
function backGroundNight() {
    const backLoader = new THREE.CubeTextureLoader();
    const backGround = backLoader.load([
        'textures/skyBoxNight/nightsky_west.bmp', // Right
        'textures/skyBoxNight/nightsky_east.bmp', // Left
        'textures/skyBoxNight/nightsky_up.bmp', // Top
        'textures/skyBoxNight/nightsky_down.bmp', // Bottom
        'textures/skyBoxNight/nightsky_south.bmp', // Front
        'textures/skyBoxNight/nightsky_north.bmp'  // Back
    ]);
    scene.background = backGround;
}

// Turn on the light
function lightOn() {
    var spotLight = new THREE.PointLight(0xffffcc, 1); // yellow
    spotLight.name = 'spotLight';
    spotLight.position.set(0, 6, 0);
    spotLight.distance = 20;
    spotLight.decay = 1.5;
    spotLight.angle = (45 + 7 * 3 * Math.PI) / 180;
    const slHelper2 = new THREE.PointLightHelper(spotLight);//Remove

    scene.add(spotLight, slHelper2);
}

// Turn off the light
function lightOff() {
    const spotLight = scene.getObjectByName('spotLight')
    scene.remove(spotLight);
}

// Move camera to table
function moveToTable() {
    initialCamPos = camera.position.clone();
    console.log('TableMark');
    new TWEEN.Tween(camera.position)
        .to({ x: -2, y: 2, z: 0 }, 2000)
        .onComplete(() => {
            cameraControls.minDistance = 3;
            cameraControls.maxDistance = 6;
            cameraControls.minAzimuthAngle = - 4 * Math.PI / 12;
            cameraControls.maxAzimuthAngle = 1 * Math.PI / 12;
            cameraControls.maxPolarAngle = Math.PI / 2;
            cameraControls.target.set(-2, 1, -4);
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    // Ca1mera.rotation
}

// Move camera to bed
function moveToBed() {
    initialCamPos = camera.position.clone();
    new TWEEN.Tween(camera.position)
        .to({ x: -2, y: 2, z: 0 }, 2000)
        .onComplete(() => {
            cameraControls.minDistance = 3;
            cameraControls.maxDistance = 6;
            cameraControls.minAzimuthAngle = - 4 * Math.PI / 12;
            cameraControls.maxAzimuthAngle = 1 * Math.PI / 12;
            cameraControls.maxPolarAngle = Math.PI / 2;
            cameraControls.target.set(-2, 1, -4);
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

// Move camera to wardrobe
function moveToWardrobe() {
    initialCamPos = camera.position.clone();
    new TWEEN.Tween(camera.position)
        .to({ x: -2, y: 2, z: 0 }, 2000)
        .onComplete(() => {
            cameraControls.minDistance = 3;
            cameraControls.maxDistance = 6;
            cameraControls.minAzimuthAngle = - 4 * Math.PI / 12;
            cameraControls.maxAzimuthAngle = 1 * Math.PI / 12;
            cameraControls.maxPolarAngle = Math.PI / 2;
            cameraControls.target.set(-2, 1, -4);
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

// Move camera back
function moveBack() {
    initialCamPos = camera.position.clone();
    new TWEEN.Tween(camera.position)
        .to({ x: 0.5, y: 2, z: 7 }, 2000)
        .onComplete(() => {
            cameraControls.minDistance = 5;
            cameraControls.maxDistance = 10;
            cameraControls.minAzimuthAngle = - 7 * Math.PI / 12;
            cameraControls.maxAzimuthAngle = Math.PI / 12;
            cameraControls.maxPolarAngle = Math.PI / 2;
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}
