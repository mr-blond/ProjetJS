var nbPalier = 3;

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs'),
    arduinoSerialPort = 'COM3',
    palierData=[];
    serialportRequire = require('serialport');
    serialPort = new serialportRequire.SerialPort(arduinoSerialPort,{        
		parser: serialportRequire.parsers.readline('\n')
	}
    );
//initialition des plateformes
for(var i=0;i<nbPalier;i++){
    //calcul de l'angle aélatoire du pallier
    var angle;
    if(Math.random() >0.5){
        angle = 1 - Math.random();
    }else{
        angle = 1 + Math.random();
    }
    var currentPalier = [i,100+50*i ,100+50*i,angle];

    palierData.push(currentPalier);
}

io.sockets.on('connection', function (socket) {
   
    // Demande de déplacement de forme
    socket.on('targetMove', function (message) {
        
       // console.log(message);
        
        //j'envois à toute les personnes sur le réseau l'information
        socket.broadcast.emit('onTargetMove', message);
   
    }); 
   //rotation de la totalité des plateformes
    socket.on('stageRotation', function (data) {
       // console.log(data);
      socket.broadcast.emit('stageRotation', data);
   
    }); 
    // Controle du servo, data contient l'entrée PIN et la valeur de l'angle du servo
    socket.on('servo', function (data) {
        //console.log(data);
        serialPort.write('!'+data.pin+'-'+data.pos+':');
   
    }); 
    socket.on('askPos', function (message) {
        
        console.log(palierData);
        
        //j'envois à toute les personnes sur le réseau l'information
        socket.broadcast.emit('posPalier', palierData);
   
    }); 
    

    
    
});

server.listen(8080);
