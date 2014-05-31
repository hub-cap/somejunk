var cluster = require('cluster');
var express = require('express');
var app = express();

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i+=1) {
        cluster.fork();
    }
} else {
	app.get('/', function (req, res){
	    res.send('hello from worker ' + cluster.worker.id);
	});
    app.listen(3000);
	console.log('application running ' + cluster.worker.id);
}

cluster.on('exit', function (worker) {
    console.log('worker died ' + worker.id);
    cluster.fork();
});
