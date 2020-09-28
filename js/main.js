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

//**************************//
//   Main Game Functions    //
//**************************//

function appendChosenSpriteInGame () {
    let gameContainer = document.getElementById("game-screen");
    let chosenSpriteClass = player.sprite.classification;
    let chosenSprite = document.createElement('img');
    chosenSprite.id = "movingSprite";
        startGameBtn.addEventListener('click', async () =>  {
            if (chosenSpriteClass === 'Embeak') {
                chosenSprite.src = './images/embeak-standard.png';
                chosenSprite.classList.add('embeak');
                gameContainer.append(chosenSprite);
        }
            if (chosenSpriteClass === 'Droop') {
                chosenSprite.src = './images/droop-standard.png';
                chosenSprite.classList.add('droop');
                gameContainer.append(chosenSprite);
        }
            if (chosenSpriteClass === 'Geopup') {
                chosenSprite.src = './images/geopup-standard.png';
                chosenSprite.classList.add('geopup');
                gameContainer.append(chosenSprite);
        }
        $(document).keydown(function(e){
            var position = $("#movingSprite").position();
            switch (e.key){
                case 'ArrowLeft': //left
                if (constrainSpriteMovement(position.left - 20) === true) {
                    $("#movingSprite").css('left', position.left - 20 + 'px');
                    checkCandyOverlap(position.left - 20);
                    }   
                    break;
                case 'ArrowRight': //right
                if (constrainSpriteMovement(position.left + 20) === true) {
                    $("#movingSprite").css('left', position.left + 20 + 'px');
                    checkCandyOverlap(position.left + 20);
                    }
                    break;
                case 'a': //key A
                if (player.sprite.happiness < 10) {
                    player.sprite.happiness += 1;
                    renderCriticalComponents();
                }
                    break;
                case 's': //key S
                if (player.sprite.energy < 10) {
                    player.sprite.energy += 1;
                    renderCriticalComponents();
                }   
                    break;
                case 'd': //key D
                    if (player.sprite.hunger < 10) {
                    player.sprite.hunger += 1;
                    renderCriticalComponents();
                    }      
                    break;           
            }
        });
        removeStartButton();
        renderCriticalComponents();
        timerSetup();
        setInterval(generateRareCandy, 5000);
    });
}

// Constraining sprite movement so it doesn't move further than div width
function constrainSpriteMovement (spritePosition) {
    let screenDiv = document.getElementById("game-screen");
    let elementWidth = screenDiv.offsetWidth - 60;
    let min = 0;
    let max = elementWidth;
        if (spritePosition >= min && spritePosition <= max) {
            return true;
        } else {
            return false;
        }
}
 

//Rendering the Amount of Critical Components based on Sprite Class Stats
function renderCriticalComponents () {
    let parent = document.getElementById("level-container");
        renderCriticalComponent (player.sprite.happiness, "happiness-components", './images/project0-heart.png');
        renderCriticalComponent (player.sprite.energy, "energy-components", './images/electric-bolt.png');
        renderCriticalComponent (player.sprite.hunger, "food-components", './images/drum-stick.png');
        let spriteLevel = document.createElement('div').innerHTML = player.sprite.level;
        spriteLevel.id = "level";
        if (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        };
            parent.append(spriteLevel);
}
//A dryer version instead of listing every single class with its respective sources
function renderCriticalComponent (num, elementId, src) {
    let parent = document.getElementById(elementId);
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    };
    for (let i = 0; i < num; i++) {
        let element = document.createElement('img');
        element.src = src;
        parent.append(element);
    }
}

// // In-game Timer
let time = 0
let points = 0;
const timerSetup = () => {
    const timer = setInterval(() => {
    if (player.sprite.energy === 0 || player.sprite.hunger === 0 || player.sprite.happiness === 0 || player.sprite.energy === 0) {
        fadeOut("game");
    } else {
        player.sprite.energy -= 1;
        player.sprite.hunger -= 1;
        player.sprite.happiness -= 1;
    }
        renderCriticalComponents();
        changingSpriteExpression(player.sprite.classification);
    }, 2000)
};

// Change Sprite Expression based on sprite stat (num); we'll need to know their id; we'll need to include in ability to pass the correct source
function changingSpriteExpression (spriteclass) {
    let spriteElement = document.getElementById("movingSprite");
    if (player.sprite.isDead()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-dead.png";
        spriteElement.src = src;
    }
    if (player.sprite.isStandard()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-standard.png";
        spriteElement.src = src;
    }
    if (player.sprite.isHappy()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-happy.png";
        spriteElement.src = src;
    }
    if (player.sprite.isReadyToEvolveToFirstEvolution()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-evolution1.png";
        spriteElement.src = src;
        spriteElement.style.bottom = 50 + "px";
    }
    if (player.sprite.firstEvolutionIsDead()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-evolution1-dead.png";
        spriteElement.src = src;
        spriteElement.style.bottom = 50 + "px";
    }
    if (player.sprite.firstEvolutionIsHappy()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-evolution1-happy.png";
        spriteElement.src = src;
        spriteElement.style.bottom = 50 + "px";
    }
    if (player.sprite.isReadyToEvolveToSecondEvolution()) {
        let src = "./images/" + spriteclass.toLowerCase() + "-evolution2.png";
        spriteElement.src = src;
        spriteElement.style.bottom = 50 + "px";
    }
};

// Rare Candy Pick-up Functionality
// The idea is to drop candies in random places along the game screen div
const candyPositions = {}
function generateRareCandy () {
    let gameScreen = document.getElementById("game-screen");
    let gameScreenWidth = gameScreen.offsetWidth - 60;
    // Establishing the range 
    let randomPosition = Math.floor(Math.random () * gameScreenWidth) + 1;

    let rareCandy = document.createElement('img');
        rareCandy.src = "./images/rare-candy.png";
        rareCandy.classList.add("rareCandy");
        rareCandy.style.left = randomPosition + "px";
        gameScreen.append(rareCandy);
            // this will allow us to know where the candy positions are
        candyPositions[randomPosition] = rareCandy;
    }

function checkCandyOverlap (position) {
    // from the center of our sprite, we want to check 50 from its left & right.
    let selectedSprite = document.getElementById("movingSprite");
    let spriteWidth = selectedSprite.clientWidth
    let min = position - (spriteWidth/2)
    let max = position + (spriteWidth/2)

        //iterating over all of the candyPositions to check if they've touched our sprite
        // everytime we move the sprite, we want to see if they're within our min and max
        // if they are, we'll delete them.
        for (let key in candyPositions) {
            if (key > min && key < max) {
                //Removing the rare candy from DOM
                candyPositions[key].remove();
                // Deletes it from our object so it doesn't keep checking for the candyPostion[key]
                delete candyPositions[key];
                player.sprite.level++;
            }
        }
}

// Rendering introduction dialogue
renderIntroTexts();