/**
  utils.js 

  This file contains models for the project.

  @author mvievaz@inf.upv.es (c)
*/

import { GLTFLoader } from "../lib/GLTFLoader.module.js";

// Support function to duplicate hangers
function duplicateHangers(hanger, widthN, n, scene, width, height) {

  for (let i = 0; i < n; i++) {
    var newHanger = hanger.clone();
    newHanger.rotation.y = -Math.PI / 2;
    newHanger.position.set(4 + 0.2 - width / 2, height - 0.55, widthN * width - 0.6 + i / 10);
    scene.add(newHanger);
  }
}

// Clothes hanger by Poly by Google [CC-BY] via Poly Pizza  
export function addClothesHanger(scene, width, height) {

  var loader = new GLTFLoader();
  loader.load('models/wardrobe/Clothes hanger.glb', function (gltf) {
    gltf.scene.scale.set(0.005, 0.005, 0.005);

    var hanger = gltf.scene
    duplicateHangers(hanger.clone(), 0, 13, scene, width, height)
    duplicateHangers(hanger.clone(), 1, 10, scene, width, height)
    duplicateHangers(hanger.clone(), 2, 5, scene, width, height)
  });
}

// T-Shirts - folded by sirkitree [CC-BY] via Poly Pizza 
export function tShirtsFolded(scene, width, height) {

  var loader = new GLTFLoader();
  loader.load('models/wardrobe/T-Shirts - folded.glb', function (gltf) {
    gltf.scene.scale.set(0.4, 0.5, 0.5);
    gltf.scene.rotation.y = -Math.PI / 2;
    gltf.scene.position.set(4 - width / 2, 0.47, 0 * width - 0.6 + 5 / 10);
    scene.add(gltf.scene);
    var shirt = gltf.scene.clone();
    shirt.scale.set(0.4, 0.5, 0.5);
    shirt.rotation.y = -Math.PI / 2;
    shirt.position.set(4 - width / 2, 0.47, 0 * width - 0.6 + 12 / 10);
    scene.add(shirt);
    var shirt = gltf.scene.clone();
    shirt.scale.set(0.4, 0.5, 0.5);
    shirt.rotation.y = -Math.PI / 2;
    shirt.position.set(4 - width / 2, 0.47, 1 * width - 0.6 + 8 / 10);
    scene.add(shirt);
    var shirt = gltf.scene.clone();
    shirt.scale.set(0.4, 0.5, 0.5);
    shirt.rotation.y = -Math.PI / 2;
    shirt.position.set(4 - width / 2, 0.47, 2 * width - 0.6 + 9 / 10);
    scene.add(shirt);
  });
}

// Cowboy boots by Poly by Google [CC-BY] via Poly Pizza
export function cowboyBoots(scene, width, height) {

  var loader = new GLTFLoader();
  loader.load('models/wardrobe/Cowboy boots.glb', function (gltf) {
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(4 - width / 2 + 0.1, 0.38, 2 * width - 0.6 + 2 / 10);
    scene.add(gltf.scene);
  });
}

// Sneakers by Poly by Google [CC-BY] via Poly Pizza
export function sneakers(scene, width, height) {

  var loader = new GLTFLoader();
  loader.load('models/wardrobe/Sneakers.glb', function (gltf) {
    gltf.scene.scale.set(0.001, 0.001, 0.001);
    gltf.scene.position.set(4 - width / 2 + 0.1, 0.13, 1 * width - 0.6 + 7 / 10);
    scene.add(gltf.scene);
  });
}

// Flip flops by Poly by Google [CC-BY] via Poly Pizza
export function flipFlops(scene, width, height) {

  var loader = new GLTFLoader();
  loader.load('models/wardrobe/Flip flops.glb', function (gltf) {
    gltf.scene.scale.set(0.0000004, 0.0000004, 0.0000004);
    gltf.scene.position.set(4 - width / 2 + 0.6, 0.13, 0 * width - 0.6 + 5 / 10);
    scene.add(gltf.scene);
  });
}

// Pair of shoes by Poly by Google [CC-BY] via Poly Pizza
export function pairOfShoes(scene, width, height) {

  var loader = new GLTFLoader();
  loader.load('models/wardrobe/Pair of shoes.glb', function (gltf) {
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(4 - width / 2 + 0.2, height - 0.15, 0 * width - 0.6 + 5 / 10);
    scene.add(gltf.scene);
  });
}

// Dual Monitors on sit-stand arm by Pookage Hayes [CC-BY] via Poly Pizza
export function dualMonitors(scene, width, height, depth) {

  var loader = new GLTFLoader();
  loader.load('models/table/Dual Monitors on sit-stand arm.glb', function (gltf) {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.rotation.y = -Math.PI;
    gltf.scene.position.set(width + 0.2, height + 0.48, depth);
    scene.add(gltf.scene);
  });
}

// PC by Poly by Google [CC-BY] via Poly Pizza
export function pc(scene, width, height, depth) {

  var loader = new GLTFLoader();
  loader.load('models/table/PC.glb', function (gltf) {
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.rotation.y = Math.PI / 2;
    gltf.scene.position.set(width - 0.7, height + 0.05, depth);
    scene.add(gltf.scene);
  });
}

// Mug With Office Tool by CreativeTrio
export function mug(scene, width, height, depth) {

  var loader = new GLTFLoader();
  loader.load('models/table/Mug With Office Tool.glb', function (gltf) {
    gltf.scene.scale.set(1.5, 1.5, 1.5);
    gltf.scene.position.set(width + 0.6, height + 0.05, depth - 0.2);
    scene.add(gltf.scene);
  });
}

// Pencil by Poly by Google [CC-BY] via Poly Pizza
export function pencil(scene, width, height, depth) {

  var loader = new GLTFLoader();
  loader.load('models/table/Pencil.glb', function (gltf) {
    gltf.scene.scale.set(0.025, 0.025, 0.025);
    gltf.scene.rotation.y = Math.PI / 3;
    gltf.scene.position.set(width + 0.6, height - 0.13, depth - 0.2);
    scene.add(gltf.scene);
  });
}

// Pillow by Poly by Google [CC-BY] via Poly Pizza
export function pillow(scene, width, height, depth) {

  var loader = new GLTFLoader();
  loader.load('models/bed/Pillow.glb', function (gltf) {
    gltf.scene.scale.set(0.15, 0.15, 0.15);
    // gltf.scene.rotation.y = Math.PI / 3;
    gltf.scene.position.set(width - 0.3, height + 0.38, depth - 0.85);
    scene.add(gltf.scene);
    var pillow = gltf.scene.clone()
    pillow.scale.set(0.15, 0.15, 0.15);
    pillow.rotation.y = -Math.PI / 3;
    pillow.position.set(width + 0.6, height + 0.38, depth - 0.75);
    scene.add(pillow);
  });
}