var virtualMatrix = [];
var lines = 30;
var columns = 10;
var pieces = ["I", "J", "L", "O", "S", "T", "Z"];
var currentPiece = {};
var gameTimer;
var currentLine = 0;
var currentColumn = 0;
var blockPool = [];
var contentDiv;
var blockSize = 20;

function init() {

    contentDiv = document.getElementsByClassName("content")[0];

    createVirtualMatrix();
    initializaMatrix();
    initKeyListeners();
    currentPiece = generateRandomPiece();
    gameTimer = setInterval(gameTimer, 200);
    
};

function initKeyListeners() {
    var body = document.getElementsByTagName("body")[0];
    body.addEventListener("keyup", keyUpListener);
};

function keyUpListener(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 37: //left
            currentColumn--;
            if (currentColumn < 0) {
                currentColumn = 0;
            }
            drawMatrix();
        break;
        case 39: //right
            currentColumn++;
            if (currentColumn > columns - currentPiece.matrix[0].length) {
                currentColumn = columns - currentPiece.matrix[0].length
            }
            drawMatrix();
        break;
        

    }
};

function generateRandomPiece() {
    var piece = pieces[Math.round(Math.random() * 7)];
    console.log(piece);
    return generatePiece(piece);
};

function gameTimer() {
    clearMatrix();
    movePiece();
    drawMatrix();

    currentLine++;
    if (currentLine > virtualMatrix.length - currentPiece.matrix.length) {
        currentLine = 0;
    }
};

function movePiece() {
    // test if next line has a pierce on the width of the current piece
    for (var i = 0; i < currentPiece.matrix.length; i++) {
        for (var j = 0; j < currentPiece.matrix[i].length; j++) {
            virtualMatrix[currentLine + i][currentColumn + j] = currentPiece.matrix[i][j];
        }
    }
};

function clearMatrix() {
    for (var i = 0; i < virtualMatrix.length; i++) {
        for (var j = 0; j < virtualMatrix[i].length; j++) {
            virtualMatrix[i][j] = 0;
        }
    }
};

function drawMatrix() {
    var block;
    for (var i = 0; i < virtualMatrix.length; i++) {
        for (var j = 0; j < virtualMatrix[i].length; j++) {
            block = document.getElementById("block" + i + j);
            if (virtualMatrix[i][j]) {
                block.style.display = "inline-block";
            }
            else {
                block.style.display = "none";
            }
        }
    }
};

function generatePiece(name) {
    var currentPiece = {};
    currentPiece.name = name;
    
    switch (name) {
        case "I":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [1, 1, 1, 1];
        break;
        case "J":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [1, 1, 1];
            currentPiece.matrix[1] = [0, 0, 1];
        break;
        case "L":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [1, 1, 1];
            currentPiece.matrix[1] = [1, 0, 0];
        break;
        case "O":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [1, 1];
            currentPiece.matrix[1] = [1, 1];
        break;
        case "S":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [0, 1, 1];
            currentPiece.matrix[1] = [1, 1, 0];
        break;
        case "T":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [0, 1, 1];
            currentPiece.matrix[1] = [0, 1, 0];
        break;
        case "Z":
            currentPiece.matrix = [];
            currentPiece.matrix[0] = [1, 1, 0];
            currentPiece.matrix[1] = [0, 1, 1];
        break;
    }

    return currentPiece;
}

function createVirtualMatrix() {
    for (var i = 0; i < lines; i++) {
        virtualMatrix[i] = [];
        for (var j = 0; j < columns; j++) {
            virtualMatrix[i][j] = 0;
        }
    }
};

function initializaMatrix() {
    for (var i = 0; i < lines; i++) {
        virtualMatrix[i] = [];
        for (var j = 0; j < columns; j++) {
            block = document.createElement("div");
            block.className = "block";
            block.style.top = (i * blockSize) + "px";
            block.style.left = (j * blockSize) + "px";
            block.style.display = "none";
            block.id = "block" + i + j;

            contentDiv.appendChild(block);
        }
    }
};

window.onload = init;