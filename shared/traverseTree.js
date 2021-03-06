'use strict';

// Taken from https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js and adapted
var traverse = function(obj, callback) {
    var children = obj.children;

    callback(obj);

    if (children && children.length) {
        children.forEach(function(child) {
            traverse(child, callback);
        });
    }
};

if (typeof exports === 'object') {
    module.exports = traverse;
} else {
    window.traverseTree = traverse;
}
