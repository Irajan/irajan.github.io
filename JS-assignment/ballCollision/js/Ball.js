function Ball(r, clr, pos) {
	this.radius = r;
	this.color = clr;
	this.x = pos.x;
	this.y = pos.y;
	this.dx = random([-1, 1]);
	this.dy = random([-1, 1]);
	this.collidedWith = null;
}

Ball.prototype.draw = function (canvas) {
	const cc = canvas.getContext('2d');

	cc.beginPath();
	cc.fillStyle = this.color;
	cc.arc(this.x, this.y, this.radius, 0, PI * 2);
	cc.closePath();
	cc.fill();
};

Ball.prototype.handleCollision = function (nextBall) {
	const centerDistance = getDistance(this, nextBall);
	const radiusSum = this.radius + nextBall.radius;

	if (centerDistance < radiusSum) {
		this.dx = -this.dx;
		this.dy = -this.dy;

		this.x += (radiusSum - centerDistance) * this.dx;
		this.y += (radiusSum - centerDistance) * this.dy;

		nextBall.dx = -nextBall.dx;
		nextBall.dy = -nextBall.dy;

		nextBall.x += (radiusSum - centerDistance) * nextBall.dx;
		nextBall.y += (radiusSum - centerDistance) * nextBall.dy;
	}
};

Ball.prototype.update = function () {
	this.x += this.dx;
	this.y += this.dy;

	if (this.x > width - this.radius) this.dx = -1;
	else if (this.x < this.radius + OFFSET_X) this.dx = 1;

	if (this.y > height - this.radius) this.dy = -1;
	else if (this.y < this.radius + OFFSET_Y) this.dy = 1;
};
