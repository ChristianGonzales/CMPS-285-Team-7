﻿var character = {
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
function createCharacter(characterType) {
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";
    var characterCanvas = document.getElementById("characterCanvas");
    var ctx = characterCanvas.getContext("2d");
    
    characterCanvas.width = window.innerWidth;
    characterCanvas.height = window.innerHeight;
    //Character sprite placeholders
    var tankSprite = new Image();
    //var wizardSprite = new Image();
    //var elfSprite = new Image();
    //Sprite dimensions (Work in progress)
    var spriteWidth = 100,
        spriteHeight = 100,
        pixelsLeft = 170,
        pixelsTop = 10,
        //Where the sprite will be drawn
        canvasPosX = 20,
        canvasPosY = 20;
    //window.addEventListener("resize", resizeCanvas, false); //resize to fill browser window

    //function resizeCanvas() {
    //    characterCanvas.width = window.innerWidth;
    //    characterCanvas.height = window.innerHeight;
    //}

    if (characterType == 1) {
        //tankSprite.src = "3_knight_.png";
        ctx.rect(20, 20, 150, 100);
        ctx.stroke();
        ctx.drawImage("3_knight_.png", 50, 50);
        //ctx.drawImage("craftpix - 062999- 2d- fantasy - knight - free - sprite - sheets / _PNG / 3_KNIGHT/ _IDLE / _IDLE_000.png", pixelsLeft, pixelsTop, spriteWidth, spriteHeight, canvasPosX, canvasPosY);
    }
}