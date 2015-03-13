var MATRIX_GAMES = (function () {
	/* baseBoard -- Game generator. Builds games and executes gameplay. */
	var baseBoard = function (spec) {
		var playerIndex, board, lastMove = null;

		initGame();

		// private baseBoard methods
		function initGame() {
			board = matrix(spec.size, false);
			lastMove = null;
			playerIndex = 0;
		}

		function getCurrentPlayer() {
			return spec.players[playerIndex];
		}

		function makeMove(move) {
			lastMove = spec.placement(board, move.x, move.y);
		}

		function generateRandomMove() {
			var x = 0, y = 0;

			do {
				x = Math.floor(Math.random()*spec.size),
				y = Math.floor(Math.random()*spec.size);
			} while (board[x][y] !== false);

			return { x: x, y: y };
		}

		function iterateOverBoard(fn) {
			for(var i = 0;i < spec.size;i++) {
				for(var j = 0; j < spec.size;j++) {
					if (fn(board[j][i], j, i) === false) {
						break;
					}
				}
			}
		}

		function advancePlayer() {
			playerIndex = (playerIndex + 1) % spec.players.length;
			return getCurrentPlayer();
		}

		function numberInLine(origin, direction) {
			var count = 0;
			var comparer = board[origin.x][origin.y];

			// direction.x and direction.y are either:
			// -1, 0, or 1.
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
		}

		function contiguousElements(direction) {
			if (lastMove === null) {
				return 0;
			}

			var lastPlayer = board[lastMove.x][lastMove.y];
			var origin = { x: lastMove.x, y: lastMove.y };

			return 1 + numberInLine(origin, direction) + numberInLine(origin, { x: -1*direction.x, y: -1*direction.y });
		}

		// protected baseBoard methods
		return {
			outputStatus: function () {
				console.log("******************");

				var outputStr = "";

				iterateOverBoard(function (val, x, y) {
					outputStr += val === false ? "-" : val;

					if (x === spec.size-1) {
						console.log(outputStr);
						outputStr = "";
					}
				});

				console.log("\n");

				var winner = this.isGameOver();

				console.log("GAMEOVER? " +
					(winner ?
						winner === true ? "True" : "True (winner is: " + winner + ")" :
						"False"
					)
				);
			},

			isGameOver: function() {
				if (spec.completion.apply(this) === true) {
					return getCurrentPlayer();
				}

				var fullBoard = true;

				iterateOverBoard(function (val, x, y) {
					if (val === false) {
						return fullBoard = false;
					}
				});

				return fullBoard;
			},

			makeMove: function (move) {
				lastMove = spec.placement.call(this, board, move.x, move.y);
			},

			player: function () {
				return getCurrentPlayer();
			},

			connectionVertical: function () {
				return contiguousElements({ x: 0, y: 1 }) >= spec.connectionLength;
			},

			connectionHorizontal: function () {
				return contiguousElements({ x: 1, y: 0 }) >= spec.connectionLength;
			},

			connectionDiagonalRight: function () {
				return contiguousElements({ x: 1, y: -1 }) >= spec.connectionLength;
			},

			connectionDiagonalLeft: function () {
				return contiguousElements({ x: -1, y: -1 }) >= spec.connectionLength;
			},

			play: function () {
				while (this.isGameOver() === false) {
					this.makeMove(generateRandomMove());
					this.outputStatus();
					advancePlayer();
				}

				initGame();
			}
		};
	};

	var defaults = {
		players: ['A', 'B'],
		completion: function () {
			return this.connectionHorizontal() || this.connectionVertical() || this.connectionDiagonalRight() || this.connectionDiagonalLeft();
		},

		placement: function (board, x, y) {
			board[x][y] = this.player();

			return { x: x, y: y };
		}
	};

	return {
		ticTacToe: baseBoard(extend(defaults, {
			size: 3,
			connectionLength: 3
		})),

		connectFour: baseBoard(extend(defaults, {
			size: 6,
			connectionLength: 4,

			placement: function (board, x, y) {
				// in connect four, the play drops
				// all the way down.
				while (board[x][y+1] === false) {
					y++;
				}

				board[x][y] = this.player();

				return { x: x, y: y };
			}
		})),

		megaTicTacToe: baseBoard(extend(defaults, {
			size: 8,
			connectionLength: 3,
			completion: function () {
				return this.connectionHorizontal() || this.connectionVertical();
			}
		}))
	}
}());
