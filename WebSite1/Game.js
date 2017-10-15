//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function Character(xPos, yPos, isEnemy) {
    this.isEnemy = isEnemy;
    this.width = 100;
    this.height = 100;
    this.movementSpeed = 5;
    this.xPos = xPos;
    this.yPos = yPos;
}
function startGame(characterType) {

    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    console.log("Here in startGame");
    //Game objects
    var player = new Character(0, 0, false);
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
        //Variables for sides of the canvas
        //var top = canvas.hegiht;
        //var bottom = canvas.hegiht - canvas.height;
        //var rightSide = canvas.width;
        //var leftSide = canvas.width - canvas.width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resize();        
        //if (((player.xPos || player.yPos) <= (canvas.width || canvas.height))) {
            if (key.isDown(key.UP)) {
                player.yPos -= player.movementSpeed
            }
            if (key.isDown(key.LEFT)) {
                player.xPos -= player.movementSpeed
            }
            if (key.isDown(key.DOWN)) {
                player.yPos += player.movementSpeed
            }
            if (key.isDown(key.RIGHT)) {
                player.xPos += player.movementSpeed
            }
            if (key.isDown(key.BATTLE)) {
                battleLoop();
            }
    }
    //Reszie canvas to broswer no matter what
    var resize = function () {
        canvas.width = w.innerWidth;
        canvas.height = w.innerHeight;
    }
    //Drawing everything
    var render = function () {
        if (!(player.isEnemy)) {
            ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
        }
        projectile.draw();
    }
    //When player is in battle
    var battleLoop = function () {
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