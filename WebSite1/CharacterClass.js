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
function setCharacterType(characterType) {
    this.characterType = characterType;
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