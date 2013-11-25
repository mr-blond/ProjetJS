function SocketIoWrapper() {
}
SocketIoWrapper.nbFramePerGouttelette = 1;
SocketIoWrapper.update = function(){};
SocketIoWrapper.fallGouttelette = function(){};
SocketIoWrapper.init = function()
{
	if(typeof io != 'undefined')
	{
		SocketIoWrapper.socket = io.connect('http://localhost:8080');

		SocketIoWrapper.socket.on('onTargetMove', function(data)
		{
			console.log('Changement de position : ' + data.id + ' - ' + data.x + ' - ' + data.y  + ' - ' + data.rotation);
			Palier.move(data.id, data.x, data.y, 0);

			/*Palier.move(data.id, data.x, data.y, data.rotation);

			 if(data.id !== mustTurn){
			 mustTurn = data.id;
			 var infoServo = {'pos':mustTur*40,'pin':12};
			 socket.emit('servo', infoServo); // Transmet le message aux autres
			 }*/
		});

		SocketIoWrapper.goutteletteWaitingToFall = 0;
		SocketIoWrapper.fallGouttelette = function()
		{
			//console.log('fall');
			if(SocketIoWrapper.goutteletteWaitingToFall == 0)
			{
				SocketIoWrapper.openWater();
				//console.log('open');
			}
			SocketIoWrapper.goutteletteWaitingToFall += SocketIoWrapper.nbFramePerGouttelette;
		};
		SocketIoWrapper.update = function(){
			if(SocketIoWrapper.goutteletteWaitingToFall > 0)
			{
				SocketIoWrapper.goutteletteWaitingToFall--;
				if(SocketIoWrapper.goutteletteWaitingToFall == 0)
				{
					SocketIoWrapper.closeWater();
					//console.log('close');
				}
			}
		};

		SocketIoWrapper.socket.on('stageRotation', function(data)
		{
			console.log('Rotation de la tablette : ' +  data.rotation);
			Level.rotate(data.rotation);
		});

		SocketIoWrapper.openWater = function()
		{
			SocketIoWrapper.socket.emit('servo', {'pos':130,'pin':12});
		};

		//fermeture du flux d'eau
		SocketIoWrapper.closeWater = function()
		{
			SocketIoWrapper.socket.emit('servo',{'pos':000,'pin':12});
		};

		//tourner kle rouleau
		SocketIoWrapper.startTurn = function()
		{
			SocketIoWrapper.socket.emit('servo', {'pos':000,'pin':11});
		};

		//stoper le rouleau
		SocketIoWrapper.stopTurn = function()
		{
			SocketIoWrapper.socket.emit('servo', {'pos':090,'pin':11});
		};


		SocketIoWrapper.majRotate = function()
		{
			SocketIoWrapper.startTurn();
			setTimeout(function(){
				SocketIoWrapper.stopTurn();
				setTimeout(SocketIoWrapper.majRotate,15*60*1000);
			},200	);
			console.log(1);
		}
		SocketIoWrapper.majRotate();
	}
	else
	{
		console.log('Serveur node introuvable');
	}
};