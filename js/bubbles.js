var BUBBLES = [];
var BUBBLES_CANVAS_CONTEXT = null;
var BUBBLES_X_START = 30;
var BUBBLES_X_END = 518;
var BUBBLES_GAP = ((BUBBLES_X_END - BUBBLES_X_START) / 25);
var BUBBLES_Y_START = 26;
var BUBBLES_Y_END = 522;
var BUBBLES_SIZE = 3;

function initBubbles() { 
	var canvas = document.getElementById('canvas-bubbles');
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		BUBBLES_CANVAS_CONTEXT = canvas.getContext('2d');
	}
}

function getBubblesCanevasContext() { 
	return BUBBLES_CANVAS_CONTEXT;
}

function drawBubbles() { 
	var ctx = getBubblesCanevasContext();
	ctx.fillStyle = "#dca5be";
	
	for (var line = 1, linemax = 29, i = 0; line <= linemax; line ++) { 
		var y = getYFromLine(line);
		for (var x = BUBBLES_X_START, xmax = BUBBLES_X_END, bubble = 1 ; x < xmax; bubble ++, x += BUBBLES_GAP) { 
			if (canAddBubble(line, bubble)) { 
				ctx.beginPath();
				ctx.arc(x, y, BUBBLES_SIZE, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.closePath();
				
				BUBBLES[i] = line + ";" + bubble + ";" + (x) + "," + (y) + ";1";
				i ++;
				console.log(BUBBLES[i]);
			}
		}
	}
}

function eraseBubble(x, y) { 

	var ctx = getBubblesCanevasContext();
	
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";

	ctx.beginPath();
	ctx.arc(x, y, BUBBLES_SIZE + 1, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();
	
	ctx.restore();
}


function canAddBubble(line, bubble) { 
	
	if ( ( ( line >= 1 && line <= 4) || (line >= 9 && line <= 10) || (line >= 20 && line <= 22) || (line >= 26 && line <= 28) ) && (bubble === 13 || bubble === 14)) {
		return false;
	} else if ( ( (line >= 2 && line <= 4) || (line >= 21 && line <= 22) ) && ( (bubble >= 2 && bubble <= 5) || (bubble >= 7 && bubble <= 11) || (bubble >= 16 && bubble <= 20) || (bubble >= 22 && bubble <= 25) ) ) { 
		return false;
	} else if ( ( line >= 6 && line <= 7 ) && ( (bubble >= 2 && bubble <= 5) || (bubble >= 7 && bubble <= 8) || (bubble >= 10 && bubble <= 17) ||  (bubble >= 19 && bubble <= 20) || (bubble >= 22 && bubble <= 25) ) ) { 
		return false;
	} else if ( ( line === 8 ) && ( (bubble >= 7 && bubble <= 8) || (bubble >= 13 && bubble <= 14) || (bubble >= 19 && bubble <= 20) ) ) { 
		return false;
	} else if ( (( line >= 9 &&  line <= 19) ) && ( (bubble >= 1 && bubble <= 5) || (bubble >= 22 && bubble <= 26) ) ) { 
		return false;
	} else if ( ( line === 11 || line === 17 ) && ( (bubble >= 7 && bubble <= 20) ) ) { 
		return false;
	} else if ( ( line === 9 || line === 10 ) && ( (bubble === 12 || bubble === 15) ) ) { 
		return false;
	} else if ( ( (line >= 12 && line <= 13) || (line >= 15 && line <= 16) ) && ( (bubble === 9 || bubble === 18) ) ) { 
		return false;
	} else if ( line === 14 && ( (bubble >= 7 && bubble <= 9) || (bubble >= 18 && bubble <= 20) ) ) { 
		return false;
	} else if ( (line === 18 || line === 19) && ( bubble === 9 || bubble === 18) ) { 
		return false;
	} else if ( ( line >= 9 && line <= 10 ) && ( (bubble >= 7 && bubble <= 11) || (bubble >= 16 && bubble <= 20) ) ) { 
		return false;
	} else if ( (( line >= 11 && line <= 13) || (line >= 15 && line <= 19) ) && ( (bubble >= 7 && bubble <= 8) || (bubble >= 19 && bubble <= 20) ) ) { 
		return false;
	} else if ( ( (line >= 12 && line <= 16) || (line >= 18 && line <= 19) ) && ( bubble >= 10 && bubble <= 17) ) { 
		return false;
	} else if ( (line === 23) && ( (bubble >= 4 && bubble <= 5) || (bubble >= 22 && bubble <= 23) ) ) { 
		return false;
	} else if ( (line >= 24 && line <= 25) && ( (bubble >= 1 && bubble <= 2) || (bubble >= 4 && bubble <= 5) || (bubble >= 7 && bubble <= 8) || (bubble >= 10 && bubble <= 17) || (bubble >= 19 && bubble <= 20) || (bubble >= 22 && bubble <= 23) || (bubble >= 25 && bubble <= 26) ) ) { 
		return false;
	} else if ( (line === 26) && ( (bubble >= 7 && bubble <= 8) || (bubble >= 19 && bubble <= 20) ) ) { 
		return false;
	} else if ( (line >= 27 && line <= 28) && ( (bubble >= 2 && bubble <= 11) || (bubble >= 16 && bubble <= 25) ) ) { 
		return false;
	}
	
	
	return true;
}

function getYFromLine(line) { 
	var y = BUBBLES_Y_START;
	if (line < 8) { 
		y = BUBBLES_Y_START + ( (line - 1) * 18 );
	} else if (line > 7 && line < 15) { 
		y = 150 + ( (line - 8) * 18 );
	} else if (line > 14 && line < 21) { 
		y = 256 + ( (line - 14) * 18 );
	} else if (line > 20 && line < 26) { 
		y = 362 + ( (line - 20) * 18 );
	} else if (line > 25 && line < 29) { 
		y = 451 + ( (line - 25) * 18 );
	} else if (line === 29) { 
		y = BUBBLES_Y_END;
	}


	
	return y;
}