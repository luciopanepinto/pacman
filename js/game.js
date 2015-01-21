var KEYDOWN = false;
var PAUSE = false;
var LOCK = false;

var HIGHSCORE = 0;
var SCORE = 0;
var SCORE_BUBBLE = 10;
var SCORE_SUPER_BUBBLE = 50;
var SCORE_GHOST_COMBO = 200;

var LIFES = 2;

function initGame() { 
	initPaths();
	drawPaths();
	
	initBubbles();
	drawBubbles();
	blinkSuperBubbles();
	
	initPacman();
	drawPacman();
	movePacman();
	
	initGhosts();
	drawGhosts();
	moveGhosts();
	
	lifes();
}

function pauseGame() { 
	PAUSE = true;
	//$("canvas").hide();
	pausePacman();
	pauseGhosts();
	stopBlinkSuperBubbles();
	
}
function resumeGame() { 
	PAUSE = false;
	$("canvas").show();
	$("#canvas-paths").hide();
	resumePacman();
	resumeGhosts();
	blinkSuperBubbles();
}

function lifes(l) { 
	if (l) { 
		LIFES += l;
	}
	
	var canvas = document.getElementById('canvas-lifes');
	canvas.setAttribute('width', '100');
	canvas.setAttribute('height', '30');
	if (canvas.getContext) { 
		var ctx = canvas.getContext('2d');
		
		ctx.clearRect(0, 0, 100, 30);
		ctx.fillStyle = "#fff200";
		for (var i = 0, imax = LIFES; i < imax; i ++) { 
			ctx.beginPath();
			
			var lineToX = 13;
			var lineToY = 15;
			
			ctx.arc(lineToX + (i * 28), lineToY, 13, (1.35 - (3 * 0.05)) * Math.PI, (0.65 + (3 * 0.05)) * Math.PI, false);
			ctx.lineTo(lineToX + (i * 28) + 4, lineToY);
			ctx.fill();
			ctx.closePath();
		}
	}
}

function gameover() { 

}

function score(s, g) { 
	SCORE += s;
	$('#score span').html(SCORE);
	
	if (SCORE > HIGHSCORE) { 
		HIGHSCORE = SCORE;
		$('#highscore span').html(HIGHSCORE);
	}
	if (SCORE >= 10000) { 
		lifes(+1);
	}
	
	if (g) { 
		eraseGhost(g); 
		$("#board").append('<span class="combo">' + SCORE_GHOST_COMBO + '</span>');
		$("#board span.combo").css('top', eval('GHOST_' + g.toUpperCase() + '_POSITION_Y - 10') + 'px');
		$("#board span.combo").css('left', eval('GHOST_' + g.toUpperCase() + '_POSITION_X - 10') + 'px');
		SCORE_GHOST_COMBO = SCORE_GHOST_COMBO * 2;
	}
}