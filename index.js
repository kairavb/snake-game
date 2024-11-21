let blocksize = 25
let rows = 20
let cols = 20
let board
let context

let snakeX = blocksize * 5
let snakeY = blocksize * 5

let velX = 0
let velY = 0

let foodX
let foodY

window.onload = ()=>{
    board = document.getElementById("board")
    board.height = rows * blocksize
    board.width = cols * blocksize
    context = board.getContext("2d");

    placeFood()
    document.addEventListener("keyup", changeDirection)
    update()
}

function update() {
    context.fillStyle = "white";
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blocksize, blocksize)

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize)
}

function changeDirection(e) {

}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize
    foodY = Math.floor(Math.random() * rows) * blocksize
}