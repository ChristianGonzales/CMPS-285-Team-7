//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function Character(xPos, yPos, isEnemy) {
    this.HP = 201;
    this.attackDamge = 10;
    this.width = 100;
    this.height = 100;
    this.movementSpeed = 5;
    this.xPos = xPos;
    this.yPos = yPos;
    this.isEnemy = isEnemy;
    this.isMoving = false;
    this.inBattle = false;
}
function startGame(characterType) {
    //Hides the start screen once canvas gets created
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    //Game objects
    var player = new Character(200, 560, false);
    var enemy = new Character(1500, 560, true);
    var projectile = {
        //projectileImage: new Image(),
        //projectileReady: false,
        color: "red",
        projectileWidth: 20,
        projectileHeight: 10,
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(300, -150, 20, 10);
            ctx.closePath();
        }
    };
    //Key handlersS
    var key = {
        _pressed: {},
        UP: 87, //W
        DOWN: 83, //S
        LEFT: 65, //A
        RIGHT: 68, //D
        BATTLE: 69, //E
        ATTACK: 81, //Q
        POWERUP: 82, //R
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
    var w = window;
      //Test code (does not work, but I want to try and get this method to work) //Create enemies when E is pressed
                                    //var createEnemy = function () {
                                    //    var enemy = new Character(300, 0, true);
                                    //    return enemy;
                                    //}
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
    //For multiple browsers Chrome, FireFox, Explorer
    requestAnimationFrame = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.msRequestAnimationFrame;
    //Event listeners
    w.addEventListener("keydown", function (event) { key.onKeydown(event); }, false);
    w.addEventListener("keyup", function (event) { key.onKeyup(event); }, false);

    //Change canvas width and height to whole screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas); //Makes it to where the canvas is apart of the HTML body

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
        if (player.inBattle) {
            player.xPos = 200;
            player.yPos = 560;
            battleLoop();
        }
        //Collision detection
        if (player.isMoving) {
            if (player.xPos <= leftSide){
                player.xPos = leftSide;
            }
            if (player.xPos + player.width >= rightSide){
                player.xPos = rightSide - player.width;
            }
            if (player.yPos <= 0) {
                player.yPos = 0;
            }
            if (player.yPos + player.height >= canvas.height) {
                player.yPos = canvas.height - player.height;
            }
        }
    }
    //Reszie canvas to broswer no matter what
    var resize = function () {
        canvas.width = w.innerWidth;
        canvas.height = w.innerHeight;
    }
    //Drawing everything
    var render = function () {
        //Draw objective if not in battle
        if (!(player.inBattle)) {
            objective.currentObjective = objective.getObjective();
            objective.drawObjective(objective.currentObjective);
        }
        if (!(Character.isEnemy)) {
            if (characterType == 1) {
                ctx.beginPath();
                ctx.fillStyle = "navy";
                ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
                ctx.closePath();
            }
            else if (characterType == 2) {
                ctx.beginPath();
                ctx.fillStyle = "purple";
                ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
                ctx.closePath();
            }
            else {
                ctx.beginPath();
                ctx.fillStyle = "olive";
                ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
                ctx.closePath();
            }
        }
        if (player.inBattle) {
            ctx.beginPath();
            ctx.fillStyle = "brown";
            ctx.fillRect(enemy.xPos, enemy.yPos, enemy.width, enemy.height);
            ctx.closePath();
        }
        projectile.draw();
    }
    //When player is in battle
    var battleLoop = function () {
        var playersTurn = true;
        var powerUpUsed = false;
        //Text to lead the player through battle i.e. "Which attack will you select?"
        var battleGuide = {
            currentGuide: "",
            getGuide: function (currentGuide) {
                if (playersTurn) {
                    this.currentGuide = "Which attack will you perform this turn?";
                }
                return this.currentGuide;
            },
            drawGuide: function () {
                
                if (playersTurn) {
                    ctx.font = "36px Helvetica";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "top";
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "gold";
                    ctx.fillText(this.currentGuide, 0, 0);
                }
            }
        };
        console.log(player.HP + " " + player.attackDamge + " " + enemy.HP + " " + enemy.attackDamge);
        battleGuide.getGuide();
        battleGuide.drawGuide(battleGuide.currentGuide);
        //var powerUp = function (attackDamge) {
        //    var empoweredAttack = 0;
        //    empoweredAttack = attackDamge * 2;

        //    return empoweredAttack;
        //}
        //var damageCalculations = function (playerHealth, enemyHealth, playerDamage, enemyDamge) {
        //    if (playersTurn) {
        //        enemyHealth -= playerDamage;
        //    }
        //    else {
        //        playerHealth -= enemyDamage;
        //    }
        //}
        //var block = function (playerDamage, enemyDamge) {
        //    var damageBlocked = Math.floor(Math.random() * 10) + 1;;
        //    if (playersTurn) {
        //        playerDamage -= damageBlocked;
        //    }
        //    else {
        //        enemyDamge -= damageBlocked
        //    }
        //}
        
        //while ((player.HP || enemy.HP) > 0) {
        //    if (playersTurn) {
        //        if (powerUpUsed) {
        //            player.attackDamge = Math.floor(Math.random() * 30) + 10;
        //            player.attackDamge = powerUp(player.attackDamge);
        //            block(player.attackDamge, enemy.attackDamge );
        //            damageCalculations(player.HP, enemy.HP, player.attackDamge, enemy.attackDamge);
        //            playersTurn = false;
        //        }
        //        else {
        //            if (key.isDown(key.ATTACK)) {
        //                player.attackDamge = Math.floor(Math.random() * 30) + 10; //Random number 10-30
        //                block(player.attackDamge, enemy.attackDamge);
        //                damageCalculations(player.HP, enemy.HP, player.attackDamge, enemy.attackDamge);
        //            }
        //            else if (key.isDown(key.POWERUP)) {
        //                powerUpUsed = true;
        //                playersTurn = false;
        //            }
        //        }
        //    }
        //    else {
        //        enemy.attackDamge = Math.floor(Math.random() * 50) + 10;
        //        block(player.attackDamge, enemy.attackDamge);
        //        damageCalculations(player.HP, enemy.HP, player.attackDamge, enemy.attackDamge);
        //    }
        //}
    }
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
