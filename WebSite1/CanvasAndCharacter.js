/*
    This javascript file is mainly for the character object, but also
    contains methods pertaining to the canvas and also the landscape
*/
var gameArea = {
    canvas: document.createElement("canvas"),
    //context: this.canvas.getContext("2d"),
    //Sets width and height to whole screen
    create: function () {
        this.canvas.display = "initial";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //When needed to test if something is not drawing on the canvas
    test : function () {
        ctx = this.context; 
        ctx.fillRect(300, -300, 50, 50);
    }
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
        console.log("KEYDOWN: " + event.keyCode);
        this._pressed[event.keyCode] = true;
        console.log(this._pressed[event.keyCode]);
    },
    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    }
};
function startGame(characterType) {
    var player = new Character(100, -50);
    var interval;
    //window.addEventListener("keydown", keyDownHandler, false);
    //window.addEventListener("keyup", keyUpHandler, false);
    //Test
    window.addEventListener("keydown", function (event) { key.onKeydown(event); }, false);
    window.addEventListener("keyup", function (event) { key.onKeyup(event); }, false);
    window.requestAnimationFrame(function (event) { updateGameArea(new Character()); });
    createCanvas();
    player.update();
    //createCharacter(characterType);
}
function createCanvas() {
    var startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none"; //Hides the start screen once canvas gets created

    gameArea.create();
}
function Character(xPos, yPos) {
    this.characterSprite = new Image();
    this.isMoving = false;
    this.width = 150;
    this.height = 150;
    this.movementSpeed = 0;
    this.xPos = xPos;
    this.yPos = yPos;
    this.update = function () {
        if (key.isDown(key.UP)) {
            console.log("here");
            this.moveUp();
        }
        if (key.isDown(key.LEFT)) {
            this.moveLeft();
        }
        if (key.isDown(key.DOWN)) {
            this.moveDown();
        }
        if (key.isDown(key.RIGHT)) {
            this.moveRight();
        }
        ctx = gameArea.context;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
     this.moveUp = function() {
        movementSpeed = 1;
        this.yPos += movementSpeed;
    }
    this.moveDown = function () {
        movementSpeed = -1;
        this.yPos += movementSpeed;
    }
    this.moveLeft = function () {
        movementSpeed = -1;
        this.xPos += movementSpeed;
    }
    this.moveRight = function () {
        movementSpeed = 1;
        this.xPos += movementSpeed;
    }
    this.stopMoving = function () {
        movementSpeed = 0;
    }
}
//function createLandscape() {
//    var mageCity = new Image("http://localhost:55331/WebSite1/magecity.png");
//    mageCity.onload = function () {
//        ctx.drawImage(mageCity, 0, 0, gameCanvas.width, gameCanvas.height)
//    }
//}
function createCharacter(characterType) {
    if (characterType == 1) {
        var player = new character(100, -100);
        player.characterSprite.onload = function () {
            player.ctx.drawImage(player.characterSprite, player.xPos, player.yPos, player.width, player.height);
        }
        player.characterSprite.src = "../WebSite1/TankSprite/__SCML/3_KNIGHT/3_knight_.png";
    }
    else if(characterType == 2){
        player.characterSprite.onload = function () {
            ctx.drawImage(player.characterSprite, (player.xPos - 10), (player.yPos - 10), player.spriteWidth, player.spriteHeight);
        }
        player.characterSprite.src = "../WebSite1/WizardSprite/SCML/1/1_wizard_.png";
    }
    else {
        player.characterSprite.onload = function () {
            ctx.drawImage(player.characterSprite, (player.xPos - 10), (player.yPos - 10), player.spriteWidth, player.spriteHeight);
        }
        player.characterSprite.src = "../WebSite1/ElfSprite/_PNG/1/1_IDLE_000.png";
    }
}
function updateGameArea(player) {
    gameArea.clear();
    console.log(player);
    player.update();
}