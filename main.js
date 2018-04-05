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
    currentPiece = generateRandomPiece();
    gameTimer = setInterval(gameTimer, 16);
    
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
        debugger;
        currentLine = 0;
    }
};

function movePiece() {
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
            if (virtualMatrix[i][j]) {
                block = document.createElement("div");
                block.className = "block";
                block.style.top = (i * blockSize) + "px";
                block.style.left = (j * blockSize) + "px";

                contentDiv.appendChild(block);
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

window.onload = init;