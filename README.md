# MatrixGame README

## Usage:

Open index.html in a web browser, open the JS console in said browser.

### To run Tic Tac Toe:
```js
MATRIX_GAMES.ticTacToe.play();
```
### To run Connect Four:
```js
MATRIX_GAMES.connectFour.play();
```

### To run Mega Tic Tac Toe:
```js
MATRIX_GAMES.megaTicTacToe.play();
```

## Description of Implementation:

MATRIX_GAMES is an IIFE that returns an object containing all game definitions (those
defined in the requirements specification).

Each game is an instantiation of a private function inside MATRIX_GAMES, called
baseBoard.

Here is an example of a valid object passed into baseBoard:

```js
ticTacToe: baseBoard({
	// players is an Array of existing players.
	// this can be extended to any amount, and the game
	// will run in a round-robin style through them.
	// this array cannot contain the boolean value 'false',
	// bad things will happen
	players: ['A', 'B'],

	// size is the size of the board. All boards are square.
	size: 3,

	// connectionLength defines the minimum connection length
	// for success.
	connectionLength: 3,

	// completion is a function that is run after each move that determines
	// whether or not the game is over. Since the majority of games involve
	// a combination of particular success criteria, there are a series of
	// predefined methods for success, though any code can be used
	completion: function () {
		return this.connectionHorizontal() || this.connectionVertical() || this.connectionDiagonalRight() || this.connectionDiagonalLeft();
	},

	// a function that determines where a piece should
	// be played based off an attempted move. while a trivial
	// function for ticTacToe, this allows a user to modify
	// a move if necessary (e.g. Connect Four)
	placement: function (board, x, y) {
		board[x][y] = this.player();

		return { x: x, y: y };
	}
})
```

Any round-robin style of connection-length-based games can be created
trivially with this syntax.

## Local Setup

### Clone the repo
Use the Github app/Sourcetree, or from command line:

```
git clone https://github.com/raynjamin/MatrixGame.git
```

## Install dependencies
From command line, install npm dependencies:

```
npm install
```

## Run it
From command line, type:

```
grunt
```
This will watch your HTML, SCSS, and JS files for changes/creations/deletions and update the page in the browser automatically.
