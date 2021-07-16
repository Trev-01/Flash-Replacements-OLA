// Compound Word class: holds word in string repr, along with its components and individual lexical categories
class Compound {
	// @params w1, w2, w3: represent, from left to right, the word, its first component word, and its second component word
	// @params l1, l2, l3: lexical categories of w1, w2, and w3, respectively
	constructor(w1, w2, w3, l1, l2, l3) {
		this.w1 = w1;
		this.w2 = w2;
		this.w3 = w3;
		this.l1 = l1;
		this.l2 = l2;
		this.l3 = l3;
	}

	getWordPair() {
		return [this.w1, this.l1];
	}

	getLeftPair() {
		return [this.w2, this.l2];
	}

	getRightPair() {
		return [this.w3, this.l3];
	}
}


// Enumeration classes for lexical categories and game states
const categories = {
	NOUN: "Noun",
	VERB: "Verb",
	PREP: "Preposition",
	ADJV: "Adjective",
}



// Initialize a counter while the session is going to keep track of the current slide or question 
var count = 0;
const TOTAL_QS = 26;	// total number of questions
var attempts = 3;


// use a map to "map", like a dictionary, words to their respective lexical category. This map is for the words.
const wDict = new Map();

// This map is for the component words.
const cDict = new Map();


// OR, can access a file hosted by a web server intstead of hardcoding
// Hard-coded strings in to the word map (wDict)
/*wDict.set("handgun", "Noun");
wDict.set("hanger-on", "Noun");
wDict.set("outcome", "Noun");
wDict.set("far-fetched", "Adjective");
wDict.set("onlooker", "Noun");
wDict.set("fishtank", "Noun");
wDict.set("rainfall", "Noun");
wDict.set("drainboard", "Noun");
wDict.set("dry-cleaning", "Noun");
wDict.set("firefighter", "Noun");
wDict.set("hangover", "Noun");
wDict.set("hot dog", "Noun");
wDict.set("low cut", "Adjective");
wDict.set("bystander", "Noun");
wDict.set("haircut", "Noun");
wDict.set("old-fashioned", "Adjective");
wDict.set("output", "Noun");
wDict.set("take-off", "Noun");
wDict.set("serving platter", "Noun");
wDict.set("blackboard", "Noun");
wDict.set("overpass", "Noun");
wDict.set("swimming pool", "Noun");
wDict.set("redhead", "Noun");
wDict.set("public speaking", "Noun");
wDict.set("bird watching", "Noun");
wDict.set("passerby", "Noun");


// Hard-coded strings in to the component word map (cDict)

*/

// Containers for the current strings
var word = document.getElementById("bigword");
var cLeft = document.getElementById("compleft-label");
var cRight = document.getElementById("compright-label");


// Updates count and sets headeralignright
function updateCounter() {
	count++;
	document.getElementById("headeralignright").innerHTML = "Question " + count.toString() 
				+ " of " + TOTAL_QS.toString();
}


/*Clears the instructions, shrinks the div to fit the dropdowns and button footer
  and changes "Instructions" in the header to "Question $count of $TOTAL_QS"*/
function clearAll() {
	const parent = document.getElementById("setuptext");
	while (parent.firstChild) 
		parent.removeChild(parent.lastChild);
	updateCounter();
}


/*Generates new words or flips screens*/
function next() {
	if (count == 0) {
		clearAll();

		// Enable instructions button and check button; disable next button
		document.getElementById("nextbutton").disabled = true;
		document.getElementById("instrbutton").disabled = false;
		document.getElementById("checkbutton").disabled = false;

	} /*else {

		// get next set of words in map
		// populate appropriate sections in the play area
		// reset attempts to 0
		updateCounter();
		attempts = 0;
		word.innerHTML = wDict.keys().next().value;
		componentLeft.innerHTML = cDict.keys().value;
		componentRight.innerHTML = cDict.keys().value;
	}*/
}


/*is called when modal is to be shown
function showModal(inputText) {
	var modal = document.getElementById("instr-modal");
	var span = document.getElementsByClassName("close")[0];
	document.getElementById("modal-text").innerHTML = inputText;
	modal.style.display = "block";

	span.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal)
			modal.style.display = "none";
	}
}*/


/* Called when the user clicks the 'Instructions' button after finishing setup */
function showInstructions() {
	const INSTRUCTIONS =  "The following exercise will give you practice with compounding. " 
					   +  "You will be presented in the following screens with a series of words, "
					   +  "for which you will have to perform the following task: Identify the " 
					   +  "lexical categories for each component word as well as the compound word. "
					   +  "To do this, simply select the appropriate lexical category from the drop down list. <br>"
					   +  "<br>To determine if your solution is correct, click the 'check' button. "
					   +  "You will have three opportunities to analyze the word correctly, after which "
					   +  "the correct answer will be provided for you.";
	//showModal(INSTRUCTIONS);

	var modal = document.getElementById("instr-modal");
	var span = document.getElementsByClassName("close")[0];
	document.getElementById("modal-text").innerHTML = INSTRUCTIONS;
	modal.style.display = "block";

	span.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal)
			modal.style.display = "none";
	}
}

/*
WHILE LOOP SHOULD NOT BE IN CHECK
WHILE LOOP SHOULD BE IN NEXT ELSE CLAUSE
WHILE LOOP IS NOT NEEDED
Fired when the user hits check (must at least be passed the setup page)
function check() {
	// check if lexical category matches word
	// get each of the dropdowns (in order: word, component left, component right)
	var dWord = document.getElementById("masterList");
	var dCompLeft = document.getElementById("compleft");
	var dCompRight = document.getElementById("compright");

	while (attempts > 0) {
			if (dWord.value === wDict[word] &&
		  dCompLeft.value === cDict[cLeft] &&
		  dCompRight.value === cDict[cRight]) {
				break;
			} else {
							// show incorrect alert
							// decrement attempts
							attempts--;

				} else {

				}
	}

	if (attempts === 0)
	{
		// give answer (modal)
		const ANSWER = "You look like you need some help.<br><br>" 
								 + wDict[word] + " = " + cDict[cLeft] + cDict[cRight];
	  showModal(ANSWER);

	} else {
		// show correct alert (break condition)
		const CORRECT = "Correct. You may continue to the next question.";
		showModal(CORRECT);
	}

	document.getElementById("nextbutton").disabled = false;
	document.getElementById("checkbutton").disabled = true;
	//enable next button, disable check button
}*/

// Make document.getElementById global to reuse containers
// Make a map for game states? (HELP, CORRECT, INSTRUCTIONS, WRONG, etc.);