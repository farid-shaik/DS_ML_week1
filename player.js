function Player() {
    this.w = 80;
    this.h = 160;

    this.x = floor(width/2 - this.w/2);
    this.y = floor((3 * height/4) - this.h/2);

    this.show = function() {
      fill(0,255,0);
        rect(this.x, this.y,80,160);
    }

    this.turnLeft = function() {
        this.x -= 5;
        this.x = constrain(this.x, 0, width-this.w);
    }

    this.turnRight = function() {
        this.x += 5;
        this.x = constrain(this.x, 0, width-this.w);
    }
}
