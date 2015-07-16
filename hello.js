var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


function fillBoard() {
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width, canvas.height);
}

function renderPlayer() {
	ctx.fillStyle="#FF0000";
	var playerpos = getPlayerPos();
	ctx.fillRect(playerpos.x-5, playerpos.y-5, 10, 10);
}


var Movement = function (end) {
	this.end = end;
	this.starttime = Date.now();

	this.isDone = function () {
		return Date.now() >= this.starttime + this.end;
	}

	this.getPos = function () {
		var delta = Date.now() - this.starttime;
		if (this.end < delta) {
			return this.end;
		} else {
			return delta * delta / this.end;
		}
	}
}

var player = {
	startx:10, starty:10,
	targetx:10, targety:10,
	
	movement: new Movement(0)
}


canvas.addEventListener('click',
			function(e) {
				setPlayerTarget(e.clientX - canvas.offsetLeft,
								e.clientY - canvas.offsetTop);
			});

function setPlayerTarget(x, y) {
	var p = getPlayerPos();
	player.startx = p.x; player.starty = p.y;
	player.targetx = x;
	player.targety = y;
	player.movement = new Movement(2000);
}

function getPlayerPos() {
	if (player.movement.isDone()) {
		return {x:player.targetx, y:player.targety};
	} else {
		var at = player.movement.getPos() / player.movement.end;
		return {x:player.startx + (player.targetx - player.startx)*at,
				y:player.starty + (player.targety - player.starty)*at};
	}
}


function main() {
	fillBoard();
	renderPlayer();
	window.requestAnimationFrame(main);
}

main();
