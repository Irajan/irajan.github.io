class Obstacle {
  constructor(x, y, gap, topImg, bottomImg) {
    this.x = x;
    this.y = y;
    this.gap = gap;

    this.topImg = topImg;
    this.bottomImg = bottomImg;
  }

  update(speed) {
    this.x -= speed / 2;
  }

  draw(ctx) {
    let sx = 0;
    let sy = 0;
    let sw = this.topImg.width;
    let sh = this.topImg.height;

    let dx = this.x;
    let dy = 0;
    let dw = PIPE_WIDTH;
    let dh = this.y;

    ctx.drawImage(this.topImg, sx, sy, sw, sh, dx, dy, dw, dh);

    dy = dh + this.gap;
    ctx.drawImage(this.bottomImg, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}
