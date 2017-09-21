/*
    This javascript file is mainly for the character object, but also
    contains methods pertaining to the canvas and also the landscape
*/
function createCanvas(characterType) {
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    var gameCanvas = document.getElementById("gameCanvas"); //Creates a canvas for our player
    var ctx = gameCanvas.getContext("2d");

    resizeCanvas(characterType, ctx);

    window.addEventListener("resize", resizeCanvas(characterType, ctx), false); //resize to fill browser window
}
function resizeCanvas(characterType, ctx) {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    gameCanvas.style.display = "block";
    /**
        * Your drawings need to be inside this function otherwise they will be reset when 
        * you resize the browser window and the canvas goes will be cleared.
   */

    createLandscape(gameCanvas, ctx);
    createCharacter(characterType, gameCanvas, ctx);
}
function createLandscape(gameCanvas, ctx) {
    var mageCity = new Image("http://localhost:55331/WebSite1/magecity.png");
    mageCity.onload = function () {
        ctx.drawImage(mageCity, 0, 0, gameCanvas.width, gameCanvas.height)
    }
}
function createCharacter(characterType, gameCanvas, ctx) {
    //Character sprite placeholders
    var characterSprite = new Image();
    var xPos = 200;
    var yPos = 600;
    var spriteHeight = 150;
    var spriteWidth = 150;
    
    if (characterType == 1) {
        characterSprite.onload = function () {
            ctx.drawImage(characterSprite, xPos, yPos, spriteWidth, spriteHeight);
        }
        characterSprite.src = "http://localhost:55331/WebSite1/3_knight_.png";
    }
    else if(characterType == 2){
        characterSprite.onload = function () {
            ctx.drawImage(characterSprite, (xPos - 10), (yPos - 10), spriteWidth, spriteHeight);
        }
        characterSprite.src = "http://localhost:55331/WebSite1/WizardSprite/SCML/1/1_wizard_.png";
    }
    else {
        characterSprite.onload = function () {
            ctx.drawImage(characterSprite, (xPos - 10), (yPos - 10), spriteWidth, spriteHeight);
        }
        characterSprite.src = "http://localhost:55331/WebSite1/craftpix-392011-2d-fantasy-elf-free-sprite-sheets/_PNG/1/1_IDLE_000.png";
    }
}