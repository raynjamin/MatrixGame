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

		return { x: x, y: y};
	};

	var outputStatus = function () {
		for(var i = 0;i < spec.size;i++) {
			var rowStr = "";
			for(var j = 0; j < spec.size;j++) {
				if (!board[i][j]) {
					rowStr += "-";
				} else {
					rowStr += board[i][j];
				}
			}
			console.log(rowStr);
		}
	};

	var advancePlayer = function () {
		playerIndex = (playerIndex + 1) % players.length;
		return this.player();
	};

	var inBoard
	var contiguousElements = function (direction) {
		var lastPlayer = board[lastMove.x][lastMove.y];
		var origin = { x: lastMove.x, y: lastMove.y };
	};

	return {
		player: function () {
			getCurrentPlayer();
		},
		
		connectionVertical: function () {
			return contiguousElements({ x: 0, y: 1 }) >= spec.connectionlength;
		},

		gameOver: function () {
			return spec.completion.apply(this);
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