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
        Stats: {exports: 'Stats'},
        RTCMultiConnection: {deps: ['GlobalSocketIO'], exports: 'RTCMultiConnection'},
        THREETerrain: {deps: ['ThreeCore'], exports: 'THREE'}
    },
    paths: {
        Three: '../lib/Three',
        ThreeCore: '/node_modules/three.js/build/three.min',
        OrbitControls: '../lib/controls/OrbitControls',
        PointerLockControls: '../lib/controls/PointerLockControls',
        StereoEffect: '../lib/effects/StereoEffect',
        CSS3DRenderer: '../lib/renderers/CSS3DRenderer',
        SocketIO: '/socket.io/socket.io',
        Detector: '../lib/Detector',
        Stats: '../lib/Stats.min',
        Tween: '/node_modules/tween.js/src/Tween',
        RTCMultiConnection: '/node_modules/rtcmulticonnection-v3/RTCMultiConnection.min',
        shared: '../../shared',
        GlobalSocketIO: '../lib/GlobalSocketIO',
        text: '../lib/requirejs/Text',
        html: '../lib/requirejs/HTML',
        i18n: '../lib/requirejs/i18n',
        Constants: '../../shared/constants',
        assets: '../assets',
        THREETerrain: '/node_modules/three.terrain.js/build/THREE.Terrain.min'
    },
    deps: ['PointerLock', 'FirstPersonControls', 'ItemSelector', 'PlayerSync', 'Reticle', 'Renderer', 'KeyVR', '2dui/Container', 'RTC', 'Performance', 'Terrain']
};
