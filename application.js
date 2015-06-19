$(document).ready(function(){
	makeMoves();
});

var numMoves = 0;
var kitty = "kitty"; var puppy = "puppy";
var currentPlayer = kitty;
var kittySum = 0; var puppySum = 0; // store running sum of which grids clicked
var kittyMoves = 0; var puppyMoves = 0; // store # of moves per player
var confirmGame;

// update clicked grids with markers: alternate between X's and O's
function makeMoves(){
	$(".grid").find(".grid_sq").on("click", function(){
		if($(this).attr("clicked") != "true"){ // check if grid square is available
			$(this).attr({
				clicked: "true" // update grid square so can't be taken again
			});
			if(currentPlayer == kitty){
				$(this).append("<img width=200px height=200px src='http://thecatapi.com/api/images/get?format=src&type=gif'>");

				// $(this).css({"background-color": "green"});
				kittySum += parseInt($(this).attr("points")); // add grid score to sum for player
				kittyMoves++; // increment player's number of moves
			}
			else {
				$(this).append("<img width=200px height=200px src='http://www.thepuppyapi.com/puppy?format=src'>");
				// $(this).css({"background-color": "red"});
				puppySum += parseInt($(this).attr("points"));
				puppyMoves++;
			}

			gameOver(); // check if game is over
			switchPlayer(); // if game isn't over, next turn is other player's

			// // debugging
			// console.log("kittySum " + kittySum);
			// console.log("kittyMoves " + kittyMoves);
			// console.log("puppySum " + puppySum);
			// console.log("puppyMoves " + puppyMoves);
			// console.log($(this).attr("clicked"));
		}
	});
}

function gameOver(){
	var winCombos = [7, 56, 448, 73, 146, 292, 273, 84]; // grid points summed horizontally, vertically and diagonally

	if(currentPlayer == kitty && kittyMoves >= 3){ // only check for winner if the player's moves are >= than 3, the earliest he/she could win
		for(var i = 0; i < winCombos.length; i++){
			if((winCombos[i] & kittySum) === winCombos[i]){
				confirmGame = confirm("X is winner! Want to play again?");
			}
		}
	}

	if(currentPlayer == puppy && puppyMoves >= 3){
		for(var i = 0; i < winCombos.length; i++){
			if((winCombos[i] & puppySum) === winCombos[i]){
				confirmGame = confirm("O is winner! Want to play again?");
			}
		}
	}
	
	if(kittyMoves + puppyMoves == 9){ // if max number of moves is reached and no winner, game is a draw
		confirmGame = alert("Draw! Want to play again?");
	}
	
	// reset game
	newGame();
};

function switchPlayer(){
	currentPlayer = ((currentPlayer == kitty) ? puppy : kitty);
};

function newGame(){
	if(confirmGame == true){
    	window.location.reload();
	};
}