var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
canvas.style = "position: absolute; left:50%; margin-left:-256px; margin-top:20px"
document.body.appendChild(canvas);

var fillBg = function() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,512,512);
}	

var player = {
	x: 256, y: 256,
	size: 10,
	color: "#FF0000",
	
	speed: 256,
	
	render: function () {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
	}
}

var keysDown = {}

addEventListener("keydown", function(e) {keysDown[e.keyCode]=true; })
addEventListener("keyup",   function(e) {delete keysDown[e.keyCode];})

function update(delta) {
	
	if (87 in keysDown) {
		player.y-=delta*player.speed/1000;
	}
	
	if (83 in keysDown) {
		player.y+=delta*player.speed/1000;
	}
	
	if (65 in keysDown) {
		player.x-=delta*player.speed/1000;
	}
	
	if (68 in keysDown) {
		player.x+=delta*player.speed/1000;
	}
}

var then = Date.now();

var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	update(delta);

	fillBg();
	player.render();

	then = now;
	window.requestAnimationFrame(main);
}

main();