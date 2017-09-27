/*
    This javascript file is mainly for the character object, but also
    contains methods pertaining to the canvas and also the landscape
*/
var player = {
    characterSprite = new Image(),
    spriteHeight = 150,
    spriteWidth = 150,
    playerPosX = 200,
    playerPosY = 600,
    playerSpeedX = 0,
    playerSpeedY = 0,
    darwingUpdate = function () {
        ctx.drawImage(player.characterSprite, player.xPos, player.yPos, player.spriteWidth, player.spriteHeight);

    },
    newPosition = function () {
        playerPosX += playerSpeedX;
        playerPosY += playerSpeedY;

    }

};
function createCanvas(characterType) {
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    var gameCanvas = document.getElementById("gameCanvas"); //Creates a canvas for our player
    var ctx = gameCanvas.getContext("2d");

    resizeCanvas(characterType, ctx);

    window.addEventListener("resize", resizeCanvas(characterType, ctx), false); //resize to fill browser window
    return gameCanvas, ctx;
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
    if (characterType == 1) {
        player.characterSprite.onload = function () {
            ctx.drawImage(player.characterSprite, player.xPos, player.yPos, player.spriteWidth, player.spriteHeight);
        }
        player.characterSprite.src = "../WebSite1/TankSprite/__SCML/3_KNIGHT/3_knight_.png";
    }
    else if(characterType == 2){
        player.characterSprite.onload = function () {
            ctx.drawImage(player.characterSprite, (player.xPos - 10), (player.yPos - 10), player.spriteWidth, player.spriteHeight);
        }
        player.characterSprite.src = "../WebSite1/WizardSprite/SCML/1/1_wizard_.png";
    }
    else {
        player.characterSprite.onload = function () {
            ctx.drawImage(player.characterSprite, (player.xPos - 10), (player.yPos - 10), player.spriteWidth, player.spriteHeight);
        }
        player.characterSprite.src = "../WebSite1/ElfSprite/_PNG/1/1_IDLE_000.png";
    }
}
function updateGameCanvas() {
    gameCanvas.clear();
    player.newPosition();
    player.darwingUpdate();
}
function moveUp() {
    player.playerSpeedY -= 1;
}
function moveDown() {
    player.palyerSpeedY += 1;
}
function moveLeft() {
    player.playerSpeedX -= 1;
}
function moveRight() {
    player.playerSpeedY += 1;
}
function stopMoving() {
    player.playerSpeedX = 0;
    player.playerSpeedY = 0;
}