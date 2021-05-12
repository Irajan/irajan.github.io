const canvas = $('canvas');
const ants = new Array();

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

const antImage = new Image();
antImage.src = './images/ant.png';

const screenWidth = canvas.width - OFFSET_X;
const screenHeight = canvas.height - OFFSET_Y;

antImage.onload = function () {
	init();
};

/**
 * Initilization of Animation.
 */
function init() {
	while (ants.length < ANT_NUMBER) {
		let position = {
			x: randomInt(OFFSET_X, screenWidth),
			y: randomInt(OFFSET_Y, screenHeight),
		};

		while (!noOverLap(position, ANT_WIDTH, ants)) {
			position = {
				x: randomInt(OFFSET_X, screenWidth),
				y: randomInt(OFFSET_Y, screenHeight),
			};
		}

		const ant = new Ant(position, antImage);
		ants.push(ant);
		ant.draw(canvas);
	}

	canvas.addEventListener('click', function (e) {
		const boundRect = canvas.getBoundingClientRect();
		const x = e.clientX - boundRect.left;
		const y = e.clientY - boundRect.top;

		ants.forEach(function (ant, index) {
			if (
				x >= ant.x &&
				x <= ant.x + ant.width &&
				y >= ant.y &&
				y <= ant.y + ant.width
			)
				ants.splice(index, 1);
		});
	});

	animate();
}

function update() {
	ants.forEach(function (ant, index) {
		checkCollision(index, ant);
		ant.update();
		ant.draw(canvas);
	});
}

function checkCollision(currentIndex, currentAnt) {
	ants.forEach(function (ant, index) {
		if (index != currentIndex) {
			currentAnt.handleCollision(ant);
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

function noOverLap(position, width, ants) {
	for (let i = 0; i < ants.length; i++) {
		if (
			position.x < ants[i].x + ants[i].width &&
			position.x + width > ants[i].x &&
			position.y < ants[i].y + ants[i].width &&
			position.y + width > ants[i].y
		)
			return false;
	}
	return true;
}

function animate() {
	const cc = canvas.getContext('2d');
	cc.clearRect(0, 0, canvas.width, canvas.height);
	update();
	requestAnimationFrame(animate);
}
