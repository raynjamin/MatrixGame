Array.matrix = function (m, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < m; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

var baseBoard = function (spec) {
	var initGame = function () {
		board = Array.matrix(spec.size, false);
		lastMove = null;
		playerIndex = 0;
	};

	var players = ['A', 'B'];
	var playerIndex, board, lastMove = null;

	initGame();

	var getCurrentPlayer = function () {
		return players[playerIndex];
	};

	var makeMove = function (move) {
		lastMove = spec.placement(board, move.x, move.y);
	};

	var generateRandomMove = function () {
		var x = 0, y = 0;

		do {
			x = Math.floor(Math.random()*spec.size),
			y = Math.floor(Math.random()*spec.size);

		} while (board[x][y] !== false);
		
		return { x: x, y: y };
	};

	var iterateOverBoard = function (fn) {
		for(var i = 0;i < spec.size;i++) {
			for(var j = 0; j < spec.size;j++) {
				if (fn(board[j][i], j, i) === false) {
					break;
				}
			}
		}
	}

	var outputStatus = function () {
		var outputStr = "";

		iterateOverBoard(function (val, x, y) {
			outputStr += val === false ? "-" : val;

			if (x === spec.size-1) {
				console.log(outputStr);
				outputStr = "";
			}
		});

		console.log("MOVE OVER");
		var winner = this.gameOver();

		if (winner === true) {
			return console.log("GAME OVER NO WINNER");
		} else if (winner !== false) {
			return console.log("GAME OVER PLAYER " + winner + " WINS");
		}
	};

	var advancePlayer = function () {
		playerIndex = (playerIndex + 1) % players.length;
		return getCurrentPlayer();
	};

	var numberInLine = function (origin, direction) {
		var count = 0;
		var comparer = board[origin.x][origin.y];
		var current = { 
			x: origin.x + direction.x, 
			y: origin.y + direction.y 
		};

		while (
			board[current.x] !== undefined && 
			board[current.x][current.y] === comparer) {
				current.x += direction.x;
				current.y += direction.y;
				count++;
		}

		return count;
	};

	var contiguousElements = function (direction) {
		if (lastMove != null) {
			var lastPlayer = board[lastMove.x][lastMove.y];
			var origin = { x: lastMove.x, y: lastMove.y };

			return 1 
				+ numberInLine(origin, direction)
				+ numberInLine(origin, { x: -1*direction.x, y: -1*direction.y });
		} else { 
			return 0;
		}
	};

	return {
		makeMove: function (move) {
			lastMove = spec.placement.call(this, board, move.x, move.y);
		},

		player: function () {
			return getCurrentPlayer();
		},
		
		connectionVertical: function () {
			return contiguousElements({ x: 0, y: 1 }) >= spec.connectionlength;
		},

		connectionDiagonalRight: function () {
			return contiguousElements({ x: 1, y: 1 }) >= spec.connectionlength;
		},

		connectionDiagonalLeft: function () {
			return contiguousElements({ x: -1, y: 1 }) >= spec.connectionlength;
		},

		gameOver: function () {
			var fullBoard = true;

			iterateOverBoard(function (val, x, y) {
				if (val === false) {
					return fullBoard = false;
				}
			});
			
			if (spec.completion.apply(this) === true) {
				return getCurrentPlayer();
			} 

			return fullBoard;
		},

		play: function (){
			while (this.gameOver() === false) {
				this.makeMove(generateRandomMove());
				outputStatus.apply(this);
				advancePlayer();
			}

			initGame();
		}
	};
};

var ticTacToe = baseBoard({
	size: 3,
	connectionLength: 3,
	completion: function () {
		return this.connectionVertical() || this.connectionDiagonalRight() || this.connectionDiagonalLeft();
	},

	placement: function (board, x, y) {
		board[x][y] = this.player();

		return {x: x, y: y};
	}
});