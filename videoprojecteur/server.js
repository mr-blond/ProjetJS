var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs'),
    arduinoSerialPort = 'COM3',
    serialportRequire = require('serialport');
    serialPort = new serialportRequire.SerialPort(arduinoSerialPort,{        
		parser: serialportRequire.parsers.readline('\n')
	}
    );


// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
})

io.sockets.on('connection', function (socket) {
   
    // Demande de déplacement de forme
    socket.on('targetMove', function (message) {
        
        console.log(message);
        
        //j'envois à tute les personnes sur le réseau l'information
        socket.broadcast.emit('onTargetMove', message);
   
    }); 
    
    // Controle du servo, data contient l'entrée PIN et la valeur de l'angle du servo
    socket.on('servo', function (data) {
        console.log(data);
        serialPort.write('!'+data.pin+'-'+data.pos+':');
   
    }); 
    
    //reception d'info de la part de l'arduino
    /*serialPort.on('data', function (data){
        try
        {
            console.log(data);
        }
        catch (ex)
        {
            console.warn(ex);
        }
    }); */       
});

server.listen(8080);
