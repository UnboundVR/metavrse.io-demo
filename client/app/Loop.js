define([], function() {
    
    var loopCallbacks = [];
    var request;
    var prevTime;
    
    var loop = function(time) {
        loopCallbacks.forEach(function(callback) {
            callback({time: time, delta: time - prevTime});
        });
        
        prevTime = time;
        request = requestAnimationFrame(loop);
    };
    
    var onLoop = function(callback) {
        loopCallbacks.push(callback);
    };
    
    var start = function() {
        request = requestAnimationFrame(loop);
        prevTime = performance.now();
    };
    
    var stop = function() {
        cancelAnimationFrame(request);
    };
    
    return {
        start: start,
        stop: stop,
        onLoop: onLoop
    }
});