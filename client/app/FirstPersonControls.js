'use strict';

define(['Three', 'Scene', 'PlayerSync', 'Loop', 'World'], function(THREE, scene, playerSync, loop, world) {
    var raycaster;
    var canJump = true;
    var moveForward = false;
    var running = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var velocity = new THREE.Vector3();
    var lastPosition = new THREE.Vector3();
    var floor;

    // This array should contain all objects we want to intersect with using the raycaster - for now we just care about the floor
    // Later on we should probably use a richer collision detection mechanism, such as http://www.threejsgames.com/extensions/
    var collidableObjects = [];

    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100000);
    var controls = new THREE.PointerLockControls(camera);

    var init = function() {
        floor = scene.getScene().getObjectByName('Floor');
        if (floor !== undefined) {
            collidableObjects.push(floor);
        }

        controls.getObject().position.y = 15;
        scene.getScene().add(controls.getObject());

        var onKeyDown = function(event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    moveLeft = true;
                    break;
                case 40: // down
                case 83: // s
                    moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;
                case 32: // space
                    if (canJump === true) velocity.y += 350;

                    // Comment out this line and people can fly :D
                    canJump = false;
                    break;
                case 16:
                    running = true;
                    break;
            }
        };

        var onKeyUp = function(event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    moveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                    moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                    moveRight = false;
                    break;
                case 16:
                    running = false;
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
        
        loop.onLoop(animate);
    };
    
    var animate = function(time) {
        var restrainPosition = function(obj) {
            if (obj.position.y < 0) {
                velocity.y = 0;
                obj.position.y = 0;
                canJump = true;
            }

            if (obj.position.x > 490) {
                obj.position.x = 490;
            }

            if (obj.position.x < -490) {
                obj.position.x = -490;
            }

            if (obj.position.z > 490) {
                obj.position.z = 490;
            }

            if (obj.position.z < -490) {
                obj.position.z = -490;
            }
        };

        if (controls.enabled) {
            var obj = controls.getObject();
            raycaster.ray.origin.copy(obj.position);
            raycaster.ray.origin.y -= 10;
            var intersections = raycaster.intersectObjects(collidableObjects);
            var isOnObject = intersections.length > 0;
            var delta = time.delta / 1000;
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            velocity.y -= 9.8 * 75.0 * delta; // 75.0 = mass

            var speed = running ? 16000 : 4000;

            if (moveForward) velocity.z -= speed * delta;
            if (moveBackward) velocity.z += speed * delta;
            if (moveLeft) velocity.x -= speed * delta;
            if (moveRight) velocity.x += speed * delta;
            if (isOnObject) {
                velocity.y = Math.max(0, velocity.y);
                canJump = true;
            }

            obj.translateX(velocity.x * delta);
            obj.translateY(velocity.y * delta);
            obj.translateZ(velocity.z * delta);

            restrainPosition(obj);

            if(!obj.position.equals(lastPosition)) {
                playerSync.playerMoved(obj.position);
            }
            
            lastPosition.copy(obj.position);
        }
    };
    
    var getPosition = function() {
        return controls.getObject().position;
    };
    
    world.onInit(init);

    return {
        controls: controls,
        camera: camera,
        getPosition: getPosition
    };
});
