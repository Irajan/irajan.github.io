function Ant(pos, image) {
	this.x = pos.x;
	this.y = pos.y;
	this.image = image;
	this.dx = random([-1, 1]);
	this.dy = random([-1, 1]);
	this.width = this.image.width;
}

Ant.prototype.draw = function (canvas) {
	const cc = canvas.getContext('2d');
	cc.drawImage(this.image, this.x, this.y);
};

Ant.prototype.handleCollision = function (nextAnt) {
	const collisionWidth = this.width - 50;

	if (
		this.x < nextAnt.x + collisionWidth &&
		this.x + collisionWidth > nextAnt.x &&
		this.y < nextAnt.y + collisionWidth &&
		this.y + collisionWidth > nextAnt.y
	) {
		const tempX = this.dx;
		const tempY = this.dy;

		this.dx = nextAnt.dx;
		this.dy = nextAnt.dy;

		nextAnt.dx = tempX;
		nextAnt.dy = tempY;
	}
};

Ant.prototype.update = function () {
	this.x += this.dx;
	this.y += this.dy;

	if (this.x > screenWidth - this.width) {
		this.dx = -1;
	} else if (this.x < OFFSET_X) {
		this.dx = 1;
	}

	if (this.y > screenHeight - this.width) {
		this.dy = -1;
	} else if (this.y < OFFSET_Y) {
		this.dy = 1;
	}
};
