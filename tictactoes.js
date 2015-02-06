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
	var players = ['A', 'B'];
	var playerIndex = 0;
	var board = Array.matrix(spec.size, false);
	var lastMove = null;

	var getCurrentPlayer = function () {
		return players[playerIndex];
	};

	var makeMove = function (move) {
		lastMove = spec.placement(board, move.x, move.y);
	};

	var generateRandomMove = function () {
		var x = Math.floor(Math.random()*spec.size),
			y = Math.floor(Math.random()*spec.size);

		return { x: x, y: y };
	};

	var iterateOverBoard = function (fn) {
		for(var i = 0;i < spec.size;i++) {
			for(var j = 0; j < spec.size;j++) {
				fn(board[i][j], x, y);
			}
		}
	}

	var outputStatus = function () {
		return iterateOverBoard(function (val, x, y) {
			if (x === spec.size-1) {
				
			}
		});
	};

	var advancePlayer = function () {
		playerIndex = (playerIndex + 1) % players.length;
		return this.player();
	};

	var numberInLine = function (origin, direction) {
		var count = 0;
		var comparer = board[origin.x][origin.y];
		var current = { x: origin.x + direction.x, origin.y + direction.y };

		while (board[current.x][current.y] === comparer) {
			count++;
		}

		return count;
	};

	var contiguousElements = function (direction) {
		var lastPlayer = board[lastMove.x][lastMove.y];
		var origin = { x: lastMove.x, y: lastMove.y };

		return 1 + numberInLine(origin, direction) + numberInLine(origin, { x: -1*direction.x, y: -1*direction.y });
	};

	return {
		player: function () {
			getCurrentPlayer();
		},
		
		connectionVertical: function () {
			return contiguousElements({ x: 0, y: 1 }) >= spec.connectionlength;
		},

		gameOver: function () {
			return spec.completion.apply(this) || ;
		},

		play: function (){
			while (!this.gameOver()) {
				makeMove(generateRandomMove());
				outputStatus.apply(this);
				this.advancePlayer();
			}
		}
	};
};

var ticTacToe = baseBoard({
	size: 3,
	connectionLength: 3,
	completion: function () {
		// return this.connectionVertical() || this.connectionDiagonalRight() || this.connectionDiagonalLeft();
		return this.connectionVertical();
	},

	placement: function (board, x, y) {
		board[x][y] = this.player();

		return {x: x, y: y};
	}
});