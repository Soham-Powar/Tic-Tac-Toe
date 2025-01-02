
const gameBoard = (function () {

	let _board = Array(9).fill(null);

	const getBoard = () => _board;

	const resetBoard = () => {
		_board.fill(null);
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
				return {
					winMark: _board[a],
					winPositions: [a,b,c],
				}
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
			return true;
		}
		return false;
	};

	return {
		getBoard,
		resetBoard,
		addMark,
		checkWin,
		checkTie,
	}

})();


const domHandler = (function () {
	const container = document.querySelector('.container');
	const dialog = document.querySelector('dialog');
	const formSubmit = document.querySelector('form');
	const messageDisplay = document.querySelector('.message');
	const resetBtn = document.querySelector('.reset-btn');

	resetBtn.addEventListener('click', () => {
		resetDOM();
		gameBoard.resetBoard();
		updateMessage('');
	});

	formSubmit.addEventListener('submit', (event) => {
		event.preventDefault();
		let player1Name = event.target.player1Name.value;
		let player2Name = event.target.player2Name.value;
		formSubmit.reset();
  		dialog.close();
		gameController.playGame(player1Name, player2Name);
	});

	function resetDOM () {
		const gameDivs = document.querySelectorAll('.container > div');
		gameDivs.forEach((div) => {
			div.textContent = '';
		});
		gameController.playGame();
	}

	function attachEventListeners() {
		const gameDivs = document.querySelectorAll('.container > div');
		gameDivs.forEach((div) => {
			div.addEventListener('click', () => {
				const index = parseInt(div.getAttribute('data-index'));
				gameController.handleTurn(index);
			});
		});
	}

	function showForm () {
		dialog.showModal();
	}

	function fillContainer () {
		container.innerHTML = '';
		for(let i = 0; i < 9; i++) {
			let newDiv = document.createElement('div');
			newDiv.setAttribute('data-index', i);
			container.appendChild(newDiv);
		}
		attachEventListeners();
	}

	function updateMessage(message) {
		messageDisplay.textContent = message;
	}

	return {
		fillContainer,
		showForm,
		updateMessage,
		resetDOM,
	}
})();

const gameController = (() => {
	const player = [];
	let activePlayer = null;

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === player[0] ? player[1] : player[0];
	}

	const getActivePlayer = () => activePlayer;

	function handleTurn(index) {
		if (gameBoard.addMark(index, activePlayer.playerMark)) {
			const gameDivs = document.querySelectorAll('.container > div');
			gameDivs[index].textContent = activePlayer.playerMark;

			const winResult = gameBoard.checkWin();
			if (winResult) {
				domHandler.updateMessage(`${activePlayer.playerName} wins!`);
				return;
			}

			if (gameBoard.checkTie()) {
				domHandler.updateMessage("It's a tie!");
				resetDOM();
				return;
			}

			switchPlayerTurn();
			domHandler.updateMessage(`${activePlayer.playerName}'s turn (${activePlayer.playerMark})`);
		}
	}

	function playGame(player1Name, player2Name) {
		if(activePlayer === null) {
			player[0] = createPlayer(player1Name, 'x');
			player[1] = createPlayer(player2Name, 'o');
		}
		activePlayer = player[0];

		gameBoard.resetBoard();
		domHandler.fillContainer();

	}

	return {
		playGame,
		getActivePlayer,
		handleTurn,
	};

})();

function createPlayer (playerName, playerMark) {
	return {
		playerName,
		playerMark,
		score: 0,
	}

};

domHandler.showForm();

//Tomorrow make sure that everything is working correctly
//test for end cases and make sure everything is good
//remove redundancy if any
//focus on aesthetics too, make it look better.








