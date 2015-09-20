'use strict';

var require = {
    baseUrl: 'client/app',
    shim: {
        ThreeCore: {exports: 'THREE'},
        SocketIO: {exports: 'io'},
        OrbitControls: {deps: ['ThreeCore'], exports: 'THREE'},
        PointerLockControls: {deps: ['ThreeCore'], exports: 'THREE'},
        StereoEffect: {deps: ['ThreeCore'], exports: 'THREE'},
        CSS3DRenderer: {deps: ['ThreeCore'], exports: 'THREE'},
        Detector: {exports: 'Detector'},
        Stats: {exports: 'Stats'}
    },
    paths: {
        Three: '../lib/Three',
        ThreeCore: '../lib/three/three.min',
        OrbitControls: '../lib/controls/OrbitControls', // TODO change back to npm when the registry updates to r72
        PointerLockControls: '../lib/controls/PointerLockControls',
        StereoEffect: '../lib/effects/StereoEffect',
        CSS3DRenderer: '../lib/renderers/CSS3DRenderer',
        SocketIO: '/socket.io/socket.io',
        Detector: '../lib/Detector',
        Stats: '../lib/Stats.min',
        Tween: '/node_modules/tween.js/src/Tween',
        shared: '../../shared'
    },
    deps: ['PointerLock', 'FirstPersonControls', 'ItemSelector', 'PlayerSync', 'Reticle', 'ScriptsManager', 'Renderer']
};
