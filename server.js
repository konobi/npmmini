#!/usr/bin/env node

var router = require("routes").Router();
var c = require("connect");
var url = require('url');
var http = require("http");
var path = require("path");
var fs = require('fs');

var cache_path = '/tmp/cache_npmmini';

//router.addRoute("^/-/all", );

var pkg_index_json = function(req, res, params, splats, next){
    //req.url = '/' + params.pkg + '/.cache.json';
    var path_thing = path.join(cache_path, params.pkg, '/.cache.json');
    var pkg = params.pkg;
    fs.readFile(path_thing, function(err, data){
        var obj = JSON.parse(data);
        for(x in obj.versions){
            obj.versions[x].dist.tarball = "http://127.0.0.1:3000/" + pkg + "/-/" + pkg + '-' + x + '.tgz';
        }
        res.end(JSON.stringify(obj));
    });
}
router.addRoute("/:pkg$", pkg_index_json);

var pkg_tarball = function(req, res, params, splats, next){
    var version = params.version.replace('.tgz', '');
    req.url = '/' + params.pkg + '/' + version + '/package.tgz';
    next();
}
router.addRoute("/:pkg/-/([^-]+?)-:version", pkg_tarball);

var app = c()
    .use(c.logger('dev'))
    .use(function (req, res, next) {
        var pathname = url.parse(req.url).pathname;
        var fun = router.match(pathname);
        if (!fun) {
            req.status = 404;
            next();
        }
        fun.fn.call(null, req, res, fun.params, fun.splats, next);
    })
    .use(c.static(cache_path, { hidden: true, redirect: false }));

http.createServer(app).listen(3000);
