/* 
 * Compound word class
 * Container for the word, its constituents, and their respective lexical categories
 */
class Compound {
	/*
	 * parameters (w1, w2, w3): compound word, component word one, component word two
	 * parameters (l1, l2, l3): lexical categories for w1, w2, w3 respectively	
	 */
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


// Literal enum type for lexical categories
const lCat = {
	NOUN: "Noun",
	VERB: "Verb",
	PREP: "Preposition",
	ADJV: "Adjective"
}


// SESSION VARIABLES
const TOTAL_QS = 26;	// total number of questions 
var qCount = 0;			// the current question number
var attempts = 2;		// initial number of attempts (per question) minus 1 (0 counts)


// Array of Compound Words
// Currently a total of 26 words
const words = [
	new Compound("handgun", "hand", "gun", lCat.NOUN, lCat.NOUN, lCat.NOUN),
	new Compound("hanger-on", "hanger", "on", lCat.NOUN, lCat.NOUN, lCat.PREP),
	new Compound("outcome", "out", "come", lCat.NOUN, lCat.PREP, lCat.VERB),
	new Compound("far-fetched", "far", "fetched", lCat.ADJV, lCat.ADJV, lCat.VERB),
	new Compound("onlooker", "on", "looker", lCat.NOUN, lCat.PREP, lCat.NOUN),

	new Compound("fish tank", "fish", "tank", lCat.NOUN, lCat.NOUN, lCat.NOUN),
	new Compound("rainfall", "rain", "fall", lCat.NOUN, lCat.NOUN, lCat.VERB),
	new Compound("drainboard", "drain", "board", lCat.NOUN, lCat.VERB, lCat.NOUN),
	new Compound("dry cleaning", "dry", "cleaning", lCat.NOUN, lCat.ADJV, lCat.VERB),
	new Compound("firefighter", "fire", "fighter", lCat.NOUN, lCat.NOUN, lCat.NOUN),

	new Compound("hangover", "hang", "over", lCat.NOUN, lCat.VERB, lCat.PREP),
	new Compound("hot dog", "hot", "dog", lCat.NOUN, lCat.ADJV, lCat.NOUN),
	new Compound("low cut", "low", "cut", lCat.ADJV, lCat.ADJV, lCat.VERB),
	new Compound("bystander", "by", "stander", lCat.NOUN, lCat.PREP, lCat.NOUN),
	new Compound("haircut", "hair", "cut", lCat.NOUN, lCat.NOUN, lCat.VERB),
	
	new Compound("old-fashioned", "old", "fashioned", lCat.ADJV, lCat.ADJV, lCat.VERB),
	new Compound("output", "out", "put", lCat.NOUN, lCat.PREP, lCat.VERB),
	new Compound("take-off", "take", "off", lCat.NOUN, lCat.VERB, lCat.PREP),
	new Compound("serving platter", "serving", "platter", lCat.NOUN, lCat.VERB, lCat.NOUN),
	new Compound("blackboard", "black", "board", lCat.NOUN, lCat.ADJV, lCat.NOUN),

	new Compound("overpass", "over", "pass", lCat.NOUN, lCat.ADJV, lCat.NOUN),
	new Compound("swimming pool", "swimming", "pool", lCat.NOUN, lCat.VERB, lCat.NOUN),
	new Compound("redhead", "red", "head", lCat.NOUN, lCat.ADJV, lCat.NOUN),
	new Compound("public speaking", "public", "speaking", lCat.NOUN, lCat.ADJV, lCat.VERB),
	new Compound("bird watching", "bird", "watching", lCat.NOUN, lCat.NOUN, lCat.VERB),

	new Compound("passerby", "passer", "by", lCat.NOUN, lCat.NOUN, lCat.PREP)
];


// Word containers (<p> elements) to be updated every "next" iteration
var word = document.getElementById("main-word");
var cLeft = document.getElementById("left-label");
var cRight = document.getElementById("right-label");


// Button elements (<button>)
var nextBtn = document.getElementById("next-button");
var instrBtn = document.getElementById("ins-button");
var checkBtn = document.getElementById("check-button");


// Modal template elements (<div> and <span>)
var modal = document.getElementById("ins-modal");
var span = document.getElementsByClassName("close")[0];
var modalText = document.getElementById("modal-text");


// Dropdown elements(<select>)
var ddWord = document.getElementById("main-list");
var ddCompLeft = document.getElementById("left-list");
var ddCompRight = document.getElementById("right-list");


// FUNCTIONS

// Updates count variable and changes the aligned-right text in the header
function countUp() {
	qCount++;
	document.getElementById("header-right").innerHTML = "Question "
														  + qCount.toString()
														  + " of "
														  + TOTAL_QS.toString();	
}


// Displays reusable modal template with specific input text when requested
function showModal(inputtxt) {
	modalText.innerHTML = inputtxt;
	modal.style.display = "block";

	span.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal) 
			modal.style.display = "none";
	}
}


// Shows the instructions in the modal
function showInstructions() {
	const INSTRUCTIONS =  "The following exercise will give you practice with compounding. " 
					   +  "You will be presented in the following screens with a series of words, "
					   +  "for which you will have to perform the following task: Identify the " 
					   +  "lexical categories for each component word as well as the compound word. "
					   +  "To do this, simply select the appropriate lexical category from the drop down list. <br><br>"
					   +  "To determine if your solution is correct, click the 'check' button. "
					   +  "You will have three opportunities to analyze the word correctly, after which "
					   +  "the correct answer will be provided for you.";
	showModal(INSTRUCTIONS);
}


/*
 * Changes values in the dropdown to the default "select a type"
*/

function setToDefault() {
	ddWord.selectedIndex = 0;
	ddCompLeft.selectedIndex = 0;
	ddCompRight.selectedIndex = 0;
}


/*
 * Fetches a word in the words list given current value of qCount	
*/
function fetch() {
	const wordObj = words[qCount - 1];
	word.innerHTML = wordObj.getWordPair()[0];
	cLeft.innerHTML = wordObj.getLeftPair()[0];
	cRight.innerHTML = wordObj.getRightPair()[0];
}


/* 
 * Clears instructions and shrinks div bounding box to fit remaining content
 * Disables and enables select buttons
 */
function clearAndFit() {
	const parent = document.getElementById("setup-text");
	while (parent.firstChild) 
		parent.removeChild(parent.lastChild);
	countUp();

	nextBtn.disabled = true;
	instrBtn.disabled = false;
	checkBtn.disabled = false;

	fetch();
	setToDefault();
}


/*
 * Checks if all dropdowns have the correct lexical categories for the current word
*/
function check() {
	const wordObj = words[qCount - 1];
	const wordPair = wordObj.getWordPair();
	const wordLeft = wordObj.getLeftPair();
	const wordRight = wordObj.getRightPair();

	if (ddWord.value == wordPair[1]
			&& ddCompLeft.value == wordLeft[1]
			&& ddCompRight.value == wordRight[1]) {

		const CORRECT = "Correct. You may continue to the next question.";
		showModal(CORRECT);
		nextBtn.disabled = false;
		checkBtn.disabled = true;
	
	} else {
		if (attempts == 0) {
			const ANSWER = "You look like you need some help.<br><br>" 
						 + wordPair[1]
						 + " = " 
						 + wordLeft[1] 
						 + " + "
						 + wordRight[1];
	  		showModal(ANSWER);
	  		nextBtn.disabled = false;
			checkBtn.disabled = true;

		} else {
			attempts--;
			const INCORRECT = "Not quite. Try again."
			showModal(INCORRECT);
		}
	}
}



/* 
 * if count is 0: calls clearAndFit()
 * else: fetches new words, updates screen
*/
function next() {
	if (qCount == 0)
		clearAndFit();

	else {
		countUp();
		fetch();
		setToDefault();

		nextBtn.disabled = true;
		checkBtn.disabled = false;
	}
}

