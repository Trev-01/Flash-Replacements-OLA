// Literal enum type for lexical categories
const lCat = {
	NOUN: "Noun",
	VERB: "Verb",
	AF: "AF",
	PREP: "Preposition",
    ADJV: "Adjective",
	NA: ""
}

// SESSION VARIABLES
const TOTAL_QS = 10;	// total number of questions 
var qCount = 0;			// the current question number
var attempts = 2;		// initial number of attempts (per question) minus 1 (0 counts)

class Compound {
	/*
	 * parameters (w1, w2, w3, w4, w5): Words and subdivided words
	 * parameters (l1, l2, l3): lexical categories for w1, w2, w3, w4, w5 respectively	
	 */
	constructor(w1, w2, w3, w4, w5, l1, l2, l3, l4, l5) {
		this.w1 = w1;
		this.w2 = w2;
		this.w3 = w3;
		this.w4 = w4;
		this.w5 = w5;
		this.l1 = l1;
		this.l2 = l2;
		this.l3 = l3;
		this.l4 = l4;
		this.l5 = l5;
	}

	getWordPair() {
		return [this.w1, this.l1];
	}

	getSub1() {
		return [this.w2, this.l2];
	}

	getSub2() {
		return [this.w3, this.l3];
	}

	getSub3() {
		return [this.w4, this.l4];
	}

	getSub4() {
		return [this.w5, this.l5];
	}
}

const words = [
	new Compound("Unfriendliness", "Un", "friend", "li", "ness", lCat.NOUN, lCat.AF, lCat.NOUN, lCat.AF, lCat.AF),
	new Compound("Underestimated", "Under", "estimat", "ed", "", lCat.VERB, lCat.PREP, lCat.VERB, lCat.AF, lCat.NA),
	new Compound("Unjustified", "Un", "just", "ifi", "ed", lCat.ADJV, lCat.AF, lCat.Adj, lCat.AF, lCat.Af),
	new Compound("Optionality", "Opt", "ion", "al", "ity", lCat.ADJV, lCat.VERB, lCat.AF, lCat.AF, lCat.AF),
	new Compound("Payment", "Pay", "ment", "", "", lCat.NOUN, lCat.VERB, lCat.AF, lCat.NA, lCat.NA),

	new Compound("Prettier", "Pretti", "er", "", "", lCat.ADJV, lCat.ADJV, lCat.AF, lCat.NA, lCat.NA),
	new Compound("Agedness", "Age", "d", "ness", "", lCat.NOUN, lCat.VERB, lCat.AF, lCat.AF, lCat.NA),
	new Compound("Triumphant", "Triumph", "ant", "", "", lCat.ADJV, lCat.VERB, lCat.AF, lCat.NA, lCat.NA),
	new Compound("Reusable", "Re", "us", "able", "", lCat.ADJV, lCat.AF, lCat.VERB, lCat.AF, lCat.NA),
	new Compound("Disobeyed", "Dis", "obey", "ed", "", lCat.VERB, lCat.AF, lCat.VERB, lCat.AF, lCat.NA)
];

// Word containers (<p> elements) to be updated every "next" iteration
var word = document.getElementById("main-word");
var c1 = document.getElementById("part-1");
var c2 = document.getElementById("part-2");
var c3 = document.getElementById("part-3");
var c4 = document.getElementById("part-4");


// Button elements (<button>)
var nextBtn = document.getElementById("next-button");
var instrBtn = document.getElementById("ins-button");
var checkBtn = document.getElementById("check-button");


// Modal template elements (<div> and <span>)
var modal = document.getElementById("modal-template");
var span = document.getElementsByClassName("close")[0];
var modalText = document.getElementById("modal-text");
var blocker = document.getElementById("blocker");

// Updates count variable and changes the aligned-right text in the header
function countUp() {
	qCount++;
	document.getElementById("header-right").innerHTML = "Question "
													+ qCount.toString()
													+ " of "
													+ TOTAL_QS.toString();	
}


// Shows the instructions in the modal
function showInstructions() {
	const INSTRUCTIONS =  "1. Identify the morphological boundaries. " 
					   +  "When you mouse over the word, grey slashes will appear in the spaces between the letters, indicating possible morphological boundaries. <br><br>"
					   +  "a. To mark a morphological boundary, click on the space where you think the boundary is using your mouse. <br><br> " 
					   +  "b. Once you've made your selection, click on the check button to see whether you've identified the boundaries correctly. <br><br>"
					   +  "c. If you've selected your boundaries correctly, the morphological categories of the word's components will automatically appear above the word."
					   +  "If you haven't, you will be given the opportunity to try again "
					   +  "(remember, after three tries, the program will provide the correct answer).";  
	showModal(INSTRUCTIONS, false);
}

//Draggable Elements
dragElement(document.getElementById("circle-with-text"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
