let blocksize = 15
let rows = 20
let cols = 20
let board
let context

// snake cord
let snakeX = blocksize * 5
let snakeY = blocksize * 5

let snakeBody = []

// velocity
let velX = 0
let velY = 0

// food cord
let foodX
let foodY

let gameOver = false

window.onload = ()=>{
    board = document.getElementById("board")
    score = document.getElementById("score")
    board.height = rows * blocksize
    board.width = cols * blocksize
    context = board.getContext("2d")  // to draw on board

    placeFood()
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000/10)  // 100 milliseconds
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x + radius, y + radius, radius, 0, Math.PI * 2);  // Draw circle
    context.fill();
    context.closePath();
}

function update() {
    if (gameOver) {
        console.log('gameover')
        return
    }

    context.fillStyle = "white";
    context.fillRect(0, 0, board.width, board.height)
    
    context.fillStyle = "red";
    drawCircle(foodX, foodY, blocksize / 2);
    // context.fillRect(foodX, foodY, blocksize, blocksize)

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
        score.textContent = parseInt(score.textContent) + 1
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    snakeX += velX * blocksize
    snakeY += velY * blocksize
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blocksize, blocksize)
    context.fillStyle = "green";
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize )
    }

    if (snakeX < 0 || snakeX >= cols * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        gameOver = true;
        return
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velY != 1) {
        velX = 0
        velY = -1
    }
    else if (e.code == "ArrowDown" && velY != -1) {
        velX = 0
        velY = 1
    }
    else if (e.code == "ArrowLeft" && velX != 1) {
        velX = -1
        velY = 0
    }
    else if (e.code == "ArrowRight" && velX != -1) {
        velX = 1
        velY = 0
    }
}

function placeFood() {
    // floor(0-1 * 0-19.99) = 0-19
    foodX = Math.floor(Math.random() * cols) * blocksize
    foodY = Math.floor(Math.random() * rows) * blocksize
}