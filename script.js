
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
	// const board = gameBoard.getBoard();
	// const domHandler = handleDOM(board);
	// const dialog = document.querySelector("dialog");


	// const names = domHandler.getNames()

	const player1 = createPlayer('soham', 'x');
	const player2 = createPlayer('kratos', 'o');
	const player = [player1, player2]

	let activePlayer = player[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === player[0] ? player[1] : player[0];
	}

	function playGame() {
		// dialog.showModal();
		while(!gameBoard.checkWin() && !gameBoard.checkTie()) {
			let index = parseInt(prompt('Enter a position (0-8):'), 10);
			gameBoard.addMark(index, activePlayer.playerMark);
			switchPlayerTurn();
		}

		  const winner = gameBoard.checkWin();
  if (winner) {
    console.log(`Player ${winner} wins!`);
  } else if (gameBoard.checkTie()) {
    console.log("It's a tie!");
  }

  console.log("Final Board:");
  console.log(gameBoard.getBoard());
	}

	return {playGame, player1, player2};

})();

gameController.playGame();
// console.log(gameController.board);
// console.log(gameController.player1);
// console.log(gameController.player2);



// function handleDOM(board) {
// 	const dialog = document.querySelector("dialog");
// 	const submitNames = document.querySelector('form');
// 	const containerDiv = document.querySelector('.container');
// 	const gameDivs = document.querySelectorAll('.container > div');

// 	let player1Name = '';
// 	let player2Name = '';

// 	submitNames.addEventListener('submit', event => {
// 		event.preventDefault();
// 		player1Name = event.target.player1Name.value;
// 		player2Name = event.target.player2Name.value;
// 		dialog.close();
// 	});

// 	gameDivs.forEach((div) => {
// 		div.addEventListener('click', () => {
// 			const index = parseInt(div.getAttribute('data-index'));
// 			if(board[index] === NULL) {
// 			}
// 		})
// 	})


// 	function getNames() {
// 		return [player1Name, player2Name];
// 	}

// 	(function displayDivs() {
// 		for(let i = 0; i < 9; i++) {
// 			let newDiv = document.createElement('div');
// 			newDiv.setAttribute("data-index", i);
// 			containerDiv.appendChild(newDiv);
// 		}
// 	})();

// 	function updateDisplay(board) {
// 		for (let i = 0; i < board.length; i++) {
// 			if (board[i] != null) { // Check if the board position is not empty
// 				let reqDiv = document.querySelector(`div[data-index='${i}']`);
// 				if (reqDiv) {
// 					reqDiv.textContent = board[i]; // Update the div with the board value
// 				}
// 			}
// 		}
// 	}


// 	return {
// 		getNames,
// 		upddateDisplay,
// 	}


// }







