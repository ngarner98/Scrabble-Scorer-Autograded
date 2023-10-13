// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



let initialWord = "";

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   // let letterPoints = 0;

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`  //adjusted function to reflect output given by the assignment, reverted to origional after
         // letterPoints += Number(pointValue)                       but left old code as comments
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   initialWord = input.question("Let's play some scrabble!" + "\n\n" + "Enter a word: ");  //initial question to get user inputed word

};

let simpleScorer = function (word) {  //revised simpleScorer, explain reasoning for original function
    return word.length;
};

let vowelBonusScorer = function(word) {      //loops through the word and assigns point values to vowels and consonants
   const bonusPointStructure = {
      1: ['B', 'C', 'D','F','G', 'H', 'J', 'K', 'L', 'M', 'N',
         'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
      3: ['A', 'E', 'I', 'O', 'U']
   };
   word = word.toUpperCase();
   let letterPoints = 0;

	for (let i = 0; i < word.length; i++) {

      for (const pointValue in bonusPointStructure) {
         if (bonusPointStructure[pointValue].includes(word[i])) {
            letterPoints += Number(pointValue)
		   }
		 }
	  } return letterPoints;
}

let scrabbleScorer = function(word) { //loops through the word using the new point structure
   word = word.toLowerCase();
   let letterPoints = 0;

	for (let i = 0; i < word.length; i++) {
	  for (const letter in newPointStructure) {
		 if (letter === word[i]) {
         letterPoints += Number(newPointStructure[letter]);
		 } 
	  }
	}
	return letterPoints;
 };

const scoringAlgorithms = [{ //scoring object with the algorithm options and descriptions
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
}, {
   name: "Bonus Vowels",
   description: "Vowels are worth 3 points, consonants are worth 1 point",
   scorerFunction: vowelBonusScorer
}, {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}  
];


function scorerPrompt() { //prompts the user to select a valid algorithm
   console.log(`Which scoring algorithm would you like to use? \n 
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description} 
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description} \n`); 

   let userSelection = input.question(`Please select a scoring algorithm: `);

   while (userSelection < 0 || userSelection > 2) {
     userSelection = input.question(`Please enter a valid scoring algorithm: `);
   } 
   return console.log(`Your word ${initialWord} scored ${scoringAlgorithms[userSelection].scorerFunction(initialWord)} points.`);
}


function transform(object) { //takes the oldScrabbleScorer, iterates through the object, creating a new object with the score as the key
   let transformed = {};      //and the letters as the values
   for(key in object) {
      for(i = 0; i < object[key].length; i++) {
         transformed[object[key][i].toLowerCase()] = Number(key);
      }
   }
   return transformed;
};

 
let newPointStructure = transform(oldPointStructure); //uses the function above to make a new point object

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
