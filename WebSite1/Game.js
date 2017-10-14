//Inspired from: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
function startGame(characterType) {

    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    console.log("Here in startGame");
    //Game objects
    var player = {
        characterSpriteReady: false,
        characterSprite: new Image(),
        xPos: 0,
        yPos: 0,
        movementSpeed: 5,
        draw: function () {
            ctx.fillRect(this.xPos, this.yPos, 150, 150);
        }
    };
    //Key handlers
    //var keysDown = {

    //};
    //Test Key handlers
    var key = {
        _pressed: {},
        UP: 87,
        DOWN: 83,
        LEFT: 65,
        RIGHT: 68,
        BATTLE: 13,
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
    //Event listeners original
    //w.addEventListener("keydown", function (event) { keysDown[event.keyCode] = true; }, false);
    //w.addEventListener("keydown", function (event) { delete keysDown[event.keyCode]; }, false);
    //Event listeners test
    w.addEventListener("keydown", function (event) { key.onKeydown(event); }, false);
    w.addEventListener("keyup", function (event) { key.onKeyup(event); }, false);
    //Background variables
    //var backgroundReady = false;
    //var backgroundImage = new Image();

    //Change canvas width and height to whole screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas); //Makes it to where the canvas is apart of the HTML body

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

    //Update game objexcts  used for moving
    //var update = function (modifier) {
    //    if (38 in keysDown) { //Player moving up pressing W code 87
    //        console.log("Here in 87 key down");
    //        player.yPos -= player.movementSpeed * modifier;
    //    }
    //    if (40 in keysDown) { //Player moving down, pressing S code 83
    //        player.yPos += player.movementSpeed * modifier;
    //    }
    //    if (37 in keysDown) { //Player moving left, pressing A code 65
    //        player.xPos -= player.movementSpeed * modifier;
    //    }
    //    if (39 in keysDown) { //Player moving right, pressing D code 68
    //        player.xPos += player.movementSpeed * modifier;
    //    }
    //};
    //Test update used for moving
    var update = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            battle();
        }
    }
    //Drawing everything
    var render = function () {
        //if (backgroundReady) {
        //    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        //}
        //if (characterSpriteReady) {
        //    ctx.drawImage(player.characterSprite, player.xPos, player.yPos);
        //}
        player.draw();
    }
    //When player is in battle
    var battleLoop = function () {

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