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

var p = function (dir, y, start, end, kill) { //times in s
	addPlatform(dir, y, 1000*start, 1000*(end-start), kill);
}
var d = 'down', u = 'up';

p(d, 0, -player.x, 60, true);
p(u, 512, 6, 37, true);
p(d, 20, 16, 27, true);
p(u, 512-20, 16, 27, true);

p(d, 100, 5.4, 6.9);
p(u, 400, 6.6, 8.2);
p(d, 200, 7.9, 9.2);
p(u, 300, 9, 11);
p(d, 150, 10.5, 12);
p(u, 300, 11.7, 13.5);
p(d, 100, 13.4, 14.4);
p(u, 400, 14.5, 16);
p(d, 200, 15.8, 17.25);
p(u, 450, 17.3, 18.9);
p(d, 250, 18.8, 19.6);
p(d, 150, 19.7, 21.3);
p(u, 200, 21.1, 22.4);
p(d, 100, 22.1, 24.4);
p(u, 300, 24.4, 25.1);
p(u, 400, 25.1, 26);
p(u, 450, 26.1, 27);
p(d, 100, 27.1, 27.6);
p(u, 450, 27.6, 28.3);
p(d, 200, 28.2, 28.9);
p(u, 400, 28.9, 29.5);
p(d, 300, 29.5, 30.2);
p(u, 380, 30, 30.7);
p(d, 200, 30.6, 31.2);
p(d, 100, 31.3, 32);
p(u, 220, 31.8, 32.4);
p(u, 400, 32.6, 33.5);
p(d, 200, 33.5, 34);
p(d, 150, 34, 34.8);
p(u, 250, 34.8, 35.4);
p(u, 350, 35.5, 35.9);
p(u, 450, 36, 37.5);
p(d, 50, 37.6, 40.3);
for (i = 0; i != 5; i++)
	p(u, 512 - 20 - 40 * i, 38 + i*0.2, 40.2 - i*0.2, true);
p(u, 300, 40.2, 42.6);
for (i = 0; i != 5; i++)
	p(d, 20 + 30 * i, 40.4 + i*0.2, 42.4 - i*0.2, true);
p(d, 200, 42.5, 45);
for (i = 0; i != 5; i++)
	p(u, 512 - 20 - 20 * i, 42.7 + i*0.2, 44.8 - i*0.2, true);
for (i = 0; i != 7; i++)
	p(u, 20 + 40 * i, 45 + i*0.1, 47 - i*0.1, true);

p(u, 512, 48, 60, true);
p(d, 400, 47.8, 48.8);
makeFlight(d, 48.8, 400-50, 49.5, 400-200, 4);
p(d, 50, 49.5, 50.8); 
p(u, 100, 50.7, 51.5);
makeFlight(u, 51.5, 150, 52.2, 300, 4);
p(u, 400, 52.2, 53.3);
p(d, 300, 53.2, 53.6);
p(u, 450, 53.5, 54.5);
p(d, 200, 54.5, 54.8);
p(u, 400, 54.8, 55.9);
p(d, 150, 55.8, 56.2);
p(u, 380, 56.2, 57.3);
p(d, 100, 57.3, 57.6);
p(u, 370, 57.7, 58);
p(u, 420, 58, 58.6);
p(d, 300, 58.5, 58.6);
p(d, 240, 58.6, 59.3);
p(d, 160, 59.3, 59.7);
p(u, 300, 59.6, 60);
p(d, 150, 60, 61);

function makeFlight(dir, start, starty, end, endy, stepno) {
	//makes a flight of stairs
	for (i = 0; i != stepno; i++) {
		p(dir, starty + (endy - starty)*i/stepno,
			start + (end - start)*i/stepno, start + (end - start)*(i+1)/stepno);
	}//i warned you about stairs dude
}//i told you dog 8^y

p(u, 512, 37, 45, true);



var gstartt = 0;

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
	startt = Date.now() - (gstartt * 1000);
	atPlatform = 0;
	
	level.sort(function(a,b){return a.start-b.start});
	
	platforms = level.slice();
	
	player.dir = 1; player.y = canvas.height - player.h;
	
	bgmusic.currentTime = gstartt;
	
	main();
}

var bgmusic = document.getElementById("bgmusic");

bgmusic.addEventListener('canplay', ready);

function ready(e) {
	e.target.removeEventListener(e.type, arguments.callee);
	
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	console.log("Called ready!");
	canvas.onclick = function () {
		console.log("Canvas.Onclick1");
		reset();
		this.onclick = null;
		bgmusic.play();
	}
}


