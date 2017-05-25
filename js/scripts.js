//&#10005;

//&#9678;

console.log("Attendez la creme!");

$(document).ready(function () {

	// Constructor for player
	var player = function(index) {
		this.id = index;
		this.scoreboard = [];

		var self = this.id; // private variable that can be accessed internally 
		this.class = function () {
			return self == 1 ? "axe" : "oh";
		}
		this.character = function () {
			return self == 1 ? '&#10005;':'&#9678;';
		}
		this.clicks = 0;
	}

	// function to check for winning combi
	function checkWin (playerID) {
		// check if player's scoreboard matches any winning combi
		// sort scoreboard, use indexOf

		var winning = ["012","036","048","147","258","246","345","678"];
	}

	function findPlayerIndex (playerID) {
		return playerSet.findIndex(function (player) {
			return player.id === playerID ? true : false;
		});
	}

	// function to flip cell
	function flipCell (dataNum, playerID) {
		var currentCell = '[data-num="' +  dataNum + '"]';
		currentClass = $(currentCell).attr('class');
		console.log("stage: flipCell " + "currentCell: " + $(currentCell).attr('data-num'));
		$(currentCell).removeClass(currentClass).addClass(playerSet[findPlayerIndex(playerID)].class); // replace background color
		$(currentCell).html(playerSet[findPlayerIndex(playerID)].character); // replace character, call html to render special character
	}

	// Initialize public variables
	var clickCounter = 0;
	var playerSet = [];

	// function to initialize players
	function initializePlayer (clickCounter) {
		playerSet.push(new player(clickCounter));
		console.log("player " + playerSet[findPlayerIndex(clickCounter)].id + " initialized!");
		console.log("player's id: " + playerSet[findPlayerIndex(clickCounter)].id);
	}

	function gameFunction (event) {
		// Get data-num and class
		var clickedDataNum = $(event.target).attr('data-num');
		var clickedClass = $(event.target).attr('class');
		console.log("stage: gameFunction " + "clickedDataNum: " + clickedDataNum + " clickedClass: " + clickedClass);

		// Initialize players...
		if (clickCounter < 3) {
			initializePlayer(clickCounter);
			flipCell(clickedDataNum, playerSet[findPlayerIndex(clickCounter)].id);

		}
		else { // ...game continues
			if (clickCounter % 2 === 0) { // player 2's moves
				flipCell(clickedDataNum, playerSet[1].id);
			}
			else { // player 1's moves
				flipCell(clickedDataNum, playerSet[0].id);
			}
		}
	}
		

		

	// function to check for illegal moves
	function checkIllegalMove (event) {
		var clickedClass = $(event.target).attr('class');
		console.log("stage: checkIllegalMove " + "clickedClass: " + clickedClass);
		if (clickedClass === "empty") {
			clickCounter += 1;
			gameFunction(event);
		}
		else {
			// some error message
			console.log("That's an Illegal Move(TM).");
		}
		console.log("stage: checkIllegalMove " + "clickCounter: " + clickCounter);
	}

	// Event listener
	$('.board').on('click','td', function (e){
		
		checkIllegalMove(e);
		
		// 	console.log(clicked);
	});

});
