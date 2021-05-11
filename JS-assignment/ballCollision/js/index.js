const canvas = $('canvas');
const balls = new Array();

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

const width = canvas.width - OFFSET_X;
const height = canvas.height - OFFSET_Y;

/**
 * Initilization of Animation.
 */
function init() {
	while (balls.length < BALL_NUMBER) {
		const radius = randomInt(MIN_RADIUS, MAX_RADIUS);
		const colour = getRandomColor();

		let position = {
			x: randomInt(OFFSET_X + radius, width - radius),
			y: randomInt(OFFSET_Y + radius, height - radius),
		};

		while (!noOverLap(position, radius, balls)) {
			position = {
				x: randomInt(OFFSET_X + radius, width - radius),
				y: randomInt(OFFSET_Y + radius, height - radius),
			};
		}

		const ball = new Ball(radius, colour, position);
		balls.push(ball);
		ball.draw(canvas);
	}
}

function update() {
	balls.forEach(function (ball, index) {
		checkCollision(index, ball);
		ball.update();
		ball.draw(canvas);
	});
}

function checkCollision(currentIndex, currentBall) {
	balls.forEach(function (ball, index) {
		if (index != currentIndex) {
			currentBall.handleCollision(ball);
		}
	});
}

/**
 * Takes ball position and radius to check ovarlapping region.
 * @param { position}  position of the ball
 * @param { radius } radius of the ball
 * @param { balls} collection of ball
 *
 * @returns true if the ball position doesnt ovarlap else false
 */

function noOverLap(position, radius, balls) {
	for (let i = 0; i < balls.length; i++) {
		const centerDistance = getDistance(position, balls[i]);
		const radiusSum = balls[i].radius + radius;

		if (centerDistance < radiusSum) return false;
	}
	return true;
}

function animate() {
	const cc = canvas.getContext('2d');
	cc.clearRect(0, 0, canvas.width, canvas.height);
	update();
	requestAnimationFrame(animate);
}

init();
animate();
