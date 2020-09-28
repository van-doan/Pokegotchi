//**************************//
// Functions for Preload Id //
//**************************//

// Function to fade out parent div's
function fadeOut (elementId) {
    const element = document.getElementById(elementId);
    element.classList.add("fadeOut");
}

const text = ["It's year 2120.", "All there's left is you...", "... and the creatures that survived."];

// We want the displayIntroText first - when it's completed, the preload-finish is added fading out preload screen
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
async function renderIntroLine(text, index) {
    for (let i=0; i <= text.length; i++) {
        let elementId = `intro-text${index + 1}`
        document.getElementById(elementId).innerHTML = text.slice(0, i);
        await sleep(100);
    }
}   

async function renderIntroTexts () { 
    for (let i = 0; i < text.length; i++) {
        await renderIntroLine(text[i], i);
        await sleep(2000); 
    }
    await sleep(1000); 
    // Anytime we want to fade out, all we need to do is call this function with the parent ID
    fadeOut("preload");
}

let hasPassedLandingPage = false

$(document).keydown(function (e) {
    if (e.keyCode === 32 && !hasPassedLandingPage) {
        hasPassedLandingPage = true;
        fadeOut("landingpage");
        showFirstInputOption();
    }
})

//**************************//
//Functions for Game Init Id//
//**************************//

// The idea here is to:
// Start with first index printed with an async function
// Another async function following to wait for the first index to be printed before showing input box.
// * remember to store the user's input to be used throughout
// Another async function that removes previous text and prints second index of text after input value is given
// Since the user input will be stored and sprite information will be needed, let's go ahead and make a class for each, too.

// Player Class
class Player {
    constructor(){
    }
    changePlayerName(name) {
        this.name = name;
    }
    chooseSprite(sprite) {
        this.sprite = sprite;
    }
}

// Creature Class

class Sprite {
    constructor (classification){
        this.classification = classification;
        this.happiness = 10;
        this.energy = 10;
        this.hunger = 10;
        this.level = 0;
    };
    isHappy(){
        return this.energy >= 7 && this.hunger >= 7 && this.happiness >= 7;
    ;}
    isStandard(){
        return this.energy >= 1 && this.energy <= 7 || this.hunger >= 1 && this.hunger <= 7 || this.happiness >= 1 && this.happiness <= 7;
    };
    isDead () {
        return this.energy === 0 || this.hunger === 0 || this.happiness === 0;
    };
    isReadyToEvolveToFirstEvolution () {
        return this.level >= 16;
    };
    firstEvolutionIsDead() {
        return this.level >= 16 && (this.energy === 0 || this.hunger === 0 || this.happiness === 0);
    };
    firstEvolutionIsHappy() {
        return this.level >= 16 && (this.energy >= 7 || this.hunger >= 7 || this.happiness >= 7);
    };
    isReadyToEvolveToSecondEvolution () {
        return this.level >= 36;
    };
}

//Creating Dialogue for Player

let player = new Player();
// Dialogue Text - 0
const getUserNameDialogue = "It's been so long, I've forgotten who I am... What's my name?"
// We create a function here for player name so that the string changes dynamically.
//1
const chooseSpriteDialogue = (playername) => {
   return `Ah that's right, my name is ${playername}. I remember having a companion... Which one of these creatures are mine?`
};

// Dialogue Text - 2
const getSpriteNameDialogue = (spriteclass) => {
    return `Ah yes! I remember ${spriteclass} was my companion. Hmm, what did I call you?`
};
// Dialogue Text - 3 
const endDialogue = (spritename) => {
   return `Well, ${spritename}, I guess it's just me and you. Don't worry, I'll do everything I can to make sure we survive.`
}
// Dialogue Page 2 Buttons
const firstInputButton = document.getElementById('btnInput1');
const firstInputBox = document.getElementById("input1");
// Dialogue Page 2 Buttons
const secondInputBox = document.getElementById("input2");
const fifthInputButton = document.getElementById('btnInput5');

// Game Buttons
const startGameBtn = document.getElementById('startBtn');
const rulesTxt = document.getElementById("rules-text");
const rulesBtn = document.getElementById("game-rules-btn");

function activateRulesBtn () {
    $('#game-rules-btn').click(function(){
        $('#rules-text').toggle('slow');
});
}    

function removeFirstInput () {
    firstInputBox.style.visibility = "hidden";
    firstInputButton.style.visibility = "hidden";
}

function removeSecondInput () {
    secondInputBox.style.visibility = "hidden";
    fifthInputButton.style.visibility = "hidden";
}

function removeStartButton () {
    startGameBtn.style.visibility = "hidden";
}

function removeDialogue (id) {
    document.getElementById(id).remove();
}

// Dialogue Seq

async function showFirstInputOption () {
    await renderInputDialogue(getUserNameDialogue, 0); 
    await sleep (700);
        firstInputBox.style.visibility = "visible";
        firstInputButton.style.visibility = "visible";
        firstInputButton.addEventListener('click', () =>  {
            let name = firstInputBox.value;
            player.changePlayerName(name);
            removeFirstInput();
            removeDialogue("game-init-msg1");
            renderInputDialogue(chooseSpriteDialogue(name), 1);
            showChooseSpriteOption();
        });
}

// Changing funciton name/changing selector for string/changing elementID/change selector for string that's being sliced
async function renderInputDialogue (dialogue, index) {
    for (let i=0; i <= dialogue.length; i++) {
        let elementId = `game-init-msg${index + 1}`;
        document.getElementById(elementId).innerHTML = dialogue.slice(0, i);
        await sleep(100);
    }
}
// Creating array to iterate over for spriteBtn choice with simple classes for dialogue reurn
let spriteDivs = [2, 3, 4];
const spriteClasses = {
    2: "Embeak",
    3: "Droop",
    4: "Geopup"
}
//Taking sprite divs array and checking DOM elements and removing other divs that aren't selected.
function removeSprites (id) {
    for (let i = 0; i < spriteDivs.length; i++) {
        if (id !== spriteDivs[i]) {
            let spriteId = `btnInput${spriteDivs[i]}`
            document.getElementById(spriteId).remove();
        }
    }
}

async function showChooseSpriteOption () {
    for (let i = 0; i < spriteDivs.length; i++) {
        let spriteId = `btnInput${spriteDivs[i]}`
        let sprite = document.getElementById(spriteId);
        let secondInputBox = document.getElementById('input2');
        sprite.style.visibility = "visible";
        await sleep (100);
        sprite.addEventListener('click', () =>  {
            removeDialogue("game-init-msg2");
            removeSprites(spriteDivs[i]);
            player.chooseSprite(new Sprite(spriteClasses[spriteDivs[i]]));
            renderInputDialogue(getSpriteNameDialogue(player.sprite.classification), 2);
                secondInputBox.style.visibility = "visible";
                fifthInputButton.style.visibility = "visible";

        fifthInputButton.addEventListener('click', async () =>  {
            let spriteName = secondInputBox.value;
            player.sprite.name = spriteName;    
            secondInputBox.style.visibility = "hidden";
                fifthInputButton.style.visibility = "hidden";
                rulesBtn.style.visibility = "visible";
                removeDialogue("game-init-msg3");
                renderInputDialogue(endDialogue(player.sprite.name), 3);
                removeSecondInput();
                await sleep(15000);
                fadeOut("game-initiation");
                appendChosenSpriteInGame();
                activateRulesBtn();
            });    
        });
    } 
}