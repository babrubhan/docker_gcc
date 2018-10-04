
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

/*
docker.createContainer({image:'gccbox', cmd:['sudo docker container run -v /home/babru/dkrTest:/src gccbox gcc -o qq /src/qq.c', 'sudo docker container run -v /home/babru/dkrTest:/src gccbox chmod +x /src/qq', 'sudo docker container run -v /home/babru/dkrTest:/src gccbox /src/qq'], Tty: true }, function(err, container) {



    container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
        stream.pipe(process.stdout);
    });

});
/*
docker.run('gccbox', ['sudo docker container run -v /home/babru/dkrTest:/src gccbox gcc -o qq /src/qq.c',
        'sudo docker container run -v /home/babru/dkrTest:/src gccbox chmod +x /src/qq',
    'sudo docker container run -v /home/babru/dkrTest:/src gccbox /src/qq'],
    process.stdout, {PortBindings: { "80/tcp": [{ "HostPort": "8888" }] } },
    function (err, data, container) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(data);
    }
});*/


/*Cmd: ['sudo docker container run -v /home/babru/dkrTest:/src gccbox gcc -o qq /src/qq.c','sudo docker container run -v /home/babru/dkrTest:/src gccbox chmod +x /src/qq','sudo docker container run -v /home/babru/dkrTest:/src gccbox /src/qq'];

docker.run('gccbox', Cmd, process.stdout, function (err, data, container) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(data);
    }
});

*/

function runExec(container) {

    var options = {
        Cmd: ['docker container run -v /home/babru/dkrTest:/src gccbox gcc -o qq /src/qq.c'],
        Env: ['VAR=ttslkfjsdalkfj'],
        AttachStdout: true,
        AttachStderr: true
    };

    container.exec(options, function(err, exec) {
        if (err) return;
        exec.start(function(err, stream) {
            if (err) return;

            container.modem.demuxStream(stream, process.stdout, process.stderr);

            exec.inspect(function(err, data) {
                if (err) return;
                console.log(data);
            });
        });
    });
}

docker.createContainer({
    Image: 'gccbox',
    Tty: true,
    Cmd: ['docker container run -v /home/babru/dkrTest:/src gccbox gcc -o qq /src/qq.c']
}, function(err, container) {
    container.start({}, function(err, data) {
        if (err) {
            console.log("Error", err);
        }
        runExec(container);
    });
});

























/*var spawn = require('child_process').spawn;
var compile = spawn('gcc', ['qq.c']);
compile.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});
compile.stderr.on('data', function (data) {
    console.log(String(data));
});
compile.on('close', function (data) {
    if (data === 0) {
        var run = spawn('./a.exe', []);
        run.stdout.on('data', function (output) {
            console.log(String(output));
        });
        run.stderr.on('data', function (output) {
            console.log(String(output));
        });
        run.on('close', function (output) {
            console.log('stdout: ' + output);
        })
    }
})*/
//app.listen(8020);