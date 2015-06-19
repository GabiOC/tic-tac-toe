$(document).ready(function(){
	play();
});

var numMoves = 0;
var kitty = "kitty"; var puppy = "puppy";
var currentPlayer = kitty;
var kittyMoves = 0; var puppyMoves = 0; // store which grids clicked
var kittyNumMoves = 0; var puppyNumMoves = 0; // store # of moves per player
var confirmNewGame;

function play(){
	$(".grid").find(".grid_sq").on("click", function(){
		if($(this).attr("clicked") != "true"){ // check if grid square is available
			$(this).attr({
				clicked: "true" // update grid square so can't be taken again
			});
			if(currentPlayer == kitty){
				$(this).append("<img width=200px height=200px src='http://thecatapi.com/api/images/get?format=src&type=gif'>");
				kittyMoves += parseInt($(this).attr("id")); // add grid clicked to player's moves
				kittyNumMoves++; // increment player's number of moves
			}
			else {
				$(this).append("<img width=200px height=200px src='http://www.thepuppyapi.com/puppy?format=src'>");
				puppyMoves += parseInt($(this).attr("id"));
				puppyNumMoves++;
			}

			gameOver(); // check if game is over
			switchPlayer(); // if game isn't over, next turn is other player's

			// // debugging
			// console.log("kittyMoves " + kittyMoves);
			// console.log("kittyNumMoves " + kittyNumMoves);
			// console.log("puppyMoves " + puppyMoves);
			// console.log("puppyNumMoves " + puppyNumMoves);
			// console.log($(this).attr("clicked"));
			// console.log(currentPlayer);
		}
	});
}

function gameOver(){
	var winCombos = [7, 56, 448, 73, 146, 292, 273, 84]; // grid points summed horizontally, vertically and diagonally

	if(currentPlayer == kitty && kittyNumMoves >= 3){ // only check for winner if the player's moves are >= than 3, the earliest he/she could win
		for(var i = 0; i < winCombos.length; i++){
			if((winCombos[i] & kittyMoves) === winCombos[i]){ // use bitwise 'and' operator to check if the player's moves equal a winning combo
				confirmNewGame = confirm("Kitties are the winner! Want to play again?");
			}
		}
	}

	if(currentPlayer == puppy && puppyNumMoves >= 3){
		for(var i = 0; i < winCombos.length; i++){
			if((winCombos[i] & puppyMoves) === winCombos[i]){
				confirmNewGame = confirm("Puppies are the winner! Want to play again?");
			}
		}
	}
	
	else if(kittyNumMoves + puppyNumMoves == 9){ // if max number of moves is reached and no winner, game is a draw
		confirmNewGame = confirm("Draw! Want to play again?");
	}
	
	// reset game
	newGame();
};

function switchPlayer(){
	currentPlayer = ((currentPlayer == kitty) ? puppy : kitty);
};

function newGame(){
	if(confirmNewGame == true){
    	window.location.reload();
	};
}