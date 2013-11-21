function SocketIoWrapper() {
}
SocketIoWrapper.nbFramePerGouttelette = 30;
SocketIoWrapper.update = function(){};
SocketIoWrapper.fallGouttelette = function(){};
SocketIoWrapper.init = function()
{
	if(typeof io != 'undefined')
	{
		this.socket = io.connect('http://localhost:8080');

		this.socket.on('onTargetMove', function(data)
		{
			console.log('Changement de position : ' + data.id + ' - ' + data.x + ' - ' + data.y  + ' - ' + data.rotation);
			Palier.move(data.id, data.x, data.y, data.rotation);

			/*Palier.move(data.id, data.x, data.y, data.rotation);

			 if(data.id !== mustTurn){
			 mustTurn = data.id;
			 var infoServo = {'pos':mustTurn*40,'pin':12};
			 socket.emit('servo', infoServo); // Transmet le message aux autres
			 }*/
		});

		this.goutteletteWaitingToFall = 0;
		SocketIoWrapper.fallGouttelette = function()
		{
			if(goutteletteWaitingToFall == 0)
			{
				this.openWater();
			}
			this.goutteletteWaitingToFall += this.nbFramePerGouttelette;
		};
		SocketIoWrapper.update = function(){
			this.startTurn();
			if(this.goutteletteWaitingToFall > 0)
			{
				this.goutteletteWaitingToFall--;
				if(this.goutteletteWaitingToFall == 0)
				{
					this.closeWater();
				}
			}
		};

		this.socket.on('stageRotation', function(data)
		{
			console.log('Rotation de la tablette : ' +  data.rotation);
			Level.rotate(data.rotation);
		});

		this.openWater = function()
		{
			socket.emit('servo', {'pos':130,'pin':12});
		};

		//fermeture du flux d'eau
		this.closeWater = function()
		{
			socket.emit('servo',{'pos':000,'pin':12});
		};

		//tourner kle rouleau
		this.startTurn = function()
		{
			socket.emit('servo', {'pos':000,'pin':11});
		};

		//stoper le rouleau
		this.stopTurn = function()
		{
			socket.emit('servo', {'pos':010,'pin':11});
		};

		this.closeWater();
	}
	else
	{
		console.log('Serveur node introuvable');
	}
};