window.addEventListener('keydown', keyPressed);
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let game;

// canvas.width / 2 = một nửa chiều rộng
// canvas.height / 2 = một nửa chiều cao
// vị trí sẽ là ở giữa canvas
// Character(x, y, width, height, speed, color);
let myCharacter = new Character(canvas.width / 2, canvas.height / 2, 20, 20, 10, '#000000');
let enemy = new Character(0, 0, 30, 30, 20, '#ff0000');

function keyPressed(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            // Thay đổi hướng của đối tượng
            myCharacter.changeDirection(event.key);
            if (!isOutScreen(myCharacter)) {
                myCharacter.move(event.key);
            }
    }
}

// Hàm để start game
function startGame() {
    game = setInterval(updateScreen, 70);
}

// Hàm để stop game
function stopGame() {
    clearInterval(game);
}

// vẽ nhân vật bằng các truyền đối tượng đó vào tham số của hàm
// sử dụng cách vẽ hình chữ nhật tượng trưng
function drawCharacter(character) {
    context.beginPath();
    context.fillStyle = character.color;
    context.rect(character.x, character.y, character.width, character.height);
    context.fill();
    context.closePath();
}

function updateScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height); // xóa mọi thứ hiển thị trên canvas
    drawCharacter(myCharacter);
    drawCharacter(enemy);
    if (isInteractObj(myCharacter, enemy)) {
        alert('GAME OVER!');
        stopGame();
    }
}

// Hàm tạo số ngẫu nhiên từ min -> max nhập tham số
function randNum(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

// Hàm trả về 1 hướng ngẫu nhiên
function randomDirection() {
    let array = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    // lấy số ngẫu nhiên từ 0 -> 3 do mảng có 4 phần tử
    // max = 3 bởi index bắt đầu từ 0 [0, 1, 2, 3];
    return array[randNum(0, 3)];
}

function isInteractObj(obj1, obj2) {
    let left1 = obj1.x;
    let right1 = obj1.x + obj1.width;
    let top1 = obj1.y;
    let bottom1 = obj1.y + obj1.height;
    let left2 = obj2.x;
    let right2 = obj2.x + obj2.width;
    let top2 = obj2.y;
    let bottom2 = obj2.y + obj2.height;
    if (right1 < left2 || bottom1 < top2 || left1 > right2 || top1 > bottom2) {
        return false;
    } else {
        return true;
    }
}

// kiểm tra xem nhân vật có ở trong canvas không
// đảm bảo không đi ra khỏi màn hình
// trả về true nếu bước di chuyển tiếp theo là ra khỏi canvas
function isOutScreen(character) {
    let charLeft = character.x - character.speed;
    let charTop = character.y - character.speed;
    let charRight = character.x + character.width + character.speed;
    let charBottom = character.y + character.height + character.speed;
    let screenRight = canvas.width;
    let screenBottom = canvas.height;
    let direction = character.direction;
    if (direction == 'ArrowUp' && charTop < 0) {
        return true;
    } else if (direction == 'ArrowDown' && charBottom > screenBottom) {
        return true;
    } else if (direction == 'ArrowLeft' && charLeft < 0) {
        return true;
    } else if (direction == 'ArrowRight' && charRight > screenRight) {
        return true;
    }
    return false;
}