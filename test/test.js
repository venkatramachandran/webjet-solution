var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var request = require('../request');
var cache = require('../cache');
var api = require('../api');
var log = require('../log');

chai.use(chaiAsPromised);
var assert = chai.assert;
var should = chai.should();

before(function(){
    log.level("fatal");
});

describe("request", function(){
    describe("get", function(){
        it("should provide JSON parsed output", function(){
            request("/filmworld").should.eventually.be.a('object');
        });
    });
});

describe("cache", function(){
    describe("put", function(){
        it("should store input", function(){
            cache.putData("a", {b: "b"}).should.be.a('boolean');
        });
    });
    describe("get", function(){
        it("should return stored object", function(){
            cache.getData("a").should.be.a('object');
        });
        it("should not throw error on cache miss", function(){
            should.equal(cache.getData("b"), undefined);
        });
    });
});

describe("api", function(){
    describe("getMovies", function(){
        it("should provide an array", function(){
            var movies = api.getMovies();
            movies.should.eventually.be.a('array');
        });
    });
    describe("getMovie", function(){
        it("should provide an object", function(){
            var movie = api.getMovie('cw0076759', 'fw0076759');
            movie.should.eventually.be.a('object');
        });
    });
});