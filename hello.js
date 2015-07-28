var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bgcol = "#070711";
var platformcol = "#222277";
var spikecol = "#AAAADD";

function Img (filename) {
	this.loaded = false;
	
	this.img = new Image();
	
	var that = this;
	this.img.onload = function () {that.loaded = true;};
	this.img.src = filename;
	
	
	this.render = function (x, y, w, h, sx, sy) {
		if (this.loaded) {
			ctx.drawImage(this.img, sx, sy, w, h, x, y, w, h);
		}
	};
};

function Sprite(img, sx, sy, w, h) {
	this.img = img;
	this.sx = sx; this.sy = sy; this.w = w; this.h = h;
	
	this.render = function (x, y) {
		this.img.render(x, y, this.w, this.h, this.sx, this.sy);
	}
}

var textures = new Img("player.png");

var player = {
	y:200, x:100,
	w:32, h:32,
	
	dir:1, //1 = down, -1 = up
	sprite: new Sprite(textures, 0, 0, 32, 32),
	
	flip: function() {player.dir = -player.dir;},
	
	grounded:false
};


function Platform (dir, y, start, len, kill) {
	this.dir = dir;
	this.y = y;
	this.start = start*spd; this.len = len*spd;
	
	this.kill = kill;
	
	this.h = (dir=='up')!=kill ? 10 : -10;
	
	this.grd = ctx.createLinearGradient(0,y,0,y + this.h);
	this.grd.addColorStop(0, kill ? spikecol : platformcol);
	this.grd.addColorStop(1, bgcol);
};

var level = [];

var platforms = [];
var atPlatform = 0;

function addPlatform(dir, y, start, len, kill) {
	kill = kill || false;
	for (x = start; x + canvas.width < start + len; x += canvas.width) {
		level.push(new Platform(dir, y, x, canvas.width, kill));
	}
	level.push(new Platform(dir, y, start + len - (len%canvas.width), len%canvas.width, kill));
};


function doTick(delta, t) {
	var prevy = player.y;
	
	player.y += player.dir * delta;
	if (player.y < 0) {
		player.y = 0;
	} else if (player.y + player.h > 512) {
		player.y = 512 - player.h;
	}
	var killy = undefined;
	
	for (i = atPlatform; i != platforms.length; i++) {
		p = platforms[i];
		if (!p) continue;
		if (p.start > t - player.x + canvas.width) break;
		
		if (t+player.w >= p.start && t <= p.start + p.len) {
			
			if (p.dir == 'up') {
				if (prevy+player.h <= p.y && player.y+player.h >= p.y) {
					
					if (!p.kill) player.y = p.y - player.h;
					else if (killy == undefined || p.y < killy) killy = p.y - player.h;
				}
			} else if (p.dir == 'down') {
				if (prevy >= p.y && player.y <= p.y) {
					if (!p.kill) player.y = p.y;
					else if (killy == undefined || p.y > killy) killy = p.y;
				}
			}
		}
	}
	
	if (killy != undefined) {
		if ((prevy <= killy) == (player.y >= killy)) return false;
	}
	
	player.grounded = prevy == player.y;
	return true;
}

function render(t) {
	ctx.fillStyle = bgcol;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	
	for (i = atPlatform; i != platforms.length; i++) {
		p = platforms[i];
		if (!p) continue;
		if (p.start > t - player.x + canvas.width) break;
		
		
		ctx.fillStyle = p.grd;
		ctx.fillRect(p.start-t+player.x, p.y, p.len, p.h);
		
	}
	player.sprite.render(player.x,player.y);
}

function doCleanup(t) { //cleanup every platform thats passed
	for (i = atPlatform; i != platforms.length; i++) {
		p = platforms[i];
		if (!p) continue;
		
		if (p.start + p.len < t - player.x) {
			platforms[i] = false;
		}
	}
	for (i = atPlatform; i != platforms.length; i++) {
		if (platforms[i]) break;
		atPlatform++;
	}
}

canvas.addEventListener("click", function() {if (player.grounded) player.flip();});

var prevt;
var startt;
var spd = 0.4;

var mspf = 1000/60;

addPlatform('down', 0, 5500, 10000, true);
addPlatform('up', 512, 6000, 9500, true);

addPlatform('down', 100, 5500, 1200);
addPlatform('up', 400, 6600, 2200);
addPlatform('down', 200, 8000, 1200);
addPlatform('up', 300, 9000, 2200);
addPlatform('down', 150, 11000, 1000);
addPlatform('up', 300, 11700, 2000);
addPlatform('down', 100, 13400, 1000);
addPlatform('up', 400, 14500, 1700);

function main () {
	var newt = Date.now();
	var delta = newt-prevt;
	prevt = newt;
	
	var t = (newt - startt - player.x)*spd;
	
	doCleanup(t);
	
	var alive = doTick(delta, t);
	render(t);
	
	delta = delta + (Date.now() - prevt);
	
	if (alive) setTimeout(main,mspf-delta);
	else reset();
}

function reset() {
	
	prevt = Date.now();
	startt = Date.now();
	atPlatform = 0;
	
	level.sort(function(a,b){return a.start-b.start});
	
	platforms = level.slice();
	
	player.dir = 1; player.y = canvas.height - player.h;
	
	bgmusic.pause();
	bgmusic.currentTime = 0;
	bgmusic.play();
	
	main();
}

var bgmusic = document.getElementById("bgmusic");

bgmusic.addEventListener('canplay', reset);
