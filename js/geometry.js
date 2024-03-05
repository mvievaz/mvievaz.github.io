/**
  utils.js 

  This file contains geometry for the project.

  @author mvievaz@inf.upv.es (c)
*/


import * as THREE from "../lib/three.module.js";

// Function to create a table with legs
export function createTable(scene) {
    // Create the table top
    const tableTopGeometry = new THREE.BoxGeometry(2, 0.1, 1);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const tableTopMesh = new THREE.Mesh(tableTopGeometry, tableTopMaterial);

    // Create table legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.7, 0.1);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    const tableLeg1 = new THREE.Mesh(legGeometry, legMaterial);
    const tableLeg2 = new THREE.Mesh(legGeometry, legMaterial);
    const tableLeg3 = new THREE.Mesh(legGeometry, legMaterial);
    const tableLeg4 = new THREE.Mesh(legGeometry, legMaterial);

    // Position table legs
    tableLeg1.position.set(-0.9, -0.7 / 2, 0.4);
    tableLeg2.position.set(-0.9, -0.7 / 2, -0.4);
    tableLeg3.position.set(0.9, -0.7 / 2, 0.4);
    tableLeg4.position.set(0.9, -0.7 / 2, -0.4);

    // Create the drawer hole
    const drawerHoleMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
    const drawerHoleGroundGeometry = new THREE.BoxGeometry(0.9, 0.02, 0.9);
    const drawerHoleGroundMesh = new THREE.Mesh(drawerHoleGroundGeometry, drawerHoleMaterial);

    const drawerHoleFrontBackGeometry = new THREE.BoxGeometry(0.9, 0.15, 0.02);
    const drawerHoleBackMesh = new THREE.Mesh(drawerHoleFrontBackGeometry, drawerHoleMaterial);

    const drawerHoleLeftRightGeometry = new THREE.BoxGeometry(0.02, 0.15, 0.9);
    const drawerHoleLeftMesh = new THREE.Mesh(drawerHoleLeftRightGeometry, drawerHoleMaterial);
    const drawerHoleRightMesh = new THREE.Mesh(drawerHoleLeftRightGeometry, drawerHoleMaterial);

    drawerHoleGroundMesh.position.set(0.39, -0.17, 0);
    drawerHoleBackMesh.position.set(0.39, -0.1, -0.45);
    drawerHoleLeftMesh.position.set(0.39 + 0.45, -0.1, 0);
    drawerHoleRightMesh.position.set(0.39 - 0.45, -0.1, 0);

    // Create the drawer hole
    const drawerMaterial = new THREE.MeshStandardMaterial({ color: 'blue' }); // Transparent for debugging
    const drawerGroundGeometry = new THREE.BoxGeometry(0.43, 0.02, 0.9);
    const drawerGroundMesh = new THREE.Mesh(drawerGroundGeometry, drawerMaterial);

    const drawerFrontBackGeometry = new THREE.BoxGeometry(0.43, 0.13, 0.02);
    const drawerBackMesh = new THREE.Mesh(drawerFrontBackGeometry, drawerMaterial);
    const drawerFrontMesh = new THREE.Mesh(drawerFrontBackGeometry, drawerMaterial);

    const drawerLeftRightGeometry = new THREE.BoxGeometry(0.02, 0.13, 0.9);
    const drawerLeftMesh = new THREE.Mesh(drawerLeftRightGeometry, drawerMaterial);
    const drawerRightMesh = new THREE.Mesh(drawerLeftRightGeometry, drawerMaterial);

    drawerGroundMesh.position.set(0.35 / 2, -0.15, 0);
    drawerBackMesh.position.set(0.35 / 2, -0.1, -0.43);
    drawerFrontMesh.position.set(0.35 / 2, -0.1, 0.44);
    drawerLeftMesh.position.set(0.35 / 2 + 0.43 / 2, -0.1, 0);
    drawerRightMesh.position.set(0.35 / 2 - 0.43 / 2, -0.1, 0);

    // Drawer knob (sphere)
    const knobRadius = 0.03;
    const knobGeometry = new THREE.SphereGeometry(knobRadius, 32, 32);
    const knobMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black
    const knobMesh = new THREE.Mesh(knobGeometry, knobMaterial);
    knobMesh.position.set(0.35 / 2, -0.1, 0.44 + 0.03); // Adjust position

    const drawer1Group = new THREE.Group();
    drawer1Group.add(drawerGroundMesh, drawerBackMesh, drawerFrontMesh, drawerLeftMesh, drawerRightMesh, knobMesh);

    const drawer2Group = drawer1Group.clone();
    drawer2Group.position.set(0.43, 0, 0);



    // Create a group for the table and legs
    const tableGroup = new THREE.Group();
    tableGroup.add(tableTopMesh, tableLeg1, tableLeg2, tableLeg3, tableLeg4);
    tableGroup.add(drawerHoleGroundMesh, drawerHoleBackMesh, drawerHoleLeftMesh, drawerHoleRightMesh);
    tableGroup.add(drawer1Group, drawer2Group)
    // Optionally, position the table
    tableGroup.position.set(-2, 0.7, -3.3);

    // Add the table group to the scene
    scene.add(tableGroup);

    // Return the table group if needed
    return tableGroup;
}

// Function to create a bed with legs
export function createBed(scene) {
    // Create the bed base
    const bedBaseGeometry = new THREE.BoxGeometry(2, 0.3, 2.5);
    const bedBaseMaterial = new THREE.MeshStandardMaterial({ color: 0xA52A2A });
    const bedBaseMesh = new THREE.Mesh(bedBaseGeometry, bedBaseMaterial);

    // Create bed legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0xA52A2A });

    const bedLeg1 = new THREE.Mesh(legGeometry, legMaterial);
    const bedLeg2 = new THREE.Mesh(legGeometry, legMaterial);
    const bedLeg3 = new THREE.Mesh(legGeometry, legMaterial);
    const bedLeg4 = new THREE.Mesh(legGeometry, legMaterial);

    // Position bed legs
    bedLeg1.position.set(-0.9, -0.15, 1.2);
    bedLeg2.position.set(-0.9, -0.15, -1.2);
    bedLeg3.position.set(0.9, -0.15, 1.2);
    bedLeg4.position.set(0.9, -0.15, -1.2);

    // Create a group for the bed and legs
    const bedGroup = new THREE.Group();
    bedGroup.add(bedBaseMesh, bedLeg1, bedLeg2, bedLeg3, bedLeg4);

    // Optionally, position the bed
    bedGroup.position.set(1.5, 0.4, -2.5);

    // Add the bed group to the scene
    scene.add(bedGroup);

    // Return the bed group if needed
    return bedGroup;
}

// // Function to create a wardrobe with double doors
export function createWardrobe(scene, wardrobeWidth, wardrobeHeight, wardrobeDepth) {

    // Create the doors
    const doorGeometry = new THREE.BoxGeometry(wardrobeWidth / 2, wardrobeHeight, 0.05);
    const doorMaterial1 = new THREE.MeshStandardMaterial({ color: 'blue' });
    const doorMaterial2 = new THREE.MeshStandardMaterial({ color: 'red' });
    const door1 = new THREE.Mesh(doorGeometry, doorMaterial1);
    const door2 = new THREE.Mesh(doorGeometry, doorMaterial2);

    // Position the doors
    door1.position.set(wardrobeWidth / 4, 0, wardrobeDepth / 2 + 0.025);
    door2.position.set(-wardrobeWidth / 4, 0, wardrobeDepth / 2 + 0.025);

    // Create the back, left, and right walls
    const backGeometry = new THREE.BoxGeometry(wardrobeWidth, wardrobeHeight, 0.05);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const backWall = new THREE.Mesh(backGeometry, wallMaterial);
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, wardrobeHeight, wardrobeDepth), wallMaterial);
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, wardrobeHeight, wardrobeDepth), wallMaterial);

    // Position the walls
    backWall.position.set(0, 0, -wardrobeDepth / 2);
    leftWall.position.set(-wardrobeWidth / 2 + 0.025, 0, 0);
    rightWall.position.set(wardrobeWidth / 2 - 0.025, 0, 0);

    // Create the top and bottom
    const topBottomGeometry = new THREE.BoxGeometry(wardrobeWidth, 0.05, wardrobeDepth);
    const topBottom = new THREE.Mesh(topBottomGeometry, wallMaterial);
    const topPosition = wardrobeHeight / 2;
    const bottomPosition = -wardrobeHeight / 2;

    // Position the top and bottom
    topBottom.position.set(0, topPosition, 0);
    const bottomClone = topBottom.clone();
    bottomClone.position.y = bottomPosition;

    //Create the top and bottom bookcase 
    const topBottomBookcaseGeometry = new THREE.BoxGeometry(wardrobeWidth - 0.1, 0.05, wardrobeDepth - 0.05);
    const topBottomBookcase = new THREE.Mesh(topBottomBookcaseGeometry, wallMaterial);
    const topBookcase = wardrobeHeight / 2 - 0.3 - 0.05;
    const bottomBookcase = -wardrobeHeight / 2 + 0.2 + 0.05;

    // Position the top and bottom bookcase
    topBottomBookcase.position.set(0, topBookcase, 0);
    const bottomBookcaseClone = topBottomBookcase.clone();
    bottomBookcaseClone.position.y = bottomBookcase;

    //Create the top and bottom coat rack 
    const coatRackGeometry = new THREE.CylinderGeometry(0.02, 0.02, wardrobeWidth - 0.1);
    const coatRack = new THREE.Mesh(coatRackGeometry, wallMaterial);
    const coatRackPosition = topBookcase - 0.1;

    // Position the top and bottom coat rack 
    coatRack.rotation.z = -Math.PI / 2; // Rotate 90 degrees to face into the room
    coatRack.position.set(0, coatRackPosition, 0);

    // Create a group for the wardrobe and doors
    const wardrobeGroup = new THREE.Group();
    wardrobeGroup.add(
        // door1,
        // door2,
        backWall,
        leftWall,
        rightWall,
        topBottom,
        bottomClone,
        coatRack,
        topBottomBookcase,
        bottomBookcaseClone
    );

    // Optionally, position the wardrobe
    wardrobeGroup.position.set(4 + 0.2 - wardrobeWidth / 2, wardrobeHeight / 2 + 0.1, 0);
    wardrobeGroup.rotation.y = -Math.PI / 2; // Rotate 90 degrees to face into the room

    scene.add(wardrobeGroup);
    const wardrobe2Group = wardrobeGroup.clone();
    const wardrobe3Group = wardrobeGroup.clone();
    wardrobe2Group.position.set(4 + 0.2 - wardrobeWidth / 2, wardrobeHeight / 2 + 0.1, wardrobeWidth);
    scene.add(wardrobe2Group);
    wardrobe3Group.position.set(4 + 0.2 - wardrobeWidth / 2, wardrobeHeight / 2 + 0.1, wardrobeWidth * 2);
    scene.add(wardrobe3Group);
    // Return the wardrobe group if needed
    return wardrobeGroup;
}


// Function to create the room (including ground)
export function createRoom(scene) {
    // Ground
    const groundGeometry = new THREE.BoxGeometry(8, 0.1, 8);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(groundMesh);
}

// Function to create the walls
export function createWalls(scene) {

    const wallThickness = 0.2;
    const wallHeight = 3;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/wall.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    // Apply texture to the material
    const wallMaterial = new THREE.MeshBasicMaterial({ map: texture });

    // Back wall
    const backWallGeometry = new THREE.BoxGeometry(8, wallHeight, wallThickness);
    const backWallMesh = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWallMesh.position.set(0, wallHeight / 2 + 0.05, -4 + wallThickness / 2);
    scene.add(backWallMesh);

    // Right wall
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 8 - wallThickness);
    const rightWallMesh = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWallMesh.position.set(4 - wallThickness / 2, wallHeight / 2 + 0.05, wallThickness / 2);
    scene.add(rightWallMesh);
}

// // Function to create the window on the back wall
// export function createWindow(scene) {
//     const windowFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
//     const windowGlassMaterial = new THREE.MeshStandardMaterial({ color: 0xADD8E6 }); // Light blue

//     const windowFrameGeometry = new THREE.BoxGeometry(3, 1.5, 0.1);
//     const windowFrameMesh = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
//     windowFrameMesh.position.set(-2, 1.7, -3.8); // Adjust position
//     scene.add(windowFrameMesh);

//     const windowMargin = 0.2
//     const windowGlassGeometry = new THREE.BoxGeometry(3 - windowMargin, 1.5 - windowMargin, 0.05);
//     const windowGlassMesh = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
//     windowGlassMesh.position.set(-2, 1.7, -3.7); // Adjust position
//     scene.add(windowGlassMesh);
// }

// Function to create the frame on the right wall
export function createFrame(scene) {
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
    const frameGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameMesh.position.set(4 - 0.2 / 2 - 0.1, 2, -2); // Adjust position
    frameMesh.rotation.y = Math.PI / 2; // Rotate 90 degrees to face into the room
    scene.add(frameMesh);
}


