window.Stage = function Stage(aCanvas){

	console.log("New Stage.");

	var stage = this;

	// PROTECTED
	var canvas = aCanvas;
	var c = canvas.getContext('2d');

	// Stage objects - each should be able to draw itself
	var objects = [];

	// PUBLIC
	this.count = 0; // counts frames since start
	this.FPS = 0; // observable FPS

	//
	// STAGE UPDATE
	//

	this.update = function(){

		// Clear the canvas
		c.clearRect(0, 0, canvas.width, canvas.height);

		// set a default fill & stroke
		c.fillStyle = 'rgb(255,0,0)';
		c.strokeStyle = 'rgb(64,64,64)';

		for(var i=0;i<objects.length;i++){

			var currentObject = objects[i];
			if(typeof currentObject.draw === 'function') currentObject.draw(c);
		}
	};

	// very light stub
	this.addObject = function(o){
		objects.push(o);
	};

	// Event listeners - Window
	window.addEventListener('click', handleClick, false);
	window.addEventListener('touchend', handleClick, false);
    
    window.addEventListener('keydown', handleKeyDown, false);

	// Event handlers
	function handleClick(e) {

		// do something on click or touch
		var x = e.clientX;
		var y = e.clientY;

		//stage.update();

		//console.log(e);
		console.log("Clicked at: "+x+","+y);

	}

	// key events bubble on a Mac - may need to make a timer on PC
	function handleKeyDown(e){
    
		switch(e.keyCode){

			// LEFT / A,a
			case 37:
			case 65: case 97:
				//console.log('Left/Anti-Clockwise');
				break;

			// UP / W,w
			case 38:
			case 87: case 199:
				//console.log('Up');
				break;

			// RIGHT / D,d
			case 39:
			case 68: case 100:
				//console.log('Right/Clockwise');
				break;

			// DOWN / S,s
			case 40:
			case 83: case 115:
				//console.log('Down');
				break;

			// Default
			default:
				console.log('Keycode: '+e.keyCode);
		}
	}

};

// Start the animation loop
Stage.prototype.start = function(){

	var stage = this;

	function loop(){

		stage.count++;

		// Update FPS
		this.timestamp = (this.timestamp)?this.timestamp:Date.now();
		var newTimestamp = Date.now();
		var elapsed_ms = newTimestamp - this.timestamp;
		var FPS = Math.floor( 1000 / elapsed_ms );
		this.timestamp = newTimestamp;

		// debounce - sample FPS every second
		if(stage.count%30 === 0) stage.FPS = FPS;
		

		// UPDATE STAGE
		stage.update();

		// Animation
		requestAnimFrame(loop);
	}

	loop();

	
};

// Utilities

// shim layer with setTimeout fallback - doesn't seem to outperform setInterval though...
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

