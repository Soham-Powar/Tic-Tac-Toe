//This module contains functions applicable on board. Board is an array which will hold the x/o marks from the game.
//except _board every function is kept accessible.
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

	//check if the elements present at the possible winning positions of the array are same. If same => somebody has won!
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

	//if the array contains no null element(all elements are either x/o) => Its a tie!
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


//Module responsible to handle DOM, both input and output.
const domHandler = (function () {
	const container = document.querySelector('.container');
	const dialog = document.querySelector('dialog');
	const formSubmit = document.querySelector('form');
	const messageDisplay = document.querySelector('.message');
	const resetBtn = document.querySelector('.reset-btn');
	const player1Div =document.querySelector('.player1 > p');
	const player2Div =document.querySelector('.player2 > p');

	resetBtn.addEventListener('click', () => {
		resetDOM();
		gameBoard.resetBoard();
		updateMessage('');
	});

	//playGame starts when and if this event is fired. i.e - i.f.f form with playerNames is submitted.
	formSubmit.addEventListener('submit', (event) => {
		event.preventDefault();
		let player1Name = event.target.player1Name.value;
		let player2Name = event.target.player2Name.value;
		player1Div.textContent = `${player1Name} (X):`
		player2Div.textContent = `${player2Name} (O):`
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

	//It must happen after the container is filled with divs or the selector '.container>div' wont return anything as nothing is in dom.
	//so the event listener is enclosed inside of an function.
	function attachEventListeners() {
		const gameDivs = document.querySelectorAll('.container > div');
		gameDivs.forEach((div) => {
			div.addEventListener('click', () => {
				const index = parseInt(div.getAttribute('data-index'));
				gameController.handleTurn(index);
			});
		});
	}

	//This function is called first, only then form is displayed and can be submitted after filling names(which fires playGame).
	function showForm () {
		dialog.showModal();
	}

	//Add the cells of tic-tac-toe.
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

//Create player object
function createPlayer (playerName, playerMark) {
	return {
		playerName,
		playerMark,
		score: 0,
	}

};

domHandler.showForm();

//also have to display score
//Tomorrow make sure that everything is working correctly
//test for end cases and make sure everything is good
//remove redundancy if any
//focus on aesthetics too, make it look better.








