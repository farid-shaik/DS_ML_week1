function Opponent() {
    this.w = 80;
    this.h = 160;

    this.x = floor(random(0, width-this.w));
    this.y = -this.h;
    this.speed = playerSpeed-1;

    this.isOvertakenBy = false;

    this.show = function() {
       fill(255,0,0);
        rect(this.x, this.y,80,160);
    }

    this.update = function() {
        this.y += this.speed;
    }

    this.offscreen = function() {
        return (this.y > height);
    }

    this.overtakenBy = function(player) {
        if (player.y < this.y) {
            return true;
        }
    }

    this.hits = function(player) {
        if (player.y < this.y+this.h && player.y+player.h > this.y) {
            if (player.x < this.x+this.w && player.x+player.w > this.x) {
                return true;
            }
        }
    }

    this.boom = function() {
    }
}
