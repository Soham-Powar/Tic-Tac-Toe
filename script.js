
const gameBoard = (function () {

	let _board = Array(9).fill(null);

	const getBoard = () => _board;

	const resetBoard = () => {
		_board.fill(null);
		// return _board;
	}

	const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
	];

	function checkWin() {
		for (const [a, b, c] of winPositions) {
			if (_board[a] && _board[a] === _board[b] && _board[b] === _board[c]) {
				return _board[a];
			}
		}
		return null;
	}

	function checkTie() {
		return !_board.some(elem => elem === null);
	}
 
	function addMark(index, marker) {
		if(_board[index] === null) {
			_board[index] = marker;
		}
	};

	return {
		getBoard,
		resetBoard,
		addMark,
		checkWin,
		checkTie,
	}

})();

function createPlayer (playerName, playerMark) {
	return {
		playerName,
		playerMark,
		score: 0,
	}

};

const gameController = (() => {
	const player1 = createPlayer('soham', 'x');
	const player2 = createPlayer('kratos', 'o');
	const player = [player1, player2]

	let activePlayer = player[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === player[0] ? player[1] : player[0];
	}

	function playGame() {
		console.log(activePlayer);
		switchPlayerTurn();
		console.log(activePlayer);
		gameBoard.addMark(1, activePlayer.playerMark);
		console.log(gameBoard.getBoard(0));
		//check if program flow is proper manually
		//after winning what happens do that
		//after tie ...
		//then start with dom
	}

	return {playGame, player1, player2};

})();

gameController.playGame();








