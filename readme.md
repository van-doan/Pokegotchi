## What is Pokégotchi?
**Pokégotchi** is a spin-off concept of Pokémon and Tamagotchi. Play the game [here.](http://pokegotchi-app.herokuapp.com)

## What's the User Journey like?
### Game Introduction
The game will start with the landing page which will consist of a short typewritten message to establish the theme of the game.
After the message is finished being typed on screen, the landing page section will reveal a start game screen where the user can press the space button to start the game.
When the space bar is clicked, the screen will fade out with full opacity to reveal the Game Initiation part of the game.
### Game Dialogue sequence

The first prompt will ask for the user's name.
Once their name is entered, their name will be stored and then will be prompted to choose their pet.
Once the pet is chosen, they will be prompted to name their pet.
After the pet is named, the last piece of dialogue will be typed out and the game initiation screen will fade out to reveal the game console screen

### In-game Functionality
The game console screen will reveal images of the keys that will need to be used for the game in addition to a rules button to guide the user on how to play.
When the user is ready to start, they simply have to press the start game button located in the center of the game screen.
Once the button is pressed, the game (& its timer) will start. The user will notice critical components decreasing every 2 seconds. It is up to the user to ensure this bar doesn't reach 0.
The user will notice some details of the sprite as the game goes on.
i. When the pet dies, their eyes will be "x'ed" out. (= 0) ii. When they are fed and cared for their expression will be happy. (>= 7) iii. When the pet is content, their expression will be its standard image. (>= 1 && <= 7) v. When the pet reaches level 16, the pet will evolve into its second evolution. When the pet reaches level 36, they will evolve into their final evolution.

### Game End
The game will last as long as the pet lives and the experience level is infinite. If the pet dies, the game is over and will be directed to a "result page" where the user is notified that they've lost and can choose to play again.
List of Game Mechanics & Details
 User input for own name
 User input for pet name
 In-game timer which influences:
   1. Hunger scale (loses 1 every 2 seconds) 
   2. Fatigue (in place of sleepiness) scale (loses 1 every 2 seconds)
   3. Happiness (in place of boredom) scale (loses 1 every 2 seconds)
   4. Level (in place of age) starts at 0
Key down functions for feeding, caring for the pet and moving sprite from left to right
The pet will die if hunger, boredom, or sleepiness reaches 0.
Experience level will be incorporated. 
  1. Collecting 1 rare candy = +1 level
  2. Level 16 = first evolution 
  3. Level 36 = final evolution 
"Rare candies" will appear in random positions every 5 seconds once the game starts.
 If rare candy is consumed (touched) by the sprite, they level up.

## Wireframe of Project
https://imgur.com/a/9K7o9Y4

## Future Developments for unsolved problems
1. Include sound for preload page, landing page, tone after each button in dialogue sequence is pressed, tones when Pokemon eats a rare candy (level up sound), and add game music
2. Implement functionality to make the background to seem like it extends further than the constrained div width
3. The current app is not responsive - for future developments, I’d like to add DOM breakpoints so any viewport size can access the game.
4. I had trouble adding animations for added img srcs therefore would like to spend more time in the future implementing this.

## Borrowed Art Credentials
Preload Screen Background - Dystopian Background - https://www.deviantart.com/yoshift/art/Landscape-destroy-pixel-art-677482675
Game Background - Industrial Background - http://pixeljoint.com/pixelart/45041.htm
