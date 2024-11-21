let blocksize = 25
let rows = 20
let board
let context

window.onload = ()=>{
    board = document.getElementById("board")
    board.height = rows * blocksize
    board.width = cols * blocksize
    context = board.getContext("2d");

    update();
}