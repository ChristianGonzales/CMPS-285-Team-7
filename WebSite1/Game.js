//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function Character(ctx, characterType, xPos, yPos, isEnemy) {
    this.characterType = characterType;
    this.HP = 200;
    this.attackDamge = 15;
    this.width = 100;
    this.height = 100;
    this.movementSpeed = 5;
    this.xPos = xPos;
    this.yPos = yPos;
    this.isEnemy = isEnemy;
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
    var player = new Character(ctx, characterType, 200, 560, false);
    var enemy = new Character(ctx, "enemy", 650, 560, true);
    //Team based combat variables
    var teamMate1;
    var teamMate2;
    var playerTeam = [];
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
        barColor: "red",
        width: 200,
        height: 50,
        font: " bold 36px Helvetica ",
        drawHealthBar: function (characterType) {
            if (characterType == ("knight" || "wizard" || "elf")) {
                //Font
                ctx.beginPath();
                ctx.font = this.font;
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.strokeStyle = "black";
                ctx.fillStyle = this.color;
                ctx.fillText("Player: ", 0, 0);
                ctx.closePath();

                //Actual healthbar
                ctx.beginPath();
                ctx.fillStyle = this.barColor;
                ctx.fillRect(150, 0, this.width, this.height);
                ctx.fillStyle = this.color;
                ctx.fillText(player.HP.toString(), 170, 0);
                ctx.closePath();
            }
            else if (characterType == "enemy") {
                //Font
                ctx.beginPath();
                ctx.font = this.font;
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                ctx.strokeStyle = "black";
                ctx.fillStyle = this.color;
                ctx.fillText("Enemy: ", 600, 0);
                ctx.closePath();

                //Actual health bar
                ctx.beginPath();
                ctx.fillStyle = this.barColor;
                ctx.fillRect(620, 0, this.width, this.height);
                ctx.fillStyle = this.color;
                ctx.fillText(enemy.HP.toString(), 700, 0);
                ctx.closePath();

            }
        }
    };
    var projectile = {
        color: "red",
        width: 20,
        height: 10,
        drawProjectile: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect((player.xPos + player.width), (player.yPos + (player.height / 2)), projectile.width, projectile.height);
            ctx.closePath();
        }
    };
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
    var createTeam = function (characterType) {
        if (characterType == "knight") {
            teamMate1 = new Character("wizard");
            teamMate2 = new Character("elf");
        }
        else if (characterType == "wizard") {
            teamMate1 = new Character("knight");
            teamMate2 = new Character("elf");
        }
        else if (characterType == "elf") {
            teamMate1 = new Character("wizard");
            teamMate2 = new Character("knight");
        }
        playerTeam.push(player);
        playerTeam.push(teamMate1);
        playerTeam.push(teamMate2);
    }

    //When everything gets redrawn on canvas
    var update = function () {
        var rightSide = canvas.width;
        var leftSide = canvas.width - canvas.width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resize();
        if (!(player.inBattle)) { //Haults player movement after E press
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
            if (key.isDown(key.BATTLE)) {
                player.inBattle = true;
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
        if (player.inBattle) {
            player.xPos = 0;
            player.yPos = 560;
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

        if (player.inBattle) {
            enemy.drawCharacter("enemy");
            healthBar.drawHealthBar(characterType);
            healthBar.drawHealthBar("enemy");
        }
        if (player.isAttacking) {
            projectile.drawProjectile();
        }
    }
    //Battle Loop
    var battle = {
        battleOver: false,
        combatTimer: null, //Time variable
        combatStart: function () {
            battle.combatTimer = setTimeout(battle.combatLogic, 3000);
        },
        attack: function () {
            if (playersTurn) {
                player.isAttacking = true;
                enemy.HP -= player.attackDamge;
            }
            else {
                enemy.isAttacking = true;
                player.HP -= enemy.attackDamge;
            }
        },
        heal: function () {
            if (playersTurn) {
                player.HP += 20;
            }
            else {
                enemy.HP += 20;
            }
        },
        checkBattleResult: function () {
            if (enemy.HP <= 0) {
                console.log("You win!");
                battle.battleOver = true;

            }
            else if (player.HP <= 0) {
                console.log("You lose!");
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
                    if (key.isDown(key.ATTACK)) {
                        attackChosen = 1;
                    }
                    if (key.isDown(key.HEAL)) {
                        attackChosen = 2;
                    }
                    if (attackChosen === 0) {
                        console.log("Which attack will you perform? Q for normal attack.");
                    }
                    else if (attackChosen === 1) {
                        console.log("Perform normal attack? Press F to continue...");
                    }
                    else if (attackChosen === 2) {
                        console.log("Perform heal? Press F to continue...");
                    }
                    if (key.isDown(key.CONTINUE) && !(attackChosen === 0)) {
                        if (attackChosen === 1) {
                            clearTimeout(battle.combatTimer);
                            battle.attack();
                        }
                        if (attackChosen === 2) {
                            clearTimeout(battle.combatTimer);
                            battle.heal();
                        }
                        hasAttacked = true;
                        battle.combatTimer = setTimeout(battle.combatLogic, 3000);
                    }
                }
                else {
                    if (attackChosen === 1) {
                        console.log("You hit the enemy for " + player.attackDamge + " damage! Press 'F' to continue...");
                    }
                    else if (attackChosen === 2) {
                        console.log("You healed 20 hit points!");
                    }
                    battle.checkBattleResult();
                    attackChosen = 0;
                    hasAttacked = false;
                    playersTurn = false;
                }
            }
            else {
                console.log("Enemy's turn! Press F to continue...");

                if ((key.isDown(key.CONTINUE) && !(hasAttacked))) {
                    clearTimeout(battle.combatTimer);
                    attackChosen = Math.floor(Math.random() * 500) + 1;
                    if ((attackChosen % 2) === 0) {
                        battle.attack();
                    }
                    else {
                        battle.heal();
                    }
                    hasAttacked = true;
                }
                else {
                    if (attackChosen === 1) {
                        console.log("Enemy hit you for " + enemy.attackDamge + "! Press F to continue...");
                    }
                    else if (attackChosen === 2) {
                        console.log("Enemy healed for 20 hit points!");
                    }
                }
                if (key.isDown(key.CONTINUE) && hasAttacked){
                    battle.checkBattleResult();
                    attackChosen = 0;
                    hasAttacked = false;
                    playersTurn = true;
                }
            }
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


/*
Test code for different parts of program that might be reused..
    //Background variables
    //var backgroundReady = false;
    //var backgroundImage = new Image();

    //Displaying background
    //backgroundImage.onload = function () {
    //    backgroundReady = true;
    //};
    //backgroundImage.src = "WebSite1/testBackground.png";

    //Displaying character sprites
    if (characterType == 1) {
        player.characterSprite.onload = function () {
            player.characterSpriteReady = true;
        }
        player.characterSprite.src = "../WebSite1/TankSprite/__SCML/3_KNIGHT/3_knight_.png";
    }
    //Projectile sprite
    //projectile.projectileImage.onload = function () {
    //    projectile.projectileReady = true;
    //}
    //projectile.projectileImage.src = ("../WebSite1/ElfSprite/_SCML/1/arrow.png");

    Inside the render function
         //if (backgroundReady) {
        //    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        //}
        //if (characterSpriteReady) {
        //    ctx.drawImage(player.characterSprite, player.xPos, player.yPos);
        //}
        //if (projectile.projectileReady) {
        //    ctx.drawImage(projectile.projectileImage, 500, -200, projectile.projectileWidth, projectile.projectileHeight);
        //    console.log("Here");
        //}
*/