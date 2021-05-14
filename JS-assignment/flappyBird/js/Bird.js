class Bird {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.width = this.image.width + 20;
    this.height = this.image.height / 5;
    this.clipIndex = 0;
    this.score = 0;
  }

  update() {
    this.clipIndex = (this.clipIndex + 1) % 5;
  }

  applyForce(value) {
    this.y -= value;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      this.height * this.clipIndex,
      this.width,
      this.height,
      10,
      this.y,
      BIRD_SIZE,
      BIRD_SIZE
    );
  }
}
