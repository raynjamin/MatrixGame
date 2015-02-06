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

	var getCurrentPlayer = function () {
		return players[playerIndex];
	};

	var makeMove = function (move) {
		spec.placement(move.x, move.y);
	};

	var generateRandomMove = function () {
		var x = Math.floor(Math.random()*spec.size),
			y = Math.floor(Math.random()*spec.size);

		return { x: x, y: y};
	};

	var outputStatus = function () {
		for(var i = 0;i < spec.size;i++) {
			for(var j = 0; j < spec.size;j++) {

			}
		}
	};

	return {
		board: Array.matrix(spec.size, false),

		over: false,

		player: function () {
			getCurrentPlayer();
		},

		advancePlayer: function () {
			playerIndex = (playerIndex + 1) % players.length;
			return this.player();
		},
		
		connectionVertical: function () {
			return spec.size === 3;
		},

		gameOver: function () {
			return spec.completion.apply(this);
		},

		play: function (){
			while (!this.gameOver()) {
				makeMove(generateRandomMove());
				outputStatus(this.board);
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

	placement: function (x, y) {
		this.board[x][y] = this.player();
	}
});