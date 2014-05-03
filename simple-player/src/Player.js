// Closure for a global id object
(function(window){

// unique id for player
var id = 0;

//
// PLAYER class
//

window.Player = function Player(){

	console.log('New player.');

	// PROTECTED
	var player = this;

	// PUBLIC
	this.id = ++id;
	this.position = {x:100,y:100};

	this.direction = 0;
	this.heading = $V([0,-1]); // north facing -y

	this.elevation = 0; // angle of elevation, 0 - horizon, range -90 to 90
	this.pitch = null; // reserved

	this.draw = function(ctx){

		var p = this.position;

		// Draw a circle around a point
		ctx.beginPath();
		ctx.arc(p.x,p.y,100,100,0,Math.PI*2);
		ctx.stroke();

		// Direction
		ctx.strokeStyle = 'rgba(255,0,0,0.4)';
		ctx.beginPath();
		c.moveTo(p.x,p.y);
		var dV = player.heading.multiply(100);
		var d = vectorToPoint(dV);
		c.lineTo(p.x+d.x,p.y+d.y);
		c.stroke();

		// Elevation
		ctx.fillStyle = 'rgb(23,84,38)';
		ctx.fillRect(p.x-122,p.y-50,12,100);
		ctx.strokeStyle = 'rgb(255,0,0)';

		var offset = player.elevation*50/90;
		ctx.beginPath();
		ctx.moveTo(p.x-122,p.y+offset);
		ctx.lineTo(p.x-110,p.y+offset);
		ctx.stroke();

		// Player transformation
		ctx.translate(p.x,p.y);
		ctx.rotate(Math.rad(this.direction));

		// Draw the player
		ctx.fillStyle = 'rgb(255,0,0)';

		ctx.beginPath();
		ctx.moveTo(-4,4);
		ctx.lineTo(0,-4);
		ctx.lineTo(4,4);
		ctx.fill();

		// Transform back
		ctx.rotate(-1 * Math.rad(this.direction));
		ctx.translate(0-p.x,0-p.y);

	};

	this.setDirection = function(deg){

		deg = deg%360;
		if(deg<0) deg += 360;

		player.direction = deg;
		player.heading = $V([0,-1]).rotate(Math.rad(deg),$V([0,0]));
	};

	// 360-degree rotation
	this.rotate = function(deg){

		player.direction = (player.direction + deg)%360;
		if(player.direction < 0) player.direction += 360;

		player.heading = player.heading.rotate(Math.rad(deg),$V([0,0]));
		//console.log(player.heading.inspect());

	};

	this.setElevation = function(deg){

		if(deg < -90) deg = -90;
		if(deg > 90) deg = 90;

		player.elevation = deg;

	};

	// tilt within the range of -90 – 90
	this.tilt = function(deg){

		player.elevation += deg;

		if(player.elevation < -90) player.elevation = -90;
		if(player.elevation > 90) player.elevation = 90;

	};

	// EVENT LISTENERS
    window.addEventListener('keydown', handleKeyDown, false);


	// EVENT HANDLERS
	// key events bubble on a Mac - may need to make a timer on PC
	function handleKeyDown(e){
    
		switch(e.keyCode){

			// LEFT / A,a
			case 37:
			case 65: case 97:
				//console.log('Player: Left/Anti-Clockwise');
				player.rotate(-10);
				break;

			// UP / W,w
			case 38:
			case 87: case 199:
				//console.log('Player: Up');
				player.tilt(-5);
				break;

			// RIGHT / D,d
			case 39:
			case 68: case 100:
				//console.log('Player: Right/Clockwise');
				player.rotate(10);
				break;

			// DOWN / S,s
			case 40:
			case 83: case 115:
				//console.log('Player: Down');
				player.tilt(5);
				break;

			// Default
			default:
				//console.log('Player: Keycode: '+e.keyCode);
		}
	}
	
};

// End closure
})(window);