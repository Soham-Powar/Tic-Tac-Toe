
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


const domHandler = (function () {
	const container = document.querySelector('.container');
	const dialog = document.querySelector('dialog');
	const formSubmit = document.querySelector('form');

	formSubmit.addEventListener('submit', (event) => {
		event.preventDefault();
		let player1Name = event.target.player1Name.value;
		let player2Name = event.target.player2Name.value;
		formSubmit.reset();
  		dialog.close();
		gameController.playGame(player1Name, player2Name);
	});

	function attachEventListeners() {
		const gameDivs = document.querySelectorAll('.container > div');
		gameDivs.forEach((div) => {
			div.addEventListener('click', () => {
				const activePlayer = gameController.getActivePlayer();
				div.textContent = activePlayer.playerMark;
			});
		});
	}

	function showForm () {
		dialog.showModal();
	}

	function fillContainer () {
		for(let i = 0; i < 9; i++) {
			let newDiv = document.createElement('div');
			newDiv.setAttribute('data-index', i);
			container.appendChild(newDiv);
		}
		attachEventListeners();
	}

	return {
		fillContainer,
		showForm,
	}
})();

const gameController = (() => {
	const player = ['', ''];
	let activePlayer = '';

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === player[0] ? player[1] : player[0];
	}

	const getActivePlayer = () => {
		return activePlayer;
	}

	function playGame(player1Name, player2Name) {
		
		player[0] = createPlayer(player1Name, 'x');
		player[1] = createPlayer(player2Name, 'o');
		switchPlayerTurn();


		domHandler.fillContainer();


		// gameBoard.addMark(0, activePlayer.playerMark);
		// // switchPlayerTurn();
		// gameBoard.addMark(1, activePlayer.playerMark);
		// // switchPlayerTurn();
		// gameBoard.addMark(2, activePlayer.playerMark);
		// // switchPlayerTurn();
		// console.log(gameBoard.checkWin());
		// console.log(gameBoard.getBoard());
		// }
		//check if program flow is proper manually
		//after winning what happens ...
		//after tie ...
		//then start with dom
	}

	return {
		playGame,
		getActivePlayer,
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

// gameController.playGame();








