const resX = 800; const vResX = 14;
const resY = 400; const vResY = 7;

const stepX = resX / vResX;
const stepY = resY / vResY;

const UP = 1; const LEFT = 2; const DOWN = 3; const RIGHT = 4;

var snake = [
    [2, 1], // head
    [1, 1]  // tail
]

var heading = RIGHT;
var nextHeading = [];

var refreshInterval = 100;

var ctx;

function main() {

    let canvas = document.getElementsByTagName("canvas")[0];

    canvas.width = resX;
    canvas.height = resY;

    ctx = canvas.getContext("2d");

    document.onkeydown = handleInpput;

    draw();

    setInterval(() => move(), refreshInterval);
}

function draw() {
    drawSnake(snake);
    drawGrid();
}

function drawGrid() {
    ctx.strokeStyle = "rgba(255,255,255,1)";

    for (let i = stepX; i < resX; i += stepX) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, resY);
        ctx.stroke();
    }

    for (let i = stepY; i < resY; i += stepY) {
        ctx.moveTo(0, i);
        ctx.lineTo(resX, i);
        ctx.stroke();
    }
}

function drawSnake(snake, clear) {
    if (!clear) {
        ctx.fillStyle = "rgba(40, 255, 40, 0.9)";
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,1)";
    }

    snake.forEach(s => {
        ctx.fillRect(s[0] * stepX, s[1] * stepY, stepX, stepY);
    });
}

function move() {

    let direction = null;

    if (nextHeading.length == 0) {
        direction = heading;
    }

    while (direction == null) {
        direction = nextHeading.shift();
        if (
            (direction == UP && heading == DOWN) ||
            (direction == DOWN && heading == UP) ||
            (direction == RIGHT && heading == LEFT) ||
            (direction == LEFT && heading == RIGHT)
        ) {
            if (nextHeading.length == 0) {
                direction = heading;
            }
            else {
                direction = null;
            }
        }
    }

    let x = 0; let y = 0;

    if (direction == UP) {
        y = -1;
    }
    else if (direction == DOWN) {
        y = 1;
    }
    else if (direction == LEFT) {
        x = -1;
    }
    else if (direction == RIGHT) {
        x = 1;
    }

    heading = direction;

    let head = snake[0];
    let newHead = [
        (head[0] + x) % vResX,
        (head[1] + y) % vResY
    ]

    if (newHead[0] < 0) {
        newHead[0] = vResX - 1;
    }
    if (newHead[1] < 0) {
        newHead[1] = vResY - 1;
    }

    snake.unshift(newHead);
    let tail = snake.pop();

    drawSnake([tail], true);
    drawGrid();
    drawSnake([newHead]);
}

function handleInpput(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        nextHeading.push(UP);
    }
    else if (e.keyCode == '40') {
        nextHeading.push(DOWN);
    }
    else if (e.keyCode == '37') {
        nextHeading.push(LEFT);
    }
    else if (e.keyCode == '39') {
        nextHeading.push(RIGHT);
    }

    return false;
}

main();