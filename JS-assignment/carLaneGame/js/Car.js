class Car {
	constructor(x, y, moving = false) {
		this.x = x;
		this.y = y;
		this.moving = moving;
		this.bullet = {};
		this.lane = Math.round(this.x / (SCREEN_WIDTH / 2));
	}

	draw(ctx, image) {
		if (this.bullet.y) {
			ctx.beginPath();
			ctx.rect(this.bullet.x, this.bullet.y, 5, 10);
			ctx.fill();
			ctx.closePath();
		}
		ctx.drawImage(image, this.x - CAR_WIDTH / 2, this.y, CAR_WIDTH, CAR_HEIGHT);
	}

	/**
	 * Move the horizantal posiiton of car
	 *
	 * @param { leftOrRight } value of 1 implies moving left -1 implies moving right
	 */

	move(leftOrRight) {
		if (this.moving) return;

		const targentPosition = this.x - leftOrRight * LANE_WIDTH;
		if (
			targentPosition < BOUNDARIES_WIDTH ||
			targentPosition > SCREEN_WIDTH - BOUNDARIES_WIDTH
		)
			return;

		const pxPerMS = LANE_WIDTH / TRANSITION_TIME;

		const interval = setInterval(() => {
			this.x -= leftOrRight * pxPerMS;

			if (leftOrRight * this.x <= leftOrRight * targentPosition) {
				clearInterval(interval);
			}
		}, TRANSITION_DELAY);
	}

	fire() {
		if (!this.bullet.y) {
			this.bullet.y = this.y;
			this.bullet.x = this.x;
			this.bullet.lane = Math.round(this.x / (SCREEN_WIDTH / 2));
		}
	}
}
