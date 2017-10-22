//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function Character(xPos, yPos, isEnemy) {
    this.HP = 200;
    this.attackDamge = 10;
    this.width = 100;
    this.height = 100;
    this.movementSpeed = 5;
    this.xPos = xPos;//ya
    this.yPos = yPos;
    this.isEnemy = isEnemy;
    this.isMoving = false;
    this.inBattle = false;
    this.isAttacking = false;
}
var healthBar = {
    color: "white",
    width: 200,
    height: 50,
    draw: function () {
        ctx.beginPath();
        ctx.font = "36px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.strokeStyle = "black";
        ctx.fillStyle = this.color;
        ctx.fillText("Player: ", 0, 0);
        ctx.closePath();

        //Actual health bar
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(150, 0, this.width, this.height);
        ctx.closePath();
    }
};
function startGame(characterType) {
    //Hides the start screen once canvas gets created
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";
    
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    //Game objects
    var player = new Character(200, 560, false);
    var enemy = new Character(1000, 560, true);
    var projectile = {
        //projectileImage: new Image(),
        //projectileReady: false,
        color: "red",
        width: 20,
        height: 10
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
        //Collision detection
        if (player.isMoving) {
            if (player.xPos <= leftSide) {
                player.xPos = leftSide;
            }
            if (player.xPos + player.width >= rightSide) {
                player.xPos = rightSide - player.width;
            }
            if (player.yPos <= 0) {
                player.yPos = 0;
            }
            if (player.yPos + player.height >= canvas.height) {
                player.yPos = canvas.height - player.height;
            }
        }
        //Brings player to certain position after E press
        if (player.inBattle) {
            player.xPos = 200;
            player.yPos = 560;
            battle();
        }
        ////Projectile drawing
        //if (Character.isAttacking) {
        //    if (!(Character.isEnemy)) {
        //        projectile.draw((player.xPos + player.width), player.yPos);
        //    }
        //    else {
        //        projectile.draw((enemy.xPos + enemy.width), player.yPos);
        //    }
        //}
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
        if (player.isAttacking) {
            ctx.beginPath();
            ctx.fillRect((player.xPos + player.width), (player.yPos + (player.height / 2)), projectile.width, projectile.height);
            ctx.closePath();
        }
    }
    //When player is in battle
    var battle = function () {
        var playersTurn = true;
        var powerUpUsed = false;
        var battleOver = false;
        var battleWait;//Used for the delay of text so the user can read what's happening
        var battleMenu = {
            width: canvas.width,
            height: 50,
            xPos: 0,
            yPos: canvas.height - 57,
            text: "", 
            color: "white",
            draw: function (text) {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
                //Text inside battle menu
                ctx.font = "24px Helvetica";
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
                ctx.fillText(this.text, this.xPos, this.yPos);
                ctx.closePath();
            
            },
        };
        var battleResult = function () {
            if ((player.HP || enemy.HP) > 0) {
                if (enemy.HP <= 0) {
                    battleMenu.text = "You win!";
                    battleMenu.draw(battleMenu.text);
                    battleOver = true;
                }
                else if (player.HP <= 0) {
                    battleMenu.text = "You lose";
                    battleMenu.draw(battleMenu.text);
                    battleOver = true;
                }
            }
        }
        var attack = function (character) {
            if (!(character.isEnemy)) {
                //Add a random number to current attack damage
                player.isAttacking = true;
                player.attackDamage += Math.floor(Math.random() * 20) + 1;
                enemy.HP -= player.attackDamge;
                battleMenu.text = "You hit the enemy for " + player.attackDamge + " damage!";
                battleMenu.draw(battleMenu.text);
                battleResult();
                playersTurn = false;
            }
            else {
                enemy.isAttacking = true;
                enemy.attackDamge += Math.floor(Math.random() * 20) + 1;
                player.HP -= enemy.attackDamge;
                battleMenu.text = "Enemy hit you for " + enemy.attackDamge + " damage!";
                battleMenu.draw(battleMenu.text);
                battleResult();
                playersTurn = true;

            }
        }
        var powerUp = function () {
            //Add a random number to current attack damage
            player.isAttacking = true;
            player.attackDamge += Math.floor(Math.random() * 20) + 1;
            player.attackDamge = player.attackDamge * 2;
            enemy.HP -= player.attackDamge;
            playersTurn = false;
        }
        var battleLoop = function () {
            if (playersTurn) {
                battleMenu.text = "Which attack will you perform?";
                battleMenu.draw(battleMenu.text);
                if (powerUpUsed) {
                    powerUp();
                }
                else {
                    if (key.isDown(key.ATTACK)) {
                        attack(player);
                    }
                    else if (key.isDown(key.POWERUP)) {
                        powerUpUsed = true;
                        battleMenu.text = "You powering up! Next turn you will deal double damage!";
                        battleMenu.draw(battleMenu.text);
                        playersTurn = false;
                    }
                }
            }
            else {
                
            }
        }
        battleLoop();
        if (battleOver) {
            player.inBattle = false;
        }
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