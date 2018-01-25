
var Word = require('./word.js');
var prompt = require('prompt');
var Game = require('./game.js');

console.log("-----------------------------");
console.log("Welcome to CrossFit Hangman");
console.log("Guess a letter of for benchmark WOD");
console.log("-----------------------------");
prompt.start();



game = {
 
 	wordBank: Game.game.wordBank,
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWrd: null,
 	
 	beginGame: function (wrd) {
 		this.resetGame();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGame: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guessLet'], function(err, result){
 			console.log("Guessed: " + result.guessLet);
 			var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

 			if(manyGuessed ==0) {
 				console.log("WRONG");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("CORRECT");
 					if(self.currentWrd.findWord()){
 						console.log("-----------------------------");
 						console.log("You won");
 						console.log("Word: ", self.currentWrd.target);
 						console.log("Try this workout. RX: run 1 mile before and after");
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Remaining Attempts: " + self.guessesRemaining);
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game over. Correct Word ", self.currentWrd.target);
 			} else {
 				console.log(self.currentWrd.wordRender());
 			}
 		});

 	}


};

game.beginGame();