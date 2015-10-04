'use strict';

define(['Three', 'Scene', 'World'], function(THREE, scene, world) {
    var heightmapImage = new Image();

    var init = function() {
        heightmapImage.src = 'client/assets/img/heightmap.png';

        var blend;
        THREE.ImageUtils.loadTexture('client/assets/img/sand1.jpg', undefined, function(t1) {
            t1.wrapS = t1.wrapT = THREE.RepeatWrapping;
            var sand = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(16384 + 1024, 16384 + 1024, 64, 64),
                new THREE.MeshLambertMaterial({map: t1})
            );

            sand.position.y = -101;
            sand.rotation.x = -0.5 * Math.PI;
            scene.getScene().add(sand);
            /*THREE.ImageUtils.loadTexture('client/assets/img/grass1.jpg', undefined, function(t2) {
                t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
                THREE.ImageUtils.loadTexture('client/assets/img/stone1.jpg', undefined, function(t3) {
                    t3.wrapS = t3.wrapT = THREE.RepeatWrapping;
                    THREE.ImageUtils.loadTexture('client/assets/img/snow1.jpg', undefined, function(t4) {
                        t4.wrapS = t4.wrapT = THREE.RepeatWrapping;

                        // t2.repeat.x = t2.repeat.y = 2;
                        blend = THREE.Terrain.generateBlendedMaterial([
                            {texture: t1},
                            {texture: t2, levels: [-80, -35, 20, 50]},
                            {texture: t3, levels: [20, 50, 60, 85]},
                            {texture: t4, glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 10.0, 80.0, vPosition.z)'},

                            // between 27 and 45 degrees
                            {texture: t3, glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2'}

                        ]);
                        regenerate();
                    });
                });
            });*/

            var terrainMaterial = THREE.Terrain.generateBlendedMaterial([
                {texture: THREE.ImageUtils.loadTexture('client/assets/img/sand1.jpg')},
                /*{texture: THREE.ImageUtils.loadTexture('assets/img/mud.jpg'), levels: [-80, -35, 20, 50]},
                 {texture: THREE.ImageUtils.loadTexture('assets/img/grass.jpg'), levels: [-50, -20, 30, 80]},
                 {texture: THREE.ImageUtils.loadTexture('assets/img/cliff.jpg'), glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2'},*/
            ]);
        });
    };

    var regenerate = function() {
        var terrainSettings = {
            easing: THREE.Terrain.EaseInOut,
            heightmap: THREE.Terrain.DiamondSquare,
            material: 'Grayscale',
            maxHeight: 100,
            minHeight: -100,
            steps: 1,
            stretch: true,
            turbulent: false,
            useBufferGeometry: false,
            xSize: 1024,
            ySize: 1024,
            xSegments: 100,
            ySegments: 100,
            _mesh: null
        };

        var terrain = THREE.Terrain(terrainSettings);

        console.log(terrain);

        terrain.scale.set(100, 100, 100);
        terrain.position.set(0, 10, 0);

        scene.getScene().add(terrain);
    };

    world.onInit(init);

});