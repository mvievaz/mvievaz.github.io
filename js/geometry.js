/**
  geometry.js 

  This file contains geometry for the project.

  @author mvievaz@inf.upv.es (c)
*/


import * as THREE from "../lib/three.module.js";

// Function to create a table with legs
export function createTable(scene, tableSize, legSize) {
    // Create the table top
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/wood2.jpg  ');     // https://pin.it/3dDGjpqzo
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    const tableTopGeometry = new THREE.BoxGeometry(2, 0.1, 1);
    const tableTopMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const tableTopMesh = new THREE.Mesh(tableTopGeometry, tableTopMaterial);

    // Create table legs

    const textureLoaderLeg = new THREE.TextureLoader();
    const textureLeg = textureLoaderLeg.load('textures/wood4.jpeg'); // https://pin.it/63mPV6T2T
    const legMaterial = new THREE.MeshPhongMaterial({ map: textureLeg });
    const legGeometry = new THREE.BoxGeometry(0.1, 0.7, 0.1);

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
    const drawerHoleMaterial = new THREE.MeshPhongMaterial({ map: textureLeg });
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

    // Create the drawer
    const drawerMaterial = new THREE.MeshPhongMaterial({ map: texture });
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
    const knobMaterial = new THREE.MeshPhongMaterial({ map: textureLeg });
    const knobMesh = new THREE.Mesh(knobGeometry, knobMaterial);
    knobMesh.position.set(0.35 / 2, -0.1, 0.44 + 0.03); // Adjust position

    const drawer1Group = new THREE.Group();
    drawer1Group.add(drawerGroundMesh, drawerBackMesh, drawerFrontMesh, drawerLeftMesh, drawerRightMesh, knobMesh);
    drawer1Group.name = 'LDrawer'

    const drawer2Group = drawer1Group.clone();
    drawer2Group.name = 'RDrawer'
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

    // Return the table group, if needed
    return tableGroup;
}

// Function to create a bed with legs
export function createBed(scene) {
    // Create the bed base
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/wood4.jpeg');     // https://pin.it/63mPV6T2T
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    const bedBaseGeometry = new THREE.BoxGeometry(2, 0.1, 2.5);
    const bedBaseMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const bedBaseMesh = new THREE.Mesh(bedBaseGeometry, bedBaseMaterial);

    // Create the mattress

    // Create the bed base
    const mattressGeometry = new THREE.BoxGeometry(2, 0.2, 2.5);
    const textureMattressLoader = new THREE.TextureLoader();
    const textureMattress = textureMattressLoader.load('textures/mattress.jpeg');// https://pin.it/6niXeX6ep

    const mattressMaterial = new THREE.MeshStandardMaterial({ map: textureMattress });
    const mattressMesh = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattressMesh.position.set(0, 0.15, 0)
    // Create bed legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
    const legMaterial = new THREE.MeshPhongMaterial({ map: texture });

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
    bedGroup.add(bedBaseMesh, bedLeg1, bedLeg2, bedLeg3, bedLeg4, mattressMesh);

    // Optionally, position the bed
    bedGroup.position.set(1.5, 0.35, -2.5);

    // Add the bed group to the scene
    scene.add(bedGroup);

    // Return the bed group if needed
    return bedGroup;
}

// Function to create a wardrobe with double doors
export function createWardrobe(scene, wardrobeWidth, wardrobeHeight, wardrobeDepth) {

    // Create the doors
    const doorGeometry = new THREE.BoxGeometry(wardrobeWidth / 2, wardrobeHeight, 0.05);
    const textureLoader1 = new THREE.TextureLoader();
    const texture1 = textureLoader1.load('textures/wood4.jpeg');// https://pin.it/63mPV6T2T
    const doorMaterial1 = new THREE.MeshStandardMaterial({ map: texture1 });
    const textureLoader2 = new THREE.TextureLoader();
    const texture2 = textureLoader2.load('textures/wood4.jpeg');// https://pin.it/63mPV6T2T
    const doorMaterial2 = new THREE.MeshStandardMaterial({ map: texture2 });
    const door1 = new THREE.Mesh(doorGeometry, doorMaterial1);
    const door2 = new THREE.Mesh(doorGeometry, doorMaterial2);

    // Position the doors
    door1.position.set(wardrobeWidth / 4, 0, wardrobeDepth / 2 + 0.025);
    door2.position.set(-wardrobeWidth / 4, 0, wardrobeDepth / 2 + 0.025);

    // Create the back, left, and right walls
    const backGeometry = new THREE.BoxGeometry(wardrobeWidth, wardrobeHeight, 0.05);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/wood4.jpeg');// https://pin.it/63mPV6T2T
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const wallMaterial = new THREE.MeshPhongMaterial({ map: texture });
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
    door1.name = 'RDoor'
    door2.name = 'LDoor'
    // Create a group for the wardrobe and doors
    const wardrobeGroup = new THREE.Group();
    wardrobeGroup.add(
        door1,
        door2,
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
    // Return the wardrobe groups
    return [wardrobeGroup, wardrobe2Group, wardrobe3Group]
}


// Function to create the room (including ground)
export function createRoom(scene) {
    // Ground

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/wood.jpg  '); // https://pin.it/6ejpZ3D3M
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.alphaMap = THREE.Loader;
    texture.repeat.set(3, 3);
    const groundMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const groundGeometry = new THREE.BoxGeometry(8, 0.1, 8);
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(groundMesh);
    return groundMesh
}

// Function to create the walls
export function createWalls(scene) {

    const wallThickness = 0.2;
    const wallHeight = 3;

    // Load texture

    const backTextureLoader1 = new THREE.TextureLoader();
    const backTexture1 = backTextureLoader1.load('textures/WallWindow.png');// https://pin.it/4lNft87Vn

    const backTextureLoader2 = new THREE.TextureLoader();
    const backTexture2 = backTextureLoader2.load('textures/WallWindow2.png');// https://pin.it/4lNft87Vn

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/Wall.jpg');// https://pin.it/4lNft87Vn

    // Apply texture to the material
    const wallMaterial = new THREE.MeshPhongMaterial({ map: texture });

    const backWallMaterial = [
        new THREE.MeshPhongMaterial({ map: texture }),
        new THREE.MeshPhongMaterial({ map: texture }),
        new THREE.MeshPhongMaterial({ map: texture }),
        new THREE.MeshPhongMaterial({ map: texture }),
        new THREE.MeshPhongMaterial({ map: backTexture1, transparent: true, }),
        new THREE.MeshPhongMaterial({ map: backTexture2, transparent: true, }),
    ]

    // Back wall
    const backWallGeometry = new THREE.BoxGeometry(8, wallHeight, wallThickness);
    const backWallMesh = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWallMesh.position.set(0, wallHeight / 2 + 0.05, -4 + wallThickness / 2);
    scene.add(backWallMesh);

    // Right wall
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 8 - wallThickness);
    const rightWallMesh = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWallMesh.position.set(4 - wallThickness / 2, wallHeight / 2 + 0.05, wallThickness / 2);
    scene.add(rightWallMesh);
    return [backWallMesh, rightWallMesh]
}

// Function to create the frame on the right wall
export function createFrame(scene) {
    const textureLoader1 = new THREE.TextureLoader();
    const texture1 = textureLoader1.load('textures/wood3.jpeg');//https://pin.it/1WjkqDZq5
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(3, 3);
    const frameMaterial = new THREE.MeshPhongMaterial({ map: texture1 });
    const frameGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameMesh.position.set(4 - 0.2 / 2 - 0.1, 2, -2); // Adjust position
    frameMesh.rotation.y = Math.PI / 2; // Rotate 90 degrees to face into the room
    scene.add(frameMesh);
    // Cuadro
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/picture.avif');
    const pictureMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const pictureGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.001);
    const pictureMesh = new THREE.Mesh(pictureGeometry, pictureMaterial);
    pictureMesh.position.set(4 - 0.3 / 2 - 0.1, 2, -2); // Adjust position
    pictureMesh.rotation.y = Math.PI / 2; // Rotate 90 degrees to face into the room
    scene.add(pictureMesh);
    return [frameMesh, pictureMesh]
}

// Function to create sphere "marks" as a buttons to see the furniture
export function marks(scene) {

    const bedMarkGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const bedMarkMaterial = new THREE.MeshPhongMaterial({ color: 'white', transparent: true, opacity: 0.5 });
    const bedMark = new THREE.Mesh(bedMarkGeometry, bedMarkMaterial);
    bedMark.position.set(1.5, 4, -2.5);
    bedMark.name = 'bedMark'

    const tableMarkGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const tableMarkMaterial = new THREE.MeshPhongMaterial({ color: 'white', transparent: true, opacity: 0.5 });
    const tableMark = new THREE.Mesh(tableMarkGeometry, tableMarkMaterial);
    tableMark.position.set(-2, 4, -3.5);
    tableMark.name = 'tableMark'

    const wardrobeMarkGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const wardrobeMarkMaterial = new THREE.MeshPhongMaterial({ color: 'white', transparent: true, opacity: 0.5 });
    const wardrobeMark = new THREE.Mesh(wardrobeMarkGeometry, wardrobeMarkMaterial);
    wardrobeMark.position.set(3.5, 4, 1.6);
    wardrobeMark.name = 'wardrobeMark'

    const mark = new THREE.Group();
    mark.add(bedMark, wardrobeMark, tableMark)
    scene.add(mark)
    return mark
}
