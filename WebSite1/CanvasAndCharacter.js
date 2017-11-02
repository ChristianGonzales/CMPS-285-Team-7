/*/*
    This javascript file is mainly for the character object, but also
    contains methods pertaining to the canvas and also the landscape
*/
//      console.log("");  useful copy and paste code
//Animation code for FPS
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
var gameArea = {
    canvas: document.createElement("canvas"),
    lastTime: (new Date()).getTime(),
    currentTime: 0,
    delta: 0,
    //Sets width and height to whole screen
    create: function (player) {
        console.log("inside gameArea.create");
        console.log(player);
        this.canvas.display = "initial";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //Test
        window.addEventListener("keydown", function (event) { key.onKeydown(event); }, false);
        window.addEventListener("keyup", function (event) { key.onKeyup(event); }, false);
        //Animation Frame Test code
        window.requestAnimationFrame = (function () {
            //Animation frames for multiple browsers.
            return window.requestAnimationFrame || //Chrome
                window.mozRequestAnimationFrame || //Mozilla Firefox
                window.msRequestAnimationFrame || //Exploer
                null;

        })();
        this.animationLoop();
        console.log(player);
        console.log("end of gameArea.create");
    },
    animationLoop: function () {
        requestAnimationFrame(gameArea.animationLoop);
    },
    update: function (player) {
        console.log("Here inside update(player) inside gameArea");
        console.log(player);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log("before draw function");
        console.log(player);
        player.draw();
        console.log("Outside draw function");
        player.update();
    },

};
var key = {
    _pressed: {},
    UP: 87,
    DOWN: 83,
    LEFT: 65,
    RIGHT: 68,
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
//function Character(xPos, yPos) {
//    this.characterSprite = new Image();
//    this.isMoving = false;
//    this.width = 150;
//    this.height = 150;
//    this.movementSpeed = 0;
//    this.xPos = xPos;
//    this.yPos = yPos;
//    this.draw = function () {
//        console.log("Inside draw function");
//        console.log(this);
//        ctx = gameArea.context;
//        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
//        console.log(this);
//        console.log("end of draw function");
//    }
//    this.update = function () {
//        console.log("in player.update");
//        ctx = gameArea.context;
//        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
//        console.log(this);
//        console.log("after the ctx code");
//        if (key.isDown(key.UP)) {
//            this.moveUp();
//        }
//        if (key.isDown(key.LEFT)) {
//            this.moveLeft();
//        }
//        if (key.isDown(key.DOWN)) {
//            this.moveDown();
//        }
//        if (key.isDown(key.RIGHT)) {
//            this.moveRight();
//        }
//        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
//    }
//    this.moveUp = function () {
//        movementSpeed = 1;
//        this.yPos += movementSpeed;
//    }
//    this.moveDown = function () {
//        movementSpeed = -1;
//        this.yPos += movementSpeed;
//    }
//    this.moveLeft = function () {
//        movementSpeed = -1;
//        this.xPos += movementSpeed;
//    }
//    this.moveRight = function () {
//        movementSpeed = 1;
//        this.xPos += movementSpeed;
//    }
//    this.stopMoving = function () {
//        movementSpeed = 0;
//    }
//}
function startGame(characterType) {
    var player = new Character(50, -100);
    console.log(player);
    createCanvas(player);
    console.log("Here after createCanvas()");
    console.log(player);
    console.log("HERE before gameLoop(player)");
    gameLoop(player);

    //createCharacter(characterType);
}
function createCanvas(player) {
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created
    console.log(player);
    gameArea.create(player);
}
function updateGameArea(player) {
    console.log("Here at start of update gameArea");
    console.log(player);
    gameArea.currentTime = (new Date()).getTime();
    gameArea.delta = (gameArea.currentTime - gameArea.lastTime) / 1000;
    console.log("Here before gameArea.update(player)");
    console.log(player);
    gameArea.update(player);

}
function gameLoop(player) {
    console.log("Here before updateGameArea");
    console.log(player);
    updateGameArea(player);
}