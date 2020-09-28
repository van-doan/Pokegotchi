Concept Context

Name Inspo: 
Pokémon + Tamagotchi = "Pokégotchi"

Game Context:
Pokémon is a game inspired around fictional creatures that are captured and trained to battle for sport.
Each Pokémon are unique in terms of their elemental type, nature and abilities.
The mechanics of the game are to capture all Pokémon in the game and train them to reach their peak evolutions.
However, in Pokémon, they are essentially immortal no matter how many times they are defeated or "faint".

Tamagotchi is a toy/game incorporating digital pets.
When the toy is activated, the user waits for the egg to hatch their pet.
Similar to Pokémon, each pet has stages of evolution from being a baby, child, teenager and adult.
However, in Tamagotchi, poor care can lead to the pet's death.
If you're a good person, you don't want this to happen.

Taking the concept of Pokémon's unique qualities and aesthetic, we combine the concepts with the functionality/mechanics of Tamagotchi.
Instead of the egg hatching sequence that typically happens with Tamagotchi toys, this game will incorporate Pokémon's concept of choosing one of 3 sprites.
Pokémon generally carries a theme for each version (culture/religion/hope/genetics/dinosaurs). The theme for this game will be "post-apocalyptic"
The goal of the game is to keep your Pokégotchi alive since they're really all you have... 


Interface Inspo: 
For this project, we are incorporating Pokémon's earlier versions of their load screen as the landing page.
For the in-game interface, the GameBoy Color's structural design will serve as the main user interface. 
All art besides the background images in the landing page and in-game interface are original and created by me. 

Game Mechanics:
    - User input for own name
    - User input for pet name
    - In-game timer which influences:
        Hunger scale (loses 1 every 2 seconds)
        Fatigue (in place of sleepiness) scale (loses 1 every 2 seconds)
        Happiness (in place of boredom) scale (loses 1 every 2 seconds)
        Level (in place of age) starts at 0
    - Key down functions for feeding, switching lights on and off, caring for the pet and moving sprite from left to right
    - The pet will die if hunger, boredom, or sleepiness reaches 0.
    - Experience level will be incorporated. 
        * Collecting 1 rare candy = +1 level
        * Level 16 = first evolution 
        * Level 36 = final evolution 
    - "Rare candies" will appear in random positions every 5 seconds once the game starts.
        * If rare candy is consumed (touched) by the sprite, they level up.

Dialogue Pieces (for my own reference):

*Landing Page*
It's year 2120.
All there's left is you...
... and the creatures that survived.

*Game Initiation*
It's been so long, I've forgotten who I am... What's my name?
Ah that's right, my name is (user.name). I remember having a companion... Which one of these creatures are mine?
Ah yes! I remember {sprite.class} was my companion. Hmm, what did I call you?
Well, (user.input), I guess it's just me and you. Don't worry, I'll do everything I can to make sure we survive.

User Journey:
Landing Page
1a. The game will start with the landing page which will consist of a short typewritten message to establish the theme of the game.
1b. After the message is finished being typed on screen, the landing page section will reveal a start game screen where the user can press the space button to start the game.
1c. When the space bar is clicked, the screen will fade out with full opacity to reveal the Game Initiation part of the game.

Naming Prompts
2a. The first prompt will ask for the user's name. 
2b. Once their name is entered, their name will be stored and then will be prompted to choose their pet.
2c. Once the pet is chosen, they will be prompted to name their pet.
2d. After the pet is named, the last piece of dialogue will be typed out and the game initiation screen will fade out to reveal the game console screen

In-game Functionality
3a. The game console screen will reveal images of the keys that will need to be used for the game in addition to a rules button to guide the user on how to play. 
3b. When the user is ready to start, they simply have to press the start game button located in the center of the game screen.
3c. Once the button is pressed, the game (& its timer) will start. The user will notice critical components decreasing every 2 seconds. It is up to the user to ensure this bar doesn't reach 0.
3d. The user will notice some details of the sprite as the game goes on.   
    i. When the pet dies, their eyes will be "x'ed" out. (= 0)
    ii. When they are fed and cared for their expression will be happy. (>= 7)
    iii. When the pet is content, their expression will be its standard image. (>= 1 && <= 7)
    v. When the pet reaches level 16, the pet will evolve into its second evolution. When the pet reaches level 36, they will evolve into their final evolution.

4. The game will last as long as the pet lives and the experience level is infinite. If the pet dies, the game is over and will be directed to a "result page" where the user is notified that they've lost and can choose to play again.

