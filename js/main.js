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