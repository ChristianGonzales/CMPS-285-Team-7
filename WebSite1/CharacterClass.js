/*
    This javascript file is mainly for the character object, but also
    contains methods pertaining to the canvas and also the landscape
*/
var character = {
    characterName: "",
    characterType: "",
    HP: 100,
    mana: 100,
    attackDamage: 30,
    attackName: "",
    ultimateAttackDamage: 50,
    ultimateAttackName: ""
}
function setCharacterName(characterName) {
    this.characterName = characterName;
}
function getCharacterName() {
    return this.characterName;
}
function getCharacterType() {
    return this.characterType;
}
function setHP(HP) {
    this.HP = HP;
}
function getHP() {
    return this.HP;
}
function setMana(mana) {
    this.mana = mana;
}
function getMana() {
    return this.mana;
}
function setAttackDamage(attackDamge) {
    this.attackDamge = attackDamge;
}
function getAttackDamge() {
    return this.attackDamge;
}
function setAttackName(attackName) {
    this.attackName = attackName;
}
function getAttackName() {
    return this.attackName;
}
function setUltimateAttackDamage(ultimateAttackDamage) {
    this.ultimateAttackDamage = ultimateAttackDamage;
}
function getUltimateAttackDamage() {
    return this.ultimateAttackDamage;
}
function setUltimateAttackName(ultimateAttackName) {
    this.ultimateAttackName = ultimateAttackName;
}
function getUltimateAttackName() {
    return this.ultimateAttackName;
}
function createCanvas(characterType) {
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    var landscapeCanvas = document.getElementById("landscapeCanvas"); //Creates a canvas for our landscape
    var ctx = landscape.getContext("2d");

    var characterCanvas = document.getElementById("characterCanvas"); //Creates a canvas for our player
    var ctx = characterCanvas.getContext("2d");

    window.addeventlistener("resize", resizecanvas, false); //resize to fill browser window

    function resizeCanvas() {
        landscapeCanvas.width = window.innerWidth;
        landscapeCanvas.height = window.innerHeight;

        charactercanvas.width = window.innerwidth;
        charactercanvas.height = window.innerheight;

        /**
            * Your drawings need to be inside this function otherwise they will be reset when 
            * you resize the browser window and the canvas goes will be cleared.
       */

        createLandscape();
        createCharacter(characterType);
    }
    resizeCanvas();

    function createLandscape() {
        var mageCity = new Image("http://localhost:55331/WebSite1/mountain_landscape.png");
        ctx.drawImage(mageCity, landscape.width, landscape.height)
    }
    function createCharacter(characterType) {
        //Character sprite placeholders
        var characterSprite = new Image();
        //Sprite dimensions (Work in progress)
        var spriteWidth = 100,
            spriteHeight = 100,
            pixelsLeft = 170,
            pixelsTop = 10,
            //Where the sprite will be drawn
            canvasPosX = 20,
            canvasPosY = 20;
        if (characterType == 1) {
            characterSprite.src = "3_knight_.png";
            ctx.drawImage(characterSprite, spriteWidth, spriteHeight);
        }
    }

}