var virtualMatrix = [];
var lines = 30;
var columns = 10;
var pieces = ["I", "J", "L", "O", "S", "T", "Z"];
var currentPiece = {};
var gameTimer;
var currentLine = 0;
var currentColumn = 0;
var prevLine = currentLine;
var prevColumn = currentColumn;
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
    switch (e.keyCode) {
        case 37: //left
            prevColumn = currentColumn;
            currentColumn--;
            if (currentColumn < 0) {
                currentColumn = 0;
            }
            clearPrevPiecePosition(prevLine);
            clearPrevPiecePosition(currentLine);
            drawPieceAtCurrentPosition();
            drawMatrix();
        break;
        case 39: //right
            prevColumn = currentColumn;
            currentColumn++;
            if (currentColumn > columns - currentPiece.matrix[0].length) {
                currentColumn = columns - currentPiece.matrix[0].length
            }
            clearPrevPiecePosition(prevLine);
            clearPrevPiecePosition(currentLine);
            drawPieceAtCurrentPosition();
            drawMatrix();
        break;
        

    }
};

function generateRandomPiece() {
    var piece = pieces[Math.round(Math.random() * 7)];
    debugger;
    return generatePiece(piece);
};

function gameTimer() {
    //clearMatrix();
    clearPrevPiecePosition(prevLine);
    drawPieceAtCurrentPosition();
    drawMatrix();
    prevLine = currentLine;
    currentLine++;
    if (currentLine > virtualMatrix.length - currentPiece.matrix.length) {
        currentPiece = generateRandomPiece();
        debugger;
        currentLine = 0;
    }
};

function printMatrix() {
    var s = "";
    
    for (var i = 0; i < lines; i++) {
        s += virtualMatrix[i].join(",");
        s += "\n";
    }
    console.log(s);
    
}

function clearPrevPiecePosition(line) {
    for (var i = 0; i < currentPiece.matrix.length; i++) {
        for (var j = 0; j < currentPiece.matrix[i].length; j++) {
            //if (currentPiece.matrix[i][j]) {
                if (line + i < lines) {
                    virtualMatrix[line + i][prevColumn + j] = 0;
                    virtualMatrix[line + i][currentColumn + j] = 0;
                }
            //}
        }
    }
}

function drawPieceAtCurrentPosition() {
    // test if next line has a piece on the width of the current piece

    var nextLine = i + currentPiece.matrix.length + 1;

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
    printMatrix();
    
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
            currentPiece.matrix[0] = [1, 1, 1];
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
    printMatrix();
};

function initializaMatrix() {
    for (var i = 0; i < lines; i++) {
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