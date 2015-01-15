var PACMAN_DIRECTION = 1;
var PACMAN_DIRECTION_TRY = -1;
var PACMAN_DIRECTION_TRY_TIMER = -1;
var PACMAN_DIRECTION_TRY_CANCEL = 1000;
var PACMAN_POSITION_X = 276;
var PACMAN_POSITION_Y = 416;
var PACMAN_POSITION_STEP = 2;
var PACMAN_MOUNTH_STATE = 3;
var PACMAN_MOUNTH_STATE_MAX = 6;
var PACMAN_SIZE = 16;
var PACMAN_MOVING = false;
var PACMAN_MOVING_TIMER = -1;
var PACMAN_MOVING_SPEED = 25;
var PACMAN_CANVAS_CONTEXT = null;
var PACMAN_EAT_GAP = 10;

function initPacman() { 
	var canvas = document.getElementById('canvas-pacman');
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		PACMAN_CANVAS_CONTEXT = canvas.getContext('2d');
	}
}
function getPacmanCanevasContext() { 
	return PACMAN_CANVAS_CONTEXT;
}

function stopPacman() { 
	if (PACMAN_MOVING_TIMER != -1) { 
		console.log("MOVE PACMAN > STOP : " + PACMAN_MOVING_TIMER);
		clearInterval(PACMAN_MOVING_TIMER);
		PACMAN_MOVING_TIMER = -1;
		PACMAN_MOVING = false;
	}
}

function tryMovePacmanCancel() { 
	if (PACMAN_DIRECTION_TRY_TIMER != -1) { 
		console.log("TRY MOVE PACMAN > CANCEL : " + PACMAN_DIRECTION_TRY_TIMER);
		clearTimeout(PACMAN_DIRECTION_TRY_TIMER);
		PACMAN_DIRECTION_TRY = -1;
		PACMAN_DIRECTION_TRY_TIMER = -1;
	}
}
function tryMovePacman(direction) { 
	PACMAN_DIRECTION_TRY = direction;
	PACMAN_DIRECTION_TRY_TIMER = setTimeout('tryMovePacmanCancel()', PACMAN_DIRECTION_TRY_CANCEL);
	console.log("TRY MOVE PACMAN > NEW : " + PACMAN_DIRECTION_TRY_TIMER);
}

function movePacman(direction) {

	if (PACMAN_MOVING === false) { 
		PACMAN_MOVING = true;
		PACMAN_MOVING_TIMER = setInterval('movePacman()', PACMAN_MOVING_SPEED);
		console.log("MOVE PACMAN > NEW : " + PACMAN_MOVING_TIMER);
	}
	
	var directionTry = direction;
	
	if (!directionTry && PACMAN_DIRECTION_TRY != -1) { 
		directionTry = PACMAN_DIRECTION_TRY;
	}
	
	if ((!directionTry || PACMAN_DIRECTION !== directionTry)) { 
	
		if (directionTry) { 
			if (canMovePacman(directionTry)) { 
				PACMAN_DIRECTION = directionTry;
				tryMovePacmanCancel();
			} else { 
				if (directionTry !== PACMAN_DIRECTION_TRY) { 
					tryMovePacmanCancel();
				}
				if (PACMAN_DIRECTION_TRY === -1) { 
					tryMovePacman(directionTry);
				}
			}
		}

		if (canMovePacman(PACMAN_DIRECTION)) { 
			erasePacman();
			
			if (PACMAN_MOUNTH_STATE < PACMAN_MOUNTH_STATE_MAX) { 
				PACMAN_MOUNTH_STATE ++; 
			} else { 
				PACMAN_MOUNTH_STATE = 0; 
			}
						
			if ( PACMAN_DIRECTION === 1 ) { 
				PACMAN_POSITION_X += PACMAN_POSITION_STEP;
			} else if ( PACMAN_DIRECTION === 2 ) { 
				PACMAN_POSITION_Y += PACMAN_POSITION_STEP;
			} else if ( PACMAN_DIRECTION === 3 ) { 
				PACMAN_POSITION_X -= PACMAN_POSITION_STEP;
			} else if ( PACMAN_DIRECTION === 4 ) { 
				PACMAN_POSITION_Y -= PACMAN_POSITION_STEP;
			}
			
			if ( PACMAN_POSITION_X === 2 && PACMAN_POSITION_Y === 258 ) { 
				PACMAN_POSITION_X = 548;
				PACMAN_POSITION_Y = 258;
			} else if ( PACMAN_POSITION_X === 548 && PACMAN_POSITION_Y === 258 ) { 
				PACMAN_POSITION_X = 2;
				PACMAN_POSITION_Y = 258;
			}
			
			drawPacman();
			
			testBubblesPacman();
		} else { 
			stopPacman();
		}
	} else if (direction && PACMAN_DIRECTION === direction) { 
		tryMovePacmanCancel();
	}
}

function canMovePacman(direction) { 
	
	var positionX = PACMAN_POSITION_X;
	var positionY = PACMAN_POSITION_Y;
	
	if ( direction === 1 ) { 
		positionX += PACMAN_POSITION_STEP;
	} else if ( direction === 2 ) { 
		positionY += PACMAN_POSITION_STEP;
	} else if ( direction === 3 ) { 
		positionX -= PACMAN_POSITION_STEP;
	} else if ( direction === 4 ) { 
		positionY -= PACMAN_POSITION_STEP;
	}
	
	for (var i = 0, imax = PATHS.length; i < imax; i ++) { 
	
		var p = PATHS[i];
	
		var startX = p.split("-")[0].split(",")[0];
		var startY = p.split("-")[0].split(",")[1];
		var endX = p.split("-")[1].split(",")[0];
		var endY = p.split("-")[1].split(",")[1];

		if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) { 
			return true;
		}
	}
	
	return false;
}

function drawPacman() { 

	var ctx = getPacmanCanevasContext();
	
	ctx.fillStyle = "#fff200";
	ctx.beginPath();
	
	var startAngle = 0;
	var endAngle = 2 * Math.PI;
	var lineToX = PACMAN_POSITION_X;
	var lineToY = PACMAN_POSITION_Y;
	if (PACMAN_DIRECTION === 1) { 
		startAngle = (0.35 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (1.65 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToX -= 8;
	} else if (PACMAN_DIRECTION === 2) { 
		startAngle = (0.85 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (0.15 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToY -= 8;
	} else if (PACMAN_DIRECTION === 3) { 
		startAngle = (1.35 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (0.65 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToX += 8;
	} else if (PACMAN_DIRECTION === 4) { 
		startAngle = (1.85 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (1.15 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToY += 8;
	}
	ctx.arc(PACMAN_POSITION_X, PACMAN_POSITION_Y, PACMAN_SIZE, startAngle, endAngle, false);
	ctx.lineTo(lineToX, lineToY);
	ctx.fill();
	ctx.closePath();
}

function erasePacman() { 

	var ctx = getPacmanCanevasContext();
	
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";

	ctx.beginPath();
	ctx.arc(PACMAN_POSITION_X, PACMAN_POSITION_Y, PACMAN_SIZE + 1, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();
	
	ctx.restore();
}

function testBubblesPacman() { 
	//console.log("TEST BUBBLES PACMAN...");
	for (var i = 0, imax = BUBBLES.length; i < imax; i ++) { 
		var b = BUBBLES[i];
		
		var line = b.split(";")[0];
		var bubble = b.split(";")[1];
		var positionX = parseInt(b.split(";")[2].split(",")[0]);
		var positionY = parseInt(b.split(";")[2].split(",")[1]);
		var eat = b.split(";")[3];
		
		//console.log("PACMAN EAT BUBBLE > TEST : " + positionX + "," + positionY + " / " + PACMAN_POSITION_X + "," + PACMAN_POSITION_Y);
		
		if (eat === "1") { 
			if (positionX <= PACMAN_POSITION_X + PACMAN_EAT_GAP && positionX >= PACMAN_POSITION_X - PACMAN_EAT_GAP && positionY <= PACMAN_POSITION_Y + PACMAN_EAT_GAP && positionY >= PACMAN_POSITION_Y - PACMAN_EAT_GAP ) { 
				eraseBubble(positionX, positionY);
				//console.log("PACMAN EAT BUBBLE : " + line + ";" + bubble);
			}
		}
	}
}