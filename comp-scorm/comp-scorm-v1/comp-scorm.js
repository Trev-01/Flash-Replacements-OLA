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


// Literal object type representing an enumeration (enum) for lexical categories
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
	new Compound("dry-cleaning", "dry", "cleaning", lCat.NOUN, lCat.ADJV, lCat.VERB),
	new Compound("fire fighter", "fire", "fighter", lCat.NOUN, lCat.NOUN, lCat.NOUN),

	new Compound("hangover", "hang", "over", lCat.NOUN, lCat.VERB, lCat.PREP),
	new Compound("hot dog", "hot", "dog", lCat.NOUN, lCat.ADJV, lCat.NOUN),
	new Compound("low-cut", "low", "cut", lCat.ADJV, lCat.ADJV, lCat.VERB),
	new Compound("bystander", "by", "stander", lCat.NOUN, lCat.PREP, lCat.NOUN),
	new Compound("haircut", "hair", "cut", lCat.NOUN, lCat.NOUN, lCat.VERB),
	
	new Compound("old-fashioned", "old", "fashioned", lCat.ADJV, lCat.ADJV, lCat.VERB),
	new Compound("output", "out", "put", lCat.NOUN, lCat.PREP, lCat.VERB),
	new Compound("take-off", "take", "off", lCat.NOUN, lCat.VERB, lCat.PREP),
	new Compound("serving platter", "serving", "platter", lCat.NOUN, lCat.VERB, lCat.NOUN),
	new Compound("blackboard", "black", "board", lCat.NOUN, lCat.ADJV, lCat.NOUN),

	new Compound("overpass", "over", "pass", lCat.NOUN, lCat.PREP, lCat.VERB),
	new Compound("swimming pool", "swimming", "pool", lCat.NOUN, lCat.VERB, lCat.NOUN),
	new Compound("redhead", "red", "head", lCat.NOUN, lCat.ADJV, lCat.NOUN),
	new Compound("public speaking", "public", "speaking", lCat.NOUN, lCat.ADJV, lCat.VERB),
	new Compound("bird watching", "bird", "watching", lCat.NOUN, lCat.NOUN, lCat.VERB),

	new Compound("passerby", "passer", "by", lCat.NOUN, lCat.NOUN, lCat.PREP)
];


// Button elements (<button>)
const nextBtn = document.getElementById("next-button"),
    instrBtn = document.getElementById("ins-button"),
    checkBtn = document.getElementById("check-button");


// Dropdown elements(<select>)
const ddWord = document.getElementById("main-list"),
    ddCompLeft = document.getElementById("left-list"),
    ddCompRight = document.getElementById("right-list");



//************ FUNCTIONS ************//

// Updates count variable and changes the aligned-right text in the header
function countUp() {
	qCount++;
	document.getElementById("header-right").innerHTML = "Question "
													+ qCount.toString()
													+ " of "
													+ TOTAL_QS.toString();	
}


// Displays reusable modal template with specific input text when requested
function showModal(inputtxt, isShort) {
	let modal = document.getElementById("modal-template"),
	    blocker = document.getElementById("blocker");


	document.getElementById("modal-text").innerHTML = inputtxt;
	modal.style.display = "block";
	document.body.classList.add("overflow-hidden");

	modal.style.textAlign = (isShort) ? "center" : "left";
	blocker.style.display = "block";

	document.getElementsByClassName("close")[0].onclick = function() {
		modal.style.display = "none";
		blocker.style.display = "none";
		document.body.classList.remove("overflow-hidden");
	}
}


// Shows the instructions in the modal
function showInstructions() {
	let INSTRUCTIONS =  "The following exercise will give you practice with compounding. " 
					   +  "You will be presented in the following screens with a series of words, "
					   +  "for which you will have to perform the following task: Identify the " 
					   +  "lexical categories for each component word as well as the compound word. "
					   +  "To do this, simply select the appropriate lexical category from the drop down list. <br><br>"
					   +  "To determine if your solution is correct, click the 'check' button. "
					   +  "You will have three opportunities to analyze the word correctly, after which "
					   +  "the correct answer will be provided for you.";
	showModal(INSTRUCTIONS, false);
}


/*
 * Fetches a word in the words list given current value of qCount	
*/
function fetch() {
	let wordObj = words[qCount - 1];
	document.getElementById("main-word").textContent = wordObj.getWordPair()[0];
	document.getElementById("left-label").textContent = wordObj.getLeftPair()[0];
	document.getElementById("right-label").textContent = wordObj.getRightPair()[0];

	nextBtn.disabled = true;
	checkBtn.disabled = false;

	ddWord.selectedIndex = 0;
	ddCompLeft.selectedIndex = 0;
	ddCompRight.selectedIndex = 0;
}


/*
 * Unpacks the enum key by mapping it to its value
*/ 
function mapToValue(key) {
	var val = "Word Category";
	switch (key) {
		case lCat.NOUN:
			val = "Noun";
			break;
		case lCat.VERB:
			val = "Verb";
			break;
		case lCat.PREP:
			val = "Preposition";
			break;
		case lCat.ADJV:
			val = "Adjective";
			break;
		default: break;
	}
	return val;
}


/* 
 * Clears instructions and shrinks div bounding box to fit remaining content
 * Disables and enables select buttons
 */
function clearAndFit() {
	let parent = document.getElementById("setup-text");
	while (parent.firstChild) 
		parent.removeChild(parent.lastChild);
	countUp();

	instrBtn.disabled = false;

	fetch();
	makeLines();
}


/*
 * Shows the finish modal and screen
*/
function end() {
	showModal("Congratulations! You have completed the exercise. Press the 'next' button to continue.", true);
}


/*
 * Checks if all dropdowns have the correct lexical categories for the current word
*/
function check() {
	let wordObj = words[qCount - 1],
	    wordPair = wordObj.getWordPair(),
	    wordLeft = wordObj.getLeftPair(),
	    wordRight = wordObj.getRightPair();

	if (ddWord.value == wordPair[1]
			&& ddCompLeft.value == wordLeft[1]
			&& ddCompRight.value == wordRight[1]) {

		if (qCount == TOTAL_QS) {
			end();
			nextBtn.disabled = false;
			checkBtn.disabled = true;
		} else {
			showModal("Correct. You may continue to the next question.", true);
			nextBtn.disabled = false;
			checkBtn.disabled = true;
		}
	
	} else {
		if (attempts == 0) {
			let ANSWER = "You look like you need some help.<br><br>" 
						 + wordPair[1]
						 + " = " 
						 + wordLeft[1] 
						 + " + "
						 + wordRight[1];
	  		showModal(ANSWER, true);
	  		nextBtn.disabled = false;
			checkBtn.disabled = true;

			ddWord.value = mapToValue(wordPair[1]);
			ddCompLeft.value = mapToValue(wordLeft[1]);
			ddCompRight.value = mapToValue(wordRight[1]);

		} else {
			attempts--;
			showModal("Not quite. Try again.", true);
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

	else if (qCount == TOTAL_QS)
		document.getElementById("master-list").innerHTML = "";

	else {
		countUp();
		fetch();

		attempts = 2;
	}
}


/*
* Gets the lower midpoint of the passed in element based on offset
* Access returned x coordinate via .mx, and y coordinate with .my 
*/
function lMidOf(elem) {
	let rect = elem.getBoundingClientRect();
	return ({ mx: rect.left + rect.width / 2,
	          my: rect.bottom});
}


/*
 * Gets the upper midpoint of the passed in element based on offset
 */
function uMidOf(elem) {
	let rect = elem.getBoundingClientRect();
	return ({ mx: rect.left + rect.width / 2,
	          my: rect.top })
}


/*
 * Helper function to set attributes of an element without multiple calls to Element.setAttribute()
 */
 function setAttributes(elem, attrs) {
 	for (let key in attrs) {
 		elem.setAttribute(key, attrs[key])
 	}
 }


/*
 * Helper Function to draw a single line
*/
function makeLine(svgLine, xs, xf, ys, yf) {
	setAttributes(svgLine, 
			{
				"x1": xs,
				"x2": xf,
				"y1": ys,
				"y2": yf
			});
}


/*
* Draws an SVG line at the given position
*/
function makeLines() {
	// SVG container lines
	let l1 = document.getElementById("line-left"),
	    l2 = document.getElementById("line-right");


	let rootPos = lMidOf(ddWord),
	    leftLeafPos = uMidOf(ddCompLeft),
	    rightLeafPos = uMidOf(ddCompRight);

	makeLine(l1, rootPos.mx, leftLeafPos.mx, rootPos.my, leftLeafPos.my);
	makeLine(l2, rootPos.mx, rightLeafPos.mx, rootPos.my, rightLeafPos.my);
}

/* 
 * Generate lines onload and show tree animation, and regenerate positions on window resize event
 */
window.onload = function() {
	makeLines();
}

window.onresize = makeLines;

