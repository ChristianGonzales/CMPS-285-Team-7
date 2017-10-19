//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function Character(xPos, yPos, isEnemy) {
    this.isEnemy = isEnemy;
    this.width = 100;
    this.height = 100;
    this.movementSpeed = 5;
    this.xPos = xPos;
    this.yPos = yPos;
    this.isMoving = false;
}
function startGame(characterType) {
    console.log(characterType);
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    //Game objects
    var player = new Character(0, 530, false);
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
    //Create enemies when E is pressed
    var createEnemy = function () {
        var enemy = new Character(300, 0, true);
        return enemy;
    }
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
            createEnemy();
            console.log(enemy);
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
        //Draw objective
        objective.currentObjective = objective.getObjective();
        objective.drawObjective(objective.currentObjective);
        if (Character.isEnemy) {
            ctx.fillStyle = "brown";
            ctx.fillRect(enemy.xPos, enemy.yPos, enemy.width, enemy.height);
        }
        else {
            console.log(characterType);
            if (characterType == 1) {
                ctx.fillStyle = "gold";
                ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
            }
            else if (characterType == 2) {
                ctx.fillStyle = "purple";
                ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
            }
            else {
                ctx.fillStyle = "olive";
                ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
            }
        }
        projectile.draw();
    }
    //When player is in battle
    var battleLoop = function () {
        //The loop for deciding winner in fights goes here
        console.log("In battleLoop");
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


//Insdie update function for collsion detectioin for when box goes to corner of screen
    //Variables for sides of the canvas
        //var top = canvas.hegiht;
        //var bottom = canvas.hegiht - canvas.height;
        //var rightSide = canvas.width;
        //var leftSide = canvas.width - canvas.width;

        //if (((player.xPos || player.yPos) <= (canvas.width || canvas.height))) {
                //Code for key presses
        //}
        //else {
        //    if (player.yPos >= top) {
        //        player.yPos = top;
        //    }
        //    if (player.yPos <= bottom) {
        //        player.yPos = bottom;
        //    }
        //    if (player.xPos >= leftSide) {
        //        player.yPos = leftSide;
        //    }
        //    if (player.yPos >= rightSide) {
        //        player.yPos = rightSide;
        //    }

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