//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function Character(ctx, characterType, xPos, yPos, isEnemy, isTeamMate) {
    this.characterType = characterType;
    this.HP = 200;
    this.attackDamge = 15;
    this.width = 100;
    this.height = 100;
    this.movementSpeed = 5;
    this.xPos = xPos;
    this.yPos = yPos;
    this.winCount = 0;
    this.isEnemy = isEnemy;
    this.isTeamMate = isTeamMate;
    this.isMoving = false;
    this.inBattle = false;
    this.isAttacking = false;
    this.drawCharacter = function (characterType) {
        if (characterType == "knight") {
            ctx.beginPath();
            ctx.fillStyle = "navy";
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.closePath();
        }
        else if (characterType == "wizard") {
            ctx.beginPath();
            ctx.fillStyle = "purple";
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.closePath();
        }
        else if (characterType == "elf") {
            ctx.beginPath();
            ctx.fillStyle = "olive";
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.closePath();
        }
        else if (characterType == "enemy") {
            ctx.beginPath();
            ctx.fillStyle = "brown";
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.closePath(); 
        }
        else if (characterType == "enemy_damage") {
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.closePath();
        }
        else if (characterType == "boss") {
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.fillRect(this.xPos, this.yPos, this.width +50, this.height + 50);
            ctx.closePath();
        }
    }
}

function startGame(characterType) {
    //Hides the start screen once canvas gets created
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //Game objects
    var player = new Character(ctx, characterType, 200, (canvas.height / 2), false, false);
    var enemy = new Character(ctx, "enemy", 500, Math.random() * canvas.height, true, false);
    var boss = new Character(ctx, "boss", 500, (canvas.height / 4), true, false);
    //Team based combat variables
    var teamMate1;
    var teamMate2;
    var playerTeam = [];
    var enemy2;
    var enemy3;
    var enemyTeam = [];
    //Switches
    var attackChosen = 0;
    var playersTurn = true;
    var hasAttacked = false;
    //Key handlersS
    var key = {
        _pressed: {},
        UP: 87, //W
        DOWN: 83, //S
        LEFT: 65, //A
        RIGHT: 68, //D
        BATTLE: 69, //E
        ATTACK: 81, //Q
        HEAL: 82, //R
        CONTINUE: 70, //F
        ONE: 49, //1
        TWO: 50, //2
        THREE: 51, //3
        isDown: function (keyCode) {
            return this._pressed[keyCode];
        },
        onKeydown: function (event) {
            this._pressed[event.keyCode] = true;
        },
        onKeyup: function (event) {
            delete this._pressed[event.keyCode];
        }
    };
    //Other variables
    var enemySelector = 0;
    var lastTime = Date.now();
    var objective = {
        currentObjective: "",
        getObjective: function () {
            this.currentObjective = "Strap up and get into your first fight!";
            return this.currentObjective;
        },
        drawObjective: function (currentObjective) {
            ctx.font = "36px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.strokeStyle = "black";
            ctx.fillStyle = "gold";
            ctx.fillText(this.currentObjective, 0, 0);
        }
    };
    var healthBar = {
        color: "black",
        barText: "white",
        knightColor: "navy",
        wizardColor: "purple",
        elfColor: "olive",
        enemyColor: "red",
        width: 200,
        height: 40,
        font: " bold 36px Helvetica",
        drawHealthBar: function (characterType) {
            if (characterType == "knight") {
                teamMateOneName = "Wizard:";
                teamMateTwoName = "Elf:";
                playerColor = "navy";
                teamMateOneColor = "purple";
                teamMateTwoColor = "olive";
            }
            else if (characterType == "wizard") {
                teamMateOneName = "Knight:";
                teamMateTwoName = "Elf:";
                playerColor = "purple";
                teamMateOneColor = "navy";
                teamMateTwoColor = "olive";
            }
            else if (characterType == "elf") {
                teamMateOneName = "Wizard:";
                teamMateTwoName = "Knight:";
                playerColor = "olive";
                teamMateOneColor = "purple";
                teamMateTwoColor = "navy";
            }
            ctx.beginPath();
            ctx.font = this.font;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.fillText("Player: ", 170, 85);
            ctx.fillText(teamMateOneName, 170, 235);
            ctx.fillText(teamMateTwoName, 170, 385);
            ctx.fillRect(170, 135, this.width, this.height);
            ctx.fillRect(170, 285, this.width, this.height);
            ctx.fillRect(170, 435, this.width, this.height);
            ctx.fillStyle = playerColor;
            ctx.fillRect(170, 135, player.HP, this.height);
            ctx.fillStyle = teamMateOneColor;
            ctx.fillRect(170, 285, teamMate1.HP, this.height);
            ctx.fillStyle = teamMateTwoColor;
            ctx.fillRect(170, 435, teamMate2.HP, this.height);
            ctx.font = this.font;
            ctx.textAlign = "middle";
            ctx.textBaseline = "top";
            ctx.strokeStyle = this.barText;
            ctx.fillStyle = this.barText;
            ctx.fillText(player.HP.toString(), 140 + this.width / 2, 135);     //abc
            ctx.fillText(teamMate1.HP.toString(), 140 + this.width / 2, 285);     //abc
            ctx.fillText(teamMate2.HP.toString(), 140 + this.width / 2, 435);     //abc
            ctx.closePath();
        }
    };
    var enemyHealthBar = {
        color: "black",
        barText: "white",
        enemyColor: "red",
        width: 200,
        height: 40,
        font: " bold 36px Helvetica",
        drawHealthBar: function (enemy) {
            ctx.beginPath();
            ctx.font = this.font;
            ctx.textAlign = "right";
            ctx.textBaseline = "top";
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.fillText("Enemy 1: ", 1050, 85);
            ctx.fillText("Enemy 2: ", 1050, 235);
            ctx.fillText("Enemy 3: ", 1050, 385);
            ctx.fillRect(880, 135, this.width, this.height);
            ctx.fillRect(880, 285, this.width, this.height);
            ctx.fillRect(880, 435, this.width, this.height);
            ctx.fillStyle = this.enemyColor;
            ctx.fillRect(880, 135, enemy.HP, this.height);
            ctx.fillRect(880, 285, enemy2.HP, this.height);
            ctx.fillRect(880, 435, enemy3.HP, this.height);
            ctx.font = this.font;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.strokeStyle = this.barText;
            ctx.fillStyle = this.barText;
            ctx.fillText(enemy.HP.toString(), 840 + this.width / 2, 135);
            ctx.fillText(enemy2.HP.toString(), 840 + this.width / 2, 285);
            ctx.fillText(enemy3.HP.toString(), 840 + this.width / 2, 435);
            ctx.closePath();
        }
    };
    //Timeout Variables
    var timeoutID;

    //For multiple browsers Chrome, FireFox, Explorer
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    //Event listeners
    window.addEventListener("keydown", function (event) { key.onKeydown(event); }, false);
    window.addEventListener("keyup", function (event) { key.onKeyup(event); }, false);

    //Change canvas width and height to whole screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas); //Makes it to where the canvas is apart of the HTML body

    //Create Team for combat
    var createPlayerTeam = function (characterType) {
        if (characterType == "knight") {
            teamMate1 = new Character(ctx, "wizard", 400, 235, false, true);
            teamMate2 = new Character(ctx, "elf", 400, 385, false, true);
        }
        else if (characterType == "wizard") {
            teamMate1 = new Character(ctx, "knight", 400, 235, false, true);
            teamMate2 = new Character(ctx, "elf", 400, 385, false, true);
        }
        else if (characterType == "elf") {
            teamMate1 = new Character(ctx, "wizard", 400, 235, false, true);
            teamMate2 = new Character(ctx, "knight", 400, 385, false, true);
        }

        //Adding character objects to array
        playerTeam[0] = player;
        playerTeam[1] = teamMate1;
        playerTeam[2] = teamMate2;
    }

    //Create team for enemy. (Had to make one for the enemy since I could not figure out how to implement in one method)
    var createEnemyTeam = function (characterType) {
        if (characterType == "enemy") {
            enemy2 = new Character(ctx, "enemy", 750, 235, true, true);
            enemy3 = new Character(ctx, "enemy", 750, 385, true, true);
        }

        //Add enemies into array
        enemyTeam[0] = enemy;
        enemyTeam[1] = enemy2;
        enemyTeam[2] = enemy3;
    }
    //When everything gets redrawn on canvas
    var update = function () {
        var rightSide = canvas.width;
        var leftSide = canvas.width - canvas.width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resize();
        if (!(player.inBattle)) { //Haults player movement after colliding with enemy
            if (key.isDown(key.UP)) {
                player.yPos -= player.movementSpeed;
                player.isMoving = true;
            }
            if (key.isDown(key.LEFT)) {
                player.xPos -= player.movementSpeed;
                player.isMoving = true;
            }
            if (key.isDown(key.DOWN)) {
                player.yPos += player.movementSpeed;
                player.isMoving = true;
            }
            if (key.isDown(key.RIGHT)) {
                player.xPos += player.movementSpeed;
                player.isMoving = true;
            }
            if ((player.xPos == (enemy.xPos - enemy.width)) && (player.winCount == 0)) {
                player.inBattle = true
            }
            if ((player.xPos == (boss.xPos - enemy.width)) && (player.winCount == 1)) {
                player.inBattle = true 
            }
        }
        //Collision detection
        if (player.isMoving) {
            if (player.xPos <= leftSide) {
                player.xPos = leftSide;
            }
            if (player.xPos + player.width >= canvas.width) {
                player.xPos = canvas.width - player.width;
            }
            if (player.yPos <= 0) {
                player.yPos = 0;
            }
            if (player.yPos + player.height >= canvas.height) {
                player.yPos = canvas.height - player.height;
            }
        }
        //Battle settings
        if (player.inBattle) {
            player.xPos = 400;
            player.yPos = 85;
            enemy.xPos = 750;
            enemy.yPos = 85;
            createPlayerTeam(player.characterType);
            createEnemyTeam(enemy.characterType);
            battle.combatStart();
        }
    }
    //Reszie canvas to broswer no matter what
    var resize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    //Drawing everything
    var render = function () {
        //Draw objective if not in battle
        if (!(player.inBattle)) {
            objective.currentObjective = objective.getObjective();
            objective.drawObjective(objective.currentObjective);
        }

        player.drawCharacter(characterType);
        if (player.winCount == 0) {
            enemy.drawCharacter(enemy.characterType);
        }
        if ((player.winCount == 1) && !(player.inBattle)) {
            boss.drawCharacter(boss.characterType)
        }
        if (player.inBattle) {
            //Draw player teammates
            teamMate1.drawCharacter(teamMate1.characterType);
            teamMate2.drawCharacter(teamMate2.characterType);

            //Draw enemy teammates
            if (player.winCount == 0) {
                enemy.drawCharacter(enemy.characterType);
            }
            else if (player.winCount == 1) {
                boss.drawCharacter(boss.characterType);
            }           
            enemy2.drawCharacter(enemy2.characterType);
            enemy3.drawCharacter(enemy3.characterType);

            //Draw healthbars
            healthBar.drawHealthBar(characterType);
            enemyHealthBar.drawHealthBar(enemy);
        }
    }
    //Waiting before doing something else function
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function pauseBrowser(millis) {
        var date = Date.now();
        var curDate = null;
        do {
            curDate = Date.now();
        } while (curDate - date < millis);
    }
    //Added a settimeout to put around stuff.
    setTimeout(function () {

    }, (1 * 1000));

    //Battle Loop
    var battle = {
        battleOver: false,
        combatTimer: null, //Time variable
        combatStart: function () {
            battle.combatLogic();
        },
        attack: function (attacker, target) {
            console.log(target);
            if (playersTurn) {
                target.HP -= attacker.attackDamge;
            }
            else {
                target.HP -= attacker.attackDamge;
            }
        },
        heal: function (target) {
            if (playersTurn) {
                target.HP += 20;

                if (target.HP > 300) {
                    target.HP = 300;
                }
            }
            else {
                target.HP += 20;

                if (target.HP > 300) {
                    target.HP = 300;
                }
            }
        },
        checkBattleResult: function () {
            if (enemy.HP <= 0) {
                battleInterface.interfaceText = "You win!";
                battleInterface.drawBattleInterface(battleInterface.interfaceText);
                player.winCount += 1;
                battle.battleOver = true;

            }
            else if (player.HP <= 0) {
                battleInterface.interfaceText = "You lose!";
                battleInterface.drawBattleInterface(battleInterface.interfaceText);
                battle.battleOver = true;
            }
            if (battle.battleOver) {
                player.HP = 200;
                enemy.HP = 200;
                player.inBattle = false;
            }
        },
        combatLogic: function () {
            if (playersTurn) {
                if (!hasAttacked) { //When you haven't attacked
                    battleInterface.interfaceText = "Your turn! What attack will you perform? Q to attack, R to heal.";
                    battleInterface.drawBattleInterface(battleInterface.interfaceText);

                    if (key.isDown(key.ATTACK)) {
                        attackChosen = 1;
                    }
                    if (key.isDown(key.HEAL)) {
                        attackChosen = 2;
                    }

                    if (!(attackChosen === 0)) {
                        if (attackChosen === 1) {
                            battle.attack(player, enemy);
                        }
                        if (attackChosen === 2) {
                            battle.heal(player);
                        }
                        hasAttacked = true;
                    }
                }
                else {
                    if (attackChosen === 1) {
                        battleInterface.interfaceText = "You hit the enemy for " + player.attackDamge + " damage! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }
                    else if (attackChosen === 2) {
                        battleInterface.interfaceText = "You healed 20 hit points! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }

                    if (key.isDown(key.CONTINUE)) {
                        pauseBrowser(500);
                        battle.checkBattleResult();
                        attackChosen = 0;
                        hasAttacked = false;
                        playersTurn = false;
                    }
                }
            }

            if (!playersTurn) {
                if (!hasAttacked) {
                    battleInterface.interfaceText = "Enemy's turn! Press F to continue...";
                    battleInterface.drawBattleInterface(battleInterface.interfaceText);

                    //Random number for attack chosen
                    attackChosen = Math.floor(Math.random() * 100) + 1;

                    if (key.isDown(key.CONTINUE) && !(hasAttacked)) {
                        if ((attackChosen % 5) === 0) {
                            battle.heal(enemy);
                            attackChosen = 1;
                        }
                        else {
                            battle.attack(enemy, player);
                            attackChosen = 2;
                        }
                        hasAttacked = true;
                    }
                }
                else {
                    if (attackChosen === 1) {
                        battleInterface.interfaceText = "Enemy healed for 20 health! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }
                    else if (attackChosen === 2) {
                        battleInterface.interfaceText = "Enemy hit you for " + enemy.attackDamge + " damage! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }

                    if (key.isDown(key.CONTINUE)) {
                        pauseBrowser(1500);
                        battle.checkBattleResult();
                        attackChosen = 0;
                        hasAttacked = false;
                        playersTurn = true;
                    }
                }
            }
        }

    };
    var battleInterface = {
        interfaceText: "",
        width: canvas.width,
        height: 80,
        font: " bold 36px Helvetica",
        backgroundColor: "white",
        fontColor: "black",
        drawBattleInterface: function (interfaceText) {
            //Text box
            ctx.beginPath();
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, (canvas.height - 120), this.width, this.height);
            ctx.closePath();
            //Text in box
            ctx.beginPath();
            ctx.fillStyle = this.fontColor;
            ctx.font = this.font;
            ctx.textAlign = "left";
            ctx.fillText(this.interfaceText, 10, (canvas.height - 80));
            ctx.closePath();
        }
    };
    //Player walking around map
    var mainGameLoop = function () {
        var currentTime = Date.now();
        var delta = currentTime - lastTime;

        update(delta / 1000);
        render();

        lastTime = currentTime;


        //Animation frame does this again
        requestAnimationFrame(mainGameLoop);
    };
    mainGameLoop();
}


/* THIS IS THE BATTLE.COMBATLOGIC METHOD IT IS A WORKING METHOD DO NOT DELETE PLEASE 
 if (playersTurn) {
                if (!hasAttacked) { //When you haven't attacked
                    battleInterface.interfaceText = "Your turn! What attack will you perform? Q to attack, R to heal.";
                    battleInterface.drawBattleInterface(battleInterface.interfaceText);

                    if (key.isDown(key.ATTACK)) {
                        attackChosen = 1;
                    }
                    if (key.isDown(key.HEAL)) {
                        attackChosen = 2;
                    }

                    if (!(attackChosen === 0)) {
                        if (attackChosen === 1) {
                            battle.attack();
                        }
                        if (attackChosen === 2) {
                            battle.heal();
                        }
                        hasAttacked = true;
                    }
                }
                else {
                    if (attackChosen === 1) {
                        battleInterface.interfaceText = "You hit the enemy for " + player.attackDamge + " damage! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }
                    else if (attackChosen === 2) {
                        battleInterface.interfaceText = "You healed 20 hit points! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }

                    if (key.isDown(key.CONTINUE)) {
                        pauseBrowser(500);
                        battle.checkBattleResult();
                        attackChosen = 0;
                        hasAttacked = false;
                        playersTurn = false;
                    }
                }
            }

            if (!playersTurn) {
                if (!hasAttacked) {
                    battleInterface.interfaceText = "Enemy's turn! Press F to continue...";
                    battleInterface.drawBattleInterface(battleInterface.interfaceText);

                    //Random number for attack chosen
                    attackChosen = Math.floor(Math.random() * 100) + 1;

                    if (key.isDown(key.CONTINUE) && !(hasAttacked)) {
                        if ((attackChosen % 5) === 0) {
                            battle.heal();
                            attackChosen = 1;
                        }
                        else {
                            battle.attack();
                            attackChosen = 2;
                        }
                        hasAttacked = true;
                    }
                }
                else {
                    if (attackChosen === 1) {
                        battleInterface.interfaceText = "Enemy healed for 20 health! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }
                    else if (attackChosen === 2) {
                        battleInterface.interfaceText = "Enemy hit you for " + enemy.attackDamge + " damage! Press 'F' to continue...";
                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
                    }

                    if (key.isDown(key.CONTINUE)) {
                        pauseBrowser(2000);
                        battle.checkBattleResult();
                        attackChosen = 0;
                        hasAttacked = false;
                        playersTurn = true;
                    }
                }
            }
        }

            //    if (playersTurn) {
        //        for (i = 0; i < playerTeam.length; i++) {
        //            if (!hasAttacked) { //When you haven't attacked
        //                battleInterface.interfaceText = "Your turn! What attack will you perform? Q to attack, R to heal.";
        //                battleInterface.drawBattleInterface(battleInterface.interfaceText);

        //                if (key.isDown(key.ATTACK)) {
        //                    attackChosen = 1;
        //                }
        //                if (key.isDown(key.HEAL)) {
        //                    attackChosen = 2;
        //                }

        //                if (!(attackChosen === 0)) {
        //                    if (attackChosen === 1) {
        //                        battleInterface.interfaceText = "Select the enemy you wish to attack. (1, 2, or 3)";
        //                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                        if (key.isDown(key.ONE)) {
        //                            battle.attack(playerTeam[i], enemy);
        //                        }
        //                        else if (key.isDown(key.TWO)) {
        //                            battle.attack(playerTeam[i], enemy2);
        //                        }
        //                        else if (key.isDown(key.THREE)) {
        //                            battle.attack(playerTeam[i], enemy3);
        //                        }
        //                    }
        //                    if (attackChosen === 2) {
        //                        battleInterface.interfaceText = "Select the ally you wish to heal. (1, 2, or 3)";
        //                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                        if (key.isDown(key.ONE)) {
        //                            battle.heal(player);
        //                        }
        //                        else if (key.isDown(key.TWO)) {
        //                            battle.heal(teamMate1);
        //                        }
        //                        else if (key.isDown(key.THREE)) {
        //                            battle.heal(teamMate2);
        //                        }
        //                    }
        //                    hasAttacked = true;
        //                }
        //            }
        //            else {
        //                if (attackChosen === 1) {
        //                    battleInterface.interfaceText = "You hit the enemy for " + playerTeam[i].attackDamge + " damage! Press 'F' to continue...";
        //                    battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                }
        //                else if (attackChosen === 2) {
        //                    if (playerTeam[i].HP == 300) {
        //                        battleInterface.interfaceText = "You are at max health!";
        //                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                    }
        //                    else {
        //                        battleInterface.interfaceText = "You healed 20 hit points! Press 'F' to continue...";
        //                        battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                    }
        //                }

        //                if (key.isDown(key.CONTINUE)) {
        //                    pauseBrowser(500);
        //                    battle.checkBattleResult();
        //                    attackChosen = 0;
        //                    hasAttacked = false;
        //                }
        //            }
        //        }
        //        playersTurn = false;
        //    }
        //    //Enemy's turn. I think to make the logic in here work we have to make the this part of the code mimic the above code. At least I think so'
        //    if (!playersTurn) {
        //        battleInterface.interfaceText = "Enemy's turn! Press F to continue...";
        //        battleInterface.drawBattleInterface(battleInterface.interfaceText);

        //        for (i = 0; i < enemyTeam.length; i++) {
        //            if (!hasAttacked) {
        //                //Random number for attack chosen
        //                attackChosen = Math.floor(Math.random() * 100) + 1;

        //                if (key.isDown(key.CONTINUE) && !(hasAttacked)) {
        //                    if ((attackChosen % 5) === 0) {
        //                        enemySelector = Math.floor(Math.random() * 3) + 1;
        //                        attackChosen = 1;
        //                    }
        //                    else {
        //                        enemySelector = Math.floor(Math.random() * 3) + 1;
        //                        attackChosen = 2;
        //                    }
        //                }

        //                if (attackChosen === 1) {
        //                    if (enemySelector === 1) {
        //                        battle.heal(enemy);
        //                    }
        //                    else if (enemySelector === 2) {
        //                        battle.heal(enemy2);
        //                    }
        //                    else if (enemySelector === 3) {
        //                        battle.heal(enemy3);
        //                    }
        //                }
        //                else if (attackChosen === 2) {
        //                    if (enemySelector === 1) {
        //                        battle.attack(player);
        //                    }
        //                    else if (enemySelector === 2) {
        //                        battle.attack(teamMate1);
        //                    }
        //                    else if (enemySelector === 3) {
        //                        battle.attack(teamMate2);
        //                    }
        //                }
        //                hasAttacked = true;
        //            }
        //            else {
        //                if (attackChosen === 1) {
        //                    battleInterface.interfaceText = "Enemy healed for 20 health! Press 'F' to continue...";
        //                    battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                }
        //                else if (attackChosen === 2) {
        //                    battleInterface.interfaceText = "Enemy hit you for " + enemy.attackDamge + " damage! Press 'F' to continue...";
        //                    battleInterface.drawBattleInterface(battleInterface.interfaceText);
        //                }

        //                if (key.isDown(key.CONTINUE)) {
        //                    pauseBrowser(2000);
        //                    battle.checkBattleResult();
        //                    enemySelector = 0;
        //                    attackChosen = 0;
        //                    hasAttacked = false;
        //                }
        //            } //End of else for !hasAttacked
        //        }//End of for loop
        //        playersTurn = true;
        //    } //End of if(!playersTurn)
        //}
*/
