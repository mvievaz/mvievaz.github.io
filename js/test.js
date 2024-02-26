/**
  test.js 

  Main code for the project.

  @author mvievaz@inf.upv.es (c)
*/

// Necessary modules
import Stats from "../lib/stats.module.js";
import * as THREE from "../lib/three.module.js";
import {OrbitControls} from "../lib/OrbitControls.module.js";
import {TWEEN} from "../lib/tween.module.min.js";
import {GUI} from "../lib/lil-gui.module.min.js";

// Standard variables
let renderer, scene, camera, ground;
let cameraControls, effectController;

// Actions
init();
loadScene();
setupGUI();
render();

function init()
{
    // Instantiate the rendering engine
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.getElementById('container').appendChild( renderer.domElement );

    // Instantiate the root node of the scene.
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.5,0.5,0.5);

    // Instantiate the camera
    camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(0.5,2,7);
    cameraControls = new OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0,1,0);
    camera.lookAt(0,1,0);

    // Events
    renderer.domElement.addEventListener('dblclick', animate );
}

function loadScene()
{
    // Material
    const material = new THREE.MeshBasicMaterial({color:'yellow',wireframe:true});

    // Ground
    ground = new THREE.Mesh( new THREE.PlaneGeometry(10,10, 10,10), material );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -0.2;
    scene.add(ground)

    // Axes
    scene.add( new THREE.AxesHelper(3) );

    // Stats
    var stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
}

function setupGUI()
{
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

function animate(event)
{
    stats.begin();

	// monitored code goes here

	stats.end();

	requestAnimationFrame( animate );
}

function update()
{

	ground.material.setValues( { color: effectController.groundColor } );
    TWEEN.update();
}

function render()
{
    requestAnimationFrame(render);
    update();
    renderer.render(scene,camera);
}