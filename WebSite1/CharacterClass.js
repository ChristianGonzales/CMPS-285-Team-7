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

    createLandscape(ctx);
    createCharacter(characterType, ctx);
}
function createLandscape(ctx) {
    var mageCity = new Image("http://localhost:55331/WebSite1/magecity.png");
    mageCity.onload = function () {
        ctx.drawImage(mageCity, gameCanvas.width, gameCanvas.height)
    }
}
function createCharacter(characterType, ctx) {
    //Character sprite placeholders
    var characterSprite = new Image();
    
    if (characterType == 1) {
        characterSprite.onload = function () {
            ctx.drawImage(characterSprite, characterSprite.width, characterSprite.height);
        }
        characterSprite.src = "http://localhost:55331/WebSite1/3_knight_resized.png";
    }
}