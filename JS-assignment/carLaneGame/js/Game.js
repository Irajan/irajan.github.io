class Game {
	static controls = new Array().concat(CONTROLLER_KEYS);

	constructor(canvas) {
		//If no control keys are available return
		if (Game.controls.length === 0) return;

		this.canvas = canvas;
		this.screenIndex = 0;
		this.controlKeys = Game.controls.pop(); //Unique controller for each instance

		this.lodedAssets = 0;
		this.backgroundImage = null;
		this.enemyCarImage = null;
		this.playerCar = null;

		this.highScore = 0;
	}

	show() {
		this.screenIndex = 0;
		const ctx = this.canvas.getContext('2d');
		if (this.loadAssets != 3) this.loadAssets();

		ctx.fillStyle = '#4e3';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		ctx.fillStyle = '#fff';
		ctx.font = '48px serif';
		ctx.fillText('Instructions', 20, 50);

		ctx.font = '20px serif';
		ctx.fillText(`Press [ ${this.controlKeys.left} ] to move left`, 20, 90);
		ctx.fillText(`Press [${this.controlKeys.right}] to move right`, 20, 120);
		ctx.fillText(`Press [${this.controlKeys.shoot}] to shoot`, 20, 150);

		ctx.fillRect(10, this.canvas.height / 2, this.canvas.width - 20, 50);
		ctx.fillStyle = '#000';
		ctx.font = '48px Arial';
		ctx.fillText('Start', this.canvas.width / 3, this.canvas.height / 2 + 40);
	}

	loadAssets() {
		if (this.lodedAssets === ASSET_COUNT) return;

		const backgroundImage = new Image();
		const enemyCar = new Image();
		const playerCar = new Image();

		backgroundImage.src = './assets/background.png';
		playerCar.src = './assets/playerCar.png';
		enemyCar.src = './assets/enemyCar.png';

		backgroundImage.addEventListener(
			'load',
			function () {
				this.backgroundImage = backgroundImage;
				this.lodedAssets++;
			}.bind(this)
		);

		playerCar.addEventListener(
			'load',
			function () {
				this.playerCar = playerCar;
				this.lodedAssets++;
			}.bind(this)
		);
		enemyCar.addEventListener(
			'load',
			function () {
				this.enemyCarImage = enemyCar;
				this.lodedAssets++;
			}.bind(this)
		);
	}

	mouseClicked(x, y) {
		switch (this.screenIndex) {
			case 0:
				if (
					y >= this.canvas.height / 2 &&
					y <= this.canvas.height / 2 + 50 &&
					this.lodedAssets == ASSET_COUNT
				)
					this.startGame();

			case 1:
				break;
			case 2:
				if (y <= 50) this.startGame();
				else this.show();
		}
	}

	startGame() {
		this.screenIndex = 1;

		const canvas = this.canvas;
		const ctx = canvas.getContext('2d');
		const background = this.backgroundImage;
		const enemyCar = this.enemyCarImage;
		const playerCar = this.playerCar;
		const highScore = this.highScore;

		const player = new Car(canvas.width / 2, canvas.height - CAR_HEIGHT);
		player.score = 0;

		const enimies = new Array();

		window.addEventListener(
			'keyup',
			function (e) {
				e.preventDefault();
				if (e.key === this.controlKeys.left) player.move(1);
				else if (e.key === this.controlKeys.right) player.move(-1);
				else if (e.key === this.controlKeys.shoot) player.fire();
			}.bind(this)
		);

		const gameOver = () => {
			this.screenIndex++;

			if (player.score > this.highScore) this.highScore = player.score;

			ctx.fillRect(0, 0, canvas.width, 50);
			ctx.fillStyle = '#fff';
			ctx.font = '32px Arial';
			ctx.fillText('Press Here to Restart', canvas.width / 4, 40);

			ctx.fillStyle = '#000';
			ctx.font = '48px Arial';
			ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
			ctx.font = '24px Arial';
			ctx.fillText(
				'Your Socre : ' + player.score,
				canvas.width / 3,
				canvas.height / 2 + 50
			);
			ctx.fillText(
				'High Socre : ' + this.highScore,
				canvas.width / 3,
				canvas.height / 2 + 70
			);
			ctx.fillText(
				'Click anywhere to exit',
				canvas.width / 4,
				canvas.height / 2 + 90
			);
		};

		let y = -canvas.height;
		let increment = 5;
		let requestId;

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(background, 0, y);
			player.draw(ctx, playerCar);
			player.bullet.y -= 5;

			if (player.bullet.y < 0) player.bullet = {};

			ctx.font = '48px Arial';
			ctx.fillText('' + player.score, 50, 50);
			ctx.fillText('' + highScore, SCREEN_WIDTH - 2 * 50, 50);
			y += increment;

			increment = increment + 0.0019;
			if (y > 0) {
				const xPositions = [
					canvas.width / 2,
					canvas.width / 2 + LANE_WIDTH,
					canvas.width / 2 - LANE_WIDTH,
				];

				const enemy1 = new Car(
					random(xPositions),
					random(-CAR_HEIGHT, -CAR_HEIGHT * 2)
				);
				const enemy2 = new Car(
					random(xPositions),
					random(-CAR_HEIGHT, -CAR_HEIGHT * 2)
				);

				if (enemy1.lane == enemy2.lane) enemy1.y -= CAR_HEIGHT * 2;

				enimies.push(enemy1);
				enimies.push(enemy2);

				y = -canvas.height;
			}

			requestId = requestAnimationFrame(animate);
			enimies.forEach(function (enemy, index) {
				enemy.y += increment;
				enemy.draw(ctx, enemyCar);

				const varticalOverlap = enemy.y > SCREEN_HEIGHT - 2 * CAR_HEIGHT;
				const horizantalOverlap = Math.abs(enemy.x - player.x) < CAR_WIDTH;

				if (varticalOverlap && horizantalOverlap) {
					cancelAnimationFrame(requestId);
					gameOver();
				}

				const bulletHit =
					player.bullet.y < enemy.y + CAR_HEIGHT &&
					player.bullet.lane == enemy.lane;

				if (enemy.y > SCREEN_HEIGHT || bulletHit) {
					if (bulletHit) player.bullet = {};
					enimies.splice(index, 1);
					player.score++;
				}
			});
		}
		animate();
	}
}
