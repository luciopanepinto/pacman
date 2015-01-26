var FRUITS_CANVAS_CONTEXT = null;
var LEVEL_FRUITS_CANVAS_CONTEXT = null;
var FRUITS_SIZE = 30;

var FRUITS_POSITION_X = 276;
var FRUITS_POSITION_Y = 310;

var FRUIT_MINIMUM_START = 15;
var FRUIT_CANCEL_TIMER = null;
var FRUIT_CANCEL_SPEED = 7500;
var FRUIT = null;


function initFruits() { 
	var canvas = document.getElementById('canvas-fruits');
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		FRUITS_CANVAS_CONTEXT = canvas.getContext('2d');
	}
	
	var levelCanvas = document.getElementById('canvas-level-fruits');
	levelCanvas.setAttribute('width', '300');
	levelCanvas.setAttribute('height', '30');
	if (levelCanvas.getContext) { 
		LEVEL_FRUITS_CANVAS_CONTEXT = levelCanvas.getContext('2d');
	}
	
	var ctx = getLevelFruitsCanevasContext();
	ctx.clearRect(0, 0, 300, 30);
	
	var x = 280;
	var y = 14;
	var i = 0;
	
	drawFruit(ctx, "cherry", x - ( i * 37), y, 27);
	i ++;
	
	if (LEVEL > 1) { 
		drawFruit(ctx, "strawberry", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 2) { 
		drawFruit(ctx, "orange", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 3) { 
		drawFruit(ctx, "orange", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 4) { 
		drawFruit(ctx, "apple", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 5) { 
		drawFruit(ctx, "apple", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 4) { 
		drawFruit(ctx, "melon", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 5) { 
		drawFruit(ctx, "melon", x - ( i * 37), y, 27);
		i ++;
	}
	
}

function getFruitsCanevasContext() { 
	return FRUITS_CANVAS_CONTEXT;
}
function getLevelFruitsCanevasContext() { 
	return LEVEL_FRUITS_CANVAS_CONTEXT;
}

function eatFruit() { 
	var s = 0;
	if (FRUIT === "cherry")  s = 100;
	else if (FRUIT === "strawberry")  s = 300;
	else if (FRUIT === "orange")  s = 500;
	else if (FRUIT === "apple")  s = 700;
	else if (FRUIT === "melon")  s = 1000;
	
	score(s, "fruit");
	cancelFruit();
}

function fruit() { 
	
	if (TIME_FRUITS === 1 && $("#board .fruits").length > 0) { 
		$("#board .fruits").remove();
	}
	if (TIME_FRUITS > FRUIT_MINIMUM_START) { 
		if (anyGoodIdea() > 3) { 
			oneFruit();
		}
	}
}
function oneFruit() { 
	if ( FRUIT_CANCEL_TIMER === null ) { 
		var ctx = getFruitsCanevasContext();
		
		if (LEVEL === 1) FRUIT = "cherry";
		else if (LEVEL === 2) FRUIT = "strawberry";
		else if (LEVEL === 3 || LEVEL === 4) FRUIT = "orange";
		else if (LEVEL === 5 || LEVEL === 6) FRUIT = "apple";
		else if (LEVEL === 7 || LEVEL === 8) FRUIT = "melon";
		
		drawFruit(ctx, FRUIT, FRUITS_POSITION_X, FRUITS_POSITION_Y, FRUITS_SIZE);
		FRUIT_CANCEL_TIMER = new Timer("cancelFruit()", FRUIT_CANCEL_SPEED);
	}
}
function cancelFruit() { 
	eraseFruit();
	FRUIT_CANCEL_TIMER.cancel();
	FRUIT_CANCEL_TIMER = null;
	TIME_FRUITS = 0;
}

function eraseFruit() { 

	var ctx = getFruitsCanevasContext();
	//ctx.translate(FRUITS_POSITION_X - (FRUITS_SIZE / 2), FRUITS_POSITION_Y - (FRUITS_SIZE / 2));
	//ctx.save();
	//ctx.globalCompositeOperation = "destination-out";
	
	//ctx.beginPath();
	//ctx.translate(FRUITS_POSITION_X - (FRUITS_SIZE / 2), FRUITS_POSITION_Y - (FRUITS_SIZE / 2));
	ctx.clearRect(FRUITS_POSITION_X - (FRUITS_SIZE), FRUITS_POSITION_Y - (FRUITS_SIZE), FRUITS_SIZE * 2, FRUITS_SIZE * 2);
	//ctx.fill();
	//ctx.closePath();
	
	//ctx.restore();
}

function drawFruit(ctx, f, x, y, size) {  
	ctx.save();

	if ( f === "cherry" ) drawCherry(ctx, x, y, size);
	else if ( f === "strawberry" ) drawStrawberry(ctx, x, y, size);
	else if ( f === "orange" ) drawOrange(ctx, x, y, size);
	else if ( f === "apple" ) drawApple(ctx, x, y, size);
	else if ( f === "melon" ) drawMelon(ctx, x, y, size);
	
	ctx.restore();
}

function drawMelon(ctx, x, y, size) { 

	ctx.translate(x - (size / 2), y - (size / 2));
	
	ctx.fillStyle = "#198122"
	ctx.beginPath();
	ctx.moveTo(size / 2, size / 6)
	ctx.arc(size / 2, size / 6, size / 1.15, 1.1, 2.5, false)
	ctx.fill()
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#ACFB77"
	ctx.moveTo(size / 2, size / 6)
	ctx.arc(size / 2, size / 6, size / 1.3, 1.1, 2.5, false)
	ctx.fill()
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#F92F2F"
	ctx.moveTo(size / 2, size / 6)
	ctx.arc(size / 2, size / 6, size / 1.7, 1.1, 2.5, false)
	ctx.fill()
	ctx.closePath();

	var mod = size / 23;
	ctx.beginPath();
	ctx.fillStyle = "black"
	ctx.moveTo(12 * mod, 9 * mod)
	ctx.arc(12 * mod, 9 * mod, size / 12, 1.1, 2.5, false)
	ctx.moveTo(13 * mod, 12 * mod)
	ctx.arc(13 * mod, 12 * mod, size / 12, 1.1, 2.5, false)
	ctx.moveTo(10.5 * mod, 12 * mod)
	ctx.arc(10.5 * mod, 12 * mod, size / 12, 1.1, 2.5, false)
	ctx.fill()
	ctx.closePath();
}
function drawApple(ctx, x, y, size) { 

	ctx.translate(x - (size / 2), y - (size / 2) - 1);
	
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(size / 2, size / 2 + size / 9, (size / 2.1), Math.PI * 2, -Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();

	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(size / 2, size / 6, (size / 7), Math.PI * 2, -Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();

	var mod = size / 23;
	ctx.strokeStyle = "green";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(size / 2, size / 3);
	ctx.lineTo(size / 2, size / 8);
	ctx.lineTo(13 * mod, size / 9);
	ctx.stroke();
	ctx.closePath();
}

function drawOrange(ctx, x, y, size) { 

	ctx.translate(x - (size / 2), y - (size / 2) - 1);

	ctx.fillStyle = "#f4ba6d";
	ctx.beginPath();
	ctx.arc(size / 2, size / 2 + size / 9, (size / 2.1), Math.PI * 2, -Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();

	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(size / 2, size / 6, (size / 7), Math.PI * 2, -Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();

	var mod = size / 23;
	ctx.strokeStyle = "green";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(size / 2, size / 3);
	ctx.lineTo(size / 2, size / 8);
	ctx.lineTo(9 * mod, size / 9);
	ctx.stroke();
	ctx.closePath();
}

function drawStrawberry(ctx, x, y, size) { 
	
	ctx.translate(x - (size / 2), y - (size / 2) + 2);
	
	ctx.beginPath();
	ctx.fillStyle = "red";

	ctx.moveTo(size / 2, size - size / 18)
	ctx.bezierCurveTo(0, size / 1.3, 0, -size / 9, size / 2, size / 6)
	ctx.moveTo(size / 2, size - size / 18)
	ctx.bezierCurveTo(size, size / 1.3, size, -size / 9, size / 2, size / 6)
	
	ctx.fill();
	ctx.closePath();

	ctx.fillStyle = "white";

	ctx.fillRect(size / 4, size / 3, size / 18, size / 16)
	ctx.fillRect(size / 2, size / 4, size / 18, size / 16)
	ctx.fillRect(size - size / 3.5, size / 2.4, size / 18, size / 16)
	ctx.fillRect(size - size / 2.2, size / 2, size / 18, size / 16)
	ctx.fillRect(size / 2.6, size / 1.3, size / 18, size / 16)
	ctx.fillRect(size / 3, size / 1.8, size / 18, size / 16)
	ctx.fillRect(size / 1.6, size / 1.4, size / 18, size / 16)

	ctx.beginPath();
	ctx.fillStyle = "#24DA1D";

	var mod = size / 23;
	ctx.moveTo(6 * mod, 2 * mod);
	ctx.lineTo(1 * mod, 8 * mod);
	ctx.lineTo(6 * mod, 6 * mod);
	ctx.lineTo(11 * mod, 11 * mod);
	ctx.lineTo(16 * mod, 6 * mod);
	ctx.lineTo(21 * mod, 8 * mod);
	ctx.lineTo(17 * mod, 2 * mod);

	ctx.moveTo(size / 2, 2 * mod);
	ctx.lineTo(8 * mod, 0 * mod);
	ctx.lineTo(15 * mod, 0 * mod);
	ctx.lineTo(size / 2, 2 * mod);
	
	ctx.fill();
	ctx.closePath();
}
function drawCherry(ctx, x, y, size) {  
	
	ctx.translate(x - (size / 2), y - (size / 2) + 1);
	
	ctx.beginPath();
	ctx.fillStyle = "red";

	ctx.arc(size / 8, size - (size / 2.8), size / 4, Math.PI * 2, -Math.PI * 2, false);
	ctx.arc(size - size / 3, size - (size / 4), size / 4, Math.PI * 2, -Math.PI * 2, false);

	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#670303";

	ctx.arc(size / 7.2, size - (size / 2.25), size / 14, Math.PI * 2, -Math.PI * 2, false);
	ctx.arc(size - size / 3, size - (size / 3), size / 14, Math.PI * 2, -Math.PI * 2, false);

	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.strokeStyle = "#959817";
	ctx.lineWidth = 2;

	ctx.moveTo(size / 8, size - (size / 2));
	ctx.bezierCurveTo(size / 6, size / 1.5, size / 7, size / 4, size - size / 4, size / 8);
	ctx.moveTo(size - size / 2.5, size - size / 3);
	ctx.bezierCurveTo(size / 1.3, size / 1.5, size / 3, size / 2.5, size - size / 4, size / 8);

	ctx.stroke();
	ctx.closePath();

	ctx.fillStyle = "#959817";
	ctx.fillRect(size - size / 3, size / 12, size / 9, size / 9);
	ctx.closePath();
}