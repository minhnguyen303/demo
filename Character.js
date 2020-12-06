class Character {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.direction = 'ArrowUp';
    }

    /*
    * Method đặt vị trí cho character
    * nhận 2 tham số là x và y
    * set = đặt | position = vị trí
    */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }


    /*
    * Thay đổi hướng di chuyển của character
    * nhận vào 1 tham số là direction
    */
    changeDirection(direction){
        this.direction = direction;
    }


    /*
    * Method di chuyển character
    * thực chất chỉ thay đổi tọa độ
    * và canvas sẽ vẽ lại
    */
    move(direction){
        switch (direction) {
            case 'ArrowUp':
                this.y -= this.speed;
                break;
            case 'ArrowDown':
                this.y += this.speed;
                break;
            case 'ArrowLeft':
                this.x -= this.speed;
                break;
            case 'ArrowRight':
                this.x += this.speed;
                break;
        }
    }
}