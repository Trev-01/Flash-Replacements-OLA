var result = "";
let mainList = document.getElementById('main-list-wrapper');


document.querySelector('.list-wrapper').addEventListener('click', function() {
    this.querySelector('.list-select').classList.toggle('open');
});

for (const option of document.querySelectorAll(".choice")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.choice.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.list-select').querySelector('.list-box span').textContent = this.textContent;
            result = this.getAttribute('data-value');
            document.getElementById('tester').textContent = result;
        }
    });
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('.list-select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});


document.querySelector('.placeholder').style.pointerEvents = 'none';


function demo(dropdown) {
    //Open up the list box, select Noun
// How to handle click event interference on the <div> element?

    dropdown.querySelector('.list-select').classList.toggle('open');
    const options = dropdown.getElementsByClassName('choice');
    for (const option of options) {
        option.focus();

        if (option.dataset.value == "Noun") {
            option.parentNode.querySelector('.choice.selected').classList.remove('selected');
            option.classList.add('selected');
            option.closest('.list-select').querySelector('.list-box span').textContent = option.textContent;

            result =  option.getAttribute('data-value');
            document.getElementById('tester').textContent = result;
            break;
        }
    }
}

/*
1. Open the dropdown
2. Select the correct lexical category for the example word (Noun, Verb, Preposition)
3. Selection is done in order; that is, each item before is scrolled down by, highlighted and not skipped.
4. Close the dropdown
5. Repeat for the other two dropdowns. 
*/

//Delay animation 
window.onload = function() {
    /*window.setTimeout(function() {
        demo()}, 1500);*/
    openAndPick(mainList, 1000);

    /*window.setTimeout(function() {
            document.querySelector('.list-select').classList.toggle('open');
    }, 500);*/
    waitAndLock(mainList, 250);
}

let openAndPick = (list, interval) => window.setTimeout(function() { demo(list); }, interval);
let waitAndLock = (list, interval) => window.setTimeout(function() { list.querySelector('.list-select').classList.toggle('open') }, interval);

/*
function waitAndLock(interval) {
    window.setTimeout(function() { document.querySelector('.list-select').classList.toggle('open') }, interval);
}*/