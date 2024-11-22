let blocksize = 20
let rows
let cols
let board
let context

// snake cord
let snakeX
let snakeY

let snakeBody = []

// velocity
let velX = 0
let velY = 0

// food cord
let foodX
let foodY
let snakeSpeed = 5
let gameOver = false

window.onload = ()=>{
    board = document.getElementById("board")
    score = document.getElementById("score")

    // Set the canvas to fill the parent div's size (class="content")
    const contentDiv = document.querySelector('.content')
    const contentWidth = contentDiv.offsetWidth
    const contentHeight = contentDiv.offsetHeight

    // Set the canvas size
    board.width = contentWidth
    board.height = contentHeight

    // Dynamically calculate rows and cols based on the board size
    rows = Math.floor(board.height / blocksize)
    cols = Math.floor(board.width / blocksize)

    context = board.getContext("2d")  // to draw on board

    snakeX = Math.floor(cols / 2) * blocksize  // Center x position
    snakeY = Math.floor(rows / 2) * blocksize  // Center y position

    placeFood()
    document.addEventListener("keyup", changeDirection)
    document.addEventListener("keydown", function(e) {
        if (gameOver && e.code == "KeyF") {
            restartGame()
        }
    })
    setInterval(update, 1000/30)  // FPS
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x + radius, y + radius, radius, 0, Math.PI * 2)  // Draw circle
    context.fill()
    context.closePath()
}

function update() {
    if (gameOver) {
        context.fillStyle = "#fff"
        context.font = "30px Arial"
        context.fillText("Game Over", board.width / 2 - 80, board.height / 2 - 20)
        context.fillText("Press F to Restart", board.width / 2 - 120, board.height / 2 + 20)
        return
    }

    context.fillStyle = "#121212"
    context.fillRect(0, 0, board.width, board.height)
    
    context.fillStyle = "red"
    drawCircle(foodX, foodY, blocksize / 2)

    if (
        (snakeX == foodX && snakeY == foodY) || 
        (snakeX == foodX - 5 && snakeY == foodY - 5) ||
        (snakeX == foodX - 5 && snakeY == foodY + 5) ||
        (snakeX == foodX + 5 && snakeY == foodY + 5) ||
        (snakeX == foodX + 5 && snakeY == foodY - 5) ||
        (snakeX == foodX - 10 && snakeY == foodY - 10) ||
        (snakeX == foodX - 10 && snakeY == foodY + 10) ||
        (snakeX == foodX + 10 && snakeY == foodY + 10) ||
        (snakeX == foodX + 10 && snakeY == foodY - 10)
    ){
        snakeBody.push([foodX, foodY])
        placeFood()
        score.textContent = parseInt(score.textContent) + 1
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    snakeX += velX * snakeSpeed
    snakeY += velY * snakeSpeed
    context.fillStyle = "#fff"
    drawCircle(snakeX, snakeY, blocksize / 2);
    context.fillStyle = "#b8b8b8"
    for (let i = 0; i < snakeBody.length; i++){
        drawCircle(snakeBody[i][0], snakeBody[i][1], blocksize / 2)
    }

    if (snakeX < 0 || snakeX >= cols * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        gameOver = true
        return
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true
        }
    }
}

function restartGame() {
    // Reset all variables
    snakeX = Math.floor(cols / 2) * blocksize
    snakeY = Math.floor(rows / 2) * blocksize
    snakeBody = []
    velX = 0
    velY = 0
    snakeSpeed = 5
    gameOver = false
    score.textContent = "0"
    placeFood()
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