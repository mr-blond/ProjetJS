function SocketIoWrapper() {
}
SocketIoWrapper.nbFramePerGouttelette = 20;
SocketIoWrapper.update = function(){};
SocketIoWrapper.fallGouttelette = function(){};
SocketIoWrapper.init = function()
{
	if(typeof io != 'undefined')
	{
		SocketIoWrapper.socket = io.connect('http://localhost:8080');

		SocketIoWrapper.socket.on('onTargetMove', function(data)
		{
			//console.log('Changement de position : ' + data.id + ' - ' + data.x + ' - ' + data.y);
			Palier.move(data.id, data.x, data.y);

			/*
			 if(data.id !== mustTurn){
			 mustTurn = data.id;
			 var infoServo = {'pos':mustTur*40,'pin':12};
			 socket.emit('servo', infoServo); // Transmet le message aux autres
			 }
			*/
		});

		SocketIoWrapper.goutteletteWaitingToFall = 0;
		SocketIoWrapper.fallGouttelette = function()
		{
			//console.log('fall');
			if(SocketIoWrapper.goutteletteWaitingToFall == 0)
			{
				SocketIoWrapper.openWater();
			}
			SocketIoWrapper.goutteletteWaitingToFall = SocketIoWrapper.nbFramePerGouttelette;
		};
		SocketIoWrapper.update = function(){
			if(SocketIoWrapper.goutteletteWaitingToFall > 0)
			{
				SocketIoWrapper.goutteletteWaitingToFall--;
				if(SocketIoWrapper.goutteletteWaitingToFall == 0)
				{
                    //console.log('stopfall');
					SocketIoWrapper.closeWater();
				}
			}
		};

        //Rotation de la tablette
		SocketIoWrapper.socket.on('stageRotation', function(data)
		{
			//console.log('Rotation de la tablette : ' +  data.rotation);
			Level.rotate(data.rotation);
		});

        //ouverture du flux d'eau
		SocketIoWrapper.openWater = function()
		{
			console.log('openWater');
			SocketIoWrapper.socket.emit('servo', {'pos':130,'pin':10});
		};

		//fermeture du flux d'eau
		SocketIoWrapper.closeWater = function()
		{
			console.log('closeWater');
			SocketIoWrapper.socket.emit('servo',{'pos':000,'pin':10});
		};

		//tourner le rouleau
		SocketIoWrapper.startTurn = function()
		{
            //console.log('startTurn');
			SocketIoWrapper.socket.emit('servo', {'pos':000,'pin':13});
		};

		//stoper le rouleau
		SocketIoWrapper.stopTurn = function()
		{
            //console.log('stopTurn');
			SocketIoWrapper.socket.emit('servo', {'pos':090,'pin':13});
		};

        //Tourne le rouleau d'un cran
		SocketIoWrapper.majRotate = function()
		{
			SocketIoWrapper.startTurn();
			setTimeout(function(){
				SocketIoWrapper.stopTurn();
				
			},500	);
			console.log(1);
		}
		setInterval(SocketIoWrapper.majRotate,60*1000);

		//Init Goutelette
		SocketIoWrapper.openWater();
		setTimeout(SocketIoWrapper.closeWater, 500);
	}
	else
	{
		console.log('Serveur node introuvable');
	}
};