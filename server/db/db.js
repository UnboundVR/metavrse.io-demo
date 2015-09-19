'use strict';

var couchbase = require('couchbase');
var promise = require('promise');
var extend = require('extend');

var init = function(cluster, bucket, bucketPassword) {    
    this._cluster = new couchbase.Cluster(cluster);
    this._bucket = this._cluster.openBucket(bucket, bucketPassword);
    extend(this, denodeifyObj(this._bucket, 
        ['get', 'counter', 'insert', 'getMulti']));
};

var denodeifyObj = function(obj, functions) {
    var res = {};
    
    for(var i = 0; i < functions.length; i++) {
        var func = functions[i];
        res[func] = promise.denodeify(obj[func]).bind(obj);
    }
    
    return res;
};

var getByAlias = function(type, prop, alias) {
    var _this = this;
    return this.get(type + '::' + prop + '::' + alias).then(function(res) {
       return _this.get(type + '::' + res.value); 
    });
};

var toValueList = function(dict) {
    var results = [];
    
    for(var key in dict) {
       results.push(dict[key].value);
    }
    
    return results;
};

var getMultiByAlias = function(type, prop, aliases) {
    var append = function(prefix) {
        return function(stuff) {
            return prefix + stuff;
        }
    };
    
    var _this = this;
    return this.getMulti(aliases.map(append(type + '::' + prop + '::'))).then(function(res) {
       return _this.getMulti(toValueList(res).map(append(type + '::'))).then(function(res2) {
           return toValueList(res2);
       });
    });
};

module.exports = {
    init: init,
    getByAlias: getByAlias,
    getMultiByAlias: getMultiByAlias
};