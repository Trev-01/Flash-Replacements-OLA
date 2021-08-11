/****** DROPDOWN ******/

/*
 * Array for the three dropdowns, listed in-order
 */
const dropdowns = [
	document.getElementById("left-list-wrapper"),
	document.getElementById("main-list-wrapper"),
	document.getElementById("right-list-wrapper")
]; 

// Stack for the selected lists (in the order they were selected)
var listStack = [];
var listIndex = 0;	// index for the current item in the stack; current list is at listIndex - 1

/*
 * Returns the <div> "option" element if it has the "selected" class in its classList 
 */
function getSelectedOf(dropdown) {
	const options = dropdown.querySelector(".list-options");
	return options.querySelector(".selected");
}

/*
 * Selects the given list option and sets the display label in the list box to its data value
 */
function selectOption(lOption) {
	lOption.parentNode.querySelector(".choice.selected").classList.remove("selected");
	lOption.classList.add("selected");
	lOption.closest(".list-select").querySelector(".list-box span").textContent = lOption.textContent;
}


function selectOptionAll(query, plus=false, index=0) {
	for (const dropdown of dropdowns) {
		if (plus)
			selectOption(dropdown.querySelectorAll(query)[index]);
		else
			selectOption(dropdown.querySelector(query));
	}
}

/*
 * Document event listener
 * Clicking on a list-box causes it to expand (and show its options)
 * Enables the options to be clicked and to register changes
 */
for (const dropdown of dropdowns) {
 	dropdown.addEventListener("click", function() {
 		this.querySelector(".list-select").classList.toggle("open");
 		listStack.push(this);
 		listIndex++;
 	});

 	const options = dropdown.querySelector(".list-options");
 	for (const option of options.querySelectorAll(".choice")) {
 		option.addEventListener("click", function() {
 			if (!this.classList.contains("selected"))
 				selectOption(this);
 		});
 	}
}

 /*
  * Window event listener: closes the dropdown if it is clicked outside
  */
window.addEventListener("click", function(event) {
  	if (listStack[listIndex - 1] != null) {
  		const select = listStack[listIndex - 1].querySelector(".list-select");
  		if (!select.contains(event.target))
  		{
  			select.classList.remove("open");
  			listStack.pop();
  			listIndex--;
  		}
  	}
});




/****** SETUP ANIMATION ******/

/*
 * Runs the setup animation for a specified dropdown and lexical category
 */
function demo(dropdown, lStr) {
	dropdown.querySelector(".list-select").classList.toggle("open");
	for (const option of dropdown.getElementsByClassName("choice")) {
		option.focus();
		if (option.dataset.value == lStr) {
			selectOption(option);
			break;
		}
	}
}

/*
 * Window onload listener to begin the setup animation
 */
window.onload = function() {
	makeLines();

	const OPEN_WAIT = 1500;
	const BUFFER = 250;

	let openAndPick = (dropdown, lStr, interval) => window.setTimeout(function() { demo(dropdown, lStr); }, interval);
	let waitAndLock = (dropdown, interval) => window.setTimeout(function() { dropdown.querySelector(".list-select").classList.toggle("open"); }, interval);

	let opener = ["Verb", "Noun", "Preposition"];

	for (let i = 0; i < dropdowns.length; i++) {
		openAndPick(dropdowns[i], opener[i], OPEN_WAIT * (i + 1) + BUFFER * i);
		waitAndLock(dropdowns[i], OPEN_WAIT * (i + 2));
	}
}




/****** BACKGROUND SVG DRAWING ******/

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
	setAttributes(svgLine, {
				"x1": xs,
				"x2": xf,
				"y1": ys,
				"y2": yf });
}


/*
* Draws an SVG line at the given position
*/
function makeLines() {
	// SVG container lines
	let l1 = document.getElementById("line-left"),
	    l2 = document.getElementById("line-right");


	let rootPos = lMidOf(dropdowns[1]),
	    leftLeafPos = uMidOf(dropdowns[0]),
	    rightLeafPos = uMidOf(dropdowns[2]);

	makeLine(l1, rootPos.mx, leftLeafPos.mx, rootPos.my, leftLeafPos.my);
	makeLine(l2, rootPos.mx, rightLeafPos.mx, rootPos.my, rightLeafPos.my);
}

/* 
 * Generate lines onload and show tree animation, and regenerate positions on window resize event
 */

window.onresize = makeLines;



/****** MAIN GAME MECHANICS ******/
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


// Array of Compound Words: currently a total of 26 words
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
const nextBtn  = document.getElementById("next-button"),
      insBtn   = document.getElementById("ins-button"),
      checkBtn = document.getElementById("check-button");

// Session Variables
const TOTAL_QS = 26;	// total number of questions 
var qCount = 0;			// the current question number
var attempts = 2;		// initial number of attempts (per question) minus 1 (0 counts)

// Updates count variable and changes the aligned-right text in the header
function countUp() {
	qCount++;
	document.getElementById("header-right").textContent = "Question "
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

	modal.querySelector(".close").onclick = function() {
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
 * Shows the finish modal and screen
*/
function end() {
	showModal("Congratulations! You have completed the exercise. Press the 'next' button to continue.", true);
}

/*
 * Fetches a word in the words list given current value of qCount	
*/
function fetch() {
	let wordObj = words[qCount - 1];
	document.getElementById("main-word").textContent = wordObj.getWordPair()[0];
	document.getElementById("left-list-label").textContent = wordObj.getLeftPair()[0];
	document.getElementById("right-list-label").textContent = wordObj.getRightPair()[0];

	nextBtn.disabled = true;
	checkBtn.disabled = false;

	// Similar behaviour to setting <select> .selectIndex to 0
	selectOptionAll(".placeholder");
	makeLines();
}

/*
 * Unpacks the enum key by mapping it to its String value
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
 * Maps the lexical category string representation to a list item index position (top-to-bottom) in the dropdowns
 */
function mapToIndex(lStr) {
	switch(lStr) {
		case "Noun": return 1;
		case "Verb": return 2;
		case "Preposition": return 3;
		case "Adjective": return 4;
		default: return 0;
	}
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

	insBtn.disabled = false;

	fetch();
	makeLines();
}

/* 
 * Checks if all of the dropdowns have the correct lexical categories for the word
 */
function check() {
	let wordObj = words[qCount - 1];

	const pairs = [
		wordObj.getLeftPair(),
		wordObj.getWordPair(),
		wordObj.getRightPair()
	];

	let allCorrect = true;

	for (let i = 0; i < pairs.length; i++) {
		let value = getSelectedOf(dropdowns[i]).dataset.value;

		// incorrectly chosen
		if (value != pairs[i][1]) {

			// if no more attempts left
			if (attempts == 0) {
				let ANSWER = "You look like you need some help.<br><br>" 
						   + pairs[0][1]
						   + " = " 
						   + pairs[1][1] 
						   + " + "
						   + pairs[2][1];

   				showModal(ANSWER, true);
				nextBtn.disabled = false;
				checkBtn.disabled = true;

				for (let j = 0; j < dropdowns.length; j++) {
					let options = dropdowns[j].querySelector(".list-options");
					selectOption(options.querySelectorAll(".choice")[mapToIndex(pairs[j][1])]);
				}

			} else {
				attempts--;
				showModal("Not quite. Try again.", true);
			}

			allCorrect = false;
			break;
		}
	}

	if (allCorrect) {
		if (qCount == TOTAL_QS) 
			end();
		else
			showModal("Correct. You may continue to the next question.", true);

		nextBtn.disabled = false;
		checkBtn.disabled = true;
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
		document.getElementById("play-area").innerHTML = "";
		

	else {
		countUp();
		fetch();
		attempts = 2;
	}
}