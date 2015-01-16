var GHOST_BLINKY_CANVAS_CONTEXT = null;
var GHOST_BLINKY_POSITION_X = 276;
var GHOST_BLINKY_POSITION_Y = 204;
var GHOST_BLINKY_DIRECTION = 1;
var GHOST_BLINKY_COLOR = "#ed1b24";

var GHOST_PINKY_CANVAS_CONTEXT = null;
var GHOST_PINKY_POSITION_X = 276;
var GHOST_PINKY_POSITION_Y = 258;
var GHOST_PINKY_DIRECTION = 2;
var GHOST_PINKY_COLOR = "#feaec9";

var GHOST_INKY_CANVAS_CONTEXT = null;
var GHOST_INKY_POSITION_X = 238;
var GHOST_INKY_POSITION_Y = 258;
var GHOST_INKY_DIRECTION = 3;
var GHOST_INKY_COLOR = "#4adecb";

var GHOST_CLYDE_CANVAS_CONTEXT = null;
var GHOST_CLYDE_POSITION_X = 314;
var GHOST_CLYDE_POSITION_Y = 258;
var GHOST_CLYDE_DIRECTION = 4;
var GHOST_CLYDE_COLOR = "#f99c00";

function initGhosts() { 
	initGhost('blinky');
	initGhost('pinky');
	initGhost('inky');
	initGhost('clyde');
}
function initGhost(ghost) { 
	var canvas = document.getElementById('canvas-ghost-' + ghost);
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		eval('GHOST_' + ghost.toUpperCase() + '_CANVAS_CONTEXT = canvas.getContext("2d")');
	}
}
function getGhostCanevasContext(ghost) { 
	return eval('GHOST_' + ghost.toUpperCase() + '_CANVAS_CONTEXT');
}

function drawGhosts() { 
	drawGhost("blinky");
	drawGhost('pinky');
	drawGhost('inky');
	drawGhost("clyde");
}
function drawGhost(ghost) { 
	var ctx = getGhostCanevasContext(ghost);
	
	eval('ctx.fillStyle = GHOST_' + ghost.toUpperCase() + '_COLOR');
	eval('drawHelperGhost(ctx, GHOST_' + ghost.toUpperCase() + '_POSITION_X, GHOST_' + ghost.toUpperCase() + '_POSITION_Y, GHOST_' + ghost.toUpperCase() + '_DIRECTION)');
	
	ctx.closePath();
}

function drawHelperGhost(ctx, x, y, d) { 
	
	ctx.beginPath();
    ctx.moveTo((x - 15), (y + 16));
    ctx.lineTo((x - 15), (y + 16) - 18);
    ctx.bezierCurveTo((x - 15), (y + 16) - 26, (x - 15) + 6, (y + 16) - 32, (x - 15) + 14, (y + 16) - 32);
    ctx.bezierCurveTo((x - 15) + 22, (y + 16) - 32, (x - 15) + 28, (y + 16) - 26, (x - 15) + 28, (y + 16) - 18);
    ctx.lineTo((x - 15) + 28, (y + 16));
    ctx.lineTo((x - 15) + 23.333, (y + 16) - 5.333);
    ctx.lineTo((x - 15) + 18.666, (y + 16));
    ctx.lineTo((x - 15) + 14, (y + 16) - 5.333);
    ctx.lineTo((x - 15) + 9.333, (y + 16));
    ctx.lineTo((x - 15) + 4.666, (y + 16) - 5.333);
    ctx.lineTo((x - 15), (y + 16));
    ctx.fill();

	var eyesX = 0;
	var eyesY = 0;
	
	if (d === 1) { 
		eyesY = -5;
	} else if (d === 2) { 
		eyesX = +2;
	} else if (d === 3) { 
		eyesY = 0;
		eyesY = +5;
	} else if (d === 4) { 
		eyesX = -3;
	}
	
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo((x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
    ctx.bezierCurveTo((x - 15) + 5 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 4 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 5 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 14 + eyesY);
    ctx.bezierCurveTo((x - 15) + 11 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 12 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 11 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
	
    ctx.moveTo((x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
    ctx.bezierCurveTo((x - 15) + 17 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 16 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 17 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 14 + eyesY);
    ctx.bezierCurveTo((x - 15) + 23 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 24 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 23 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
    ctx.fill();

	if (d === 1) { 
		eyesY = -9;
		eyesX = 2;
	} else if (d === 2) { 
		eyesX = +6;
	} else if (d === 3) { 
		eyesY = +8;
		eyesX = 2;
	} else if (d === 4) { 
		
	}
	
    ctx.fillStyle = "#0000fa";
    ctx.beginPath();
    ctx.arc((x - 15) + 18 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc((x - 15) + 6 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
    ctx.fill();
}