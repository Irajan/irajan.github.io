class GameController {
  static controls = new Array().concat(CONTROLLER_KEYS);
  constructor(canvas) {
    //If no controlling keys are available return
    if (GameController.controls.length === 0) {
      return;
    }

    this.controlKey = GameController.controls.shift();

    this.canvas = canvas;
    this.currentScreenIndex = 0;
    this.highScore = 0;
    this.gameSpeed = 5;

    this.assets = {};
    this.loadAssets();
  }

  loadAssets() {
    const assets = document.images;
    let assetCount = assets.length;

    for (let i = 0; i < assets.length; i++) {
      const id = assets[i].id;
      this.assets = { ...this.assets, [id]: assets[i] };

      if (assetCount === 1) {
        this.show();
      }

      if (assets[i].complete) {
        --assetCount;
        continue;
      }

      assets[i].addEventListener('load', () => {
        --assetCount;
      });
    }
  }

  show() {
    this.currentScreenIndex = 0;
    const ctx = this.canvas.getContext('2d');

    ctx.drawImage(this.assets.background, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    const playBtn = this.assets.playBtn;

    let sx = 0;
    let sy = 0;
    let sw = playBtn.width;
    let sh = playBtn.height;
    let dx = (SCREEN_WIDTH / 11) * 5;
    let dy = (SCREEN_HEIGHT / 11) * 5;
    let dw = SCREEN_WIDTH / 11;
    let dh = SCREEN_HEIGHT / 11;

    ctx.drawImage(playBtn, sx, sy, sw, sh, dx, dy, dw, dh);

    const gameName = this.assets.gameName;
    sw = gameName.width;
    sh = gameName.height;
    dx = SCREEN_WIDTH / 3;
    dy = SCREEN_HEIGHT / 6;
    dw = SCREEN_WIDTH / 3;
    dh = SCREEN_HEIGHT / 4 - 100;

    ctx.drawImage(gameName, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  play() {
    this.currentScreenIndex = 1;

    let gameSpeed = this.gameSpeed;
    const highScore = this.highScore;
    const assets = this.assets;
    const ctx = this.canvas.getContext('2d');
    const bird = new Bird(OFFSET_X, SCREEN_HEIGHT / 4, assets.bird);
    const obstacles = new Array();

    let requestId = requestAnimationFrame(animate);
    let x = 0;
    let speed = 0;
    let speedModifier = 1;
    let gravity = 0.05;
    let gravitySpeed = 0;

    window.addEventListener(
      'keyup',
      function (e) {
        e.preventDefault();
        if (e.key === this.controlKey) {
          bird.applyForce(30);
          gravitySpeed = 0;
        }
      }.bind(this)
    );

    const gameOver = (id) => {
      cancelAnimationFrame(id);

      if (bird.score > highScore) {
        this.highScore = bird.score;
      }

      this.displayOver(bird.score);
    };

    function animate() {
      requestId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      speed = gameSpeed * speedModifier;
      speedModifier += 0.001;

      //Draw for the first cycle
      ctx.drawImage(assets.background, x, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      ctx.drawImage(assets.topWall, x, 0, SCREEN_WIDTH, SCREEN_HEIGHT / 10);
      ctx.drawImage(
        assets.bottomWall,
        x,
        (9 * SCREEN_HEIGHT) / 10,
        SCREEN_WIDTH,
        SCREEN_HEIGHT / 10
      );

      //Draw for next cycle
      ctx.drawImage(
        assets.background,
        SCREEN_WIDTH + x,
        0,
        SCREEN_WIDTH,
        SCREEN_HEIGHT
      );
      ctx.drawImage(
        assets.topWall,
        x + SCREEN_WIDTH,
        0,
        SCREEN_WIDTH,
        SCREEN_HEIGHT / 10
      );
      ctx.drawImage(
        assets.bottomWall,
        x + SCREEN_WIDTH,
        (9 * SCREEN_HEIGHT) / 10,
        SCREEN_WIDTH,
        SCREEN_HEIGHT / 10
      );

      if (x < -SCREEN_WIDTH) {
        x = 0;

        const topVertical = randomInt(
          (3 * SCREEN_HEIGHT) / 10,
          (SCREEN_HEIGHT / 10) * 7
        );
        const newObstacle = new Obstacle(
          SCREEN_WIDTH,
          topVertical,
          PIPE_VERTICAL_GAP,
          assets.downPipe,
          assets.upPipe
        );
        obstacles.push(newObstacle);
      }

      ctx.font = '48px Arial';
      ctx.fillText('' + bird.score, 50, 40);

      if (bird.y < SCREEN_HEIGHT / 10 || bird.y > (8 * SCREEN_HEIGHT) / 10) {
        gameOver(requestId);
      }

      bird.applyForce(-gravitySpeed);

      bird.draw(ctx);
      bird.update();

      gravitySpeed += gravity;

      x -= speed;

      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update(speed);

        const checkHorizantal = bird.x > obstacles[i].x;
        const checkVertical =
          bird.y > obstacles[i].y + obstacles[i].gap || bird.y < obstacles[i].y;

        if (obstacles[i].x + 60 < 0) {
          bird.score++;
          obstacles.splice(i, 1);
        }
        obstacles[i].draw(ctx);

        if (checkHorizantal && checkVertical) {
          gameOver(requestId);
        }
      }
    }
  }

  displayOver(score) {
    this.currentScreenIndex = 2;

    const ctx = this.canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    const playBtn = this.assets.playBtn;

    let sx = 0;
    let sy = 0;
    let sw = playBtn.width;
    let sh = playBtn.height;
    let dx = (SCREEN_WIDTH / 11) * 5;
    let dy = (SCREEN_HEIGHT / 11) * 5;
    let dw = SCREEN_WIDTH / 11;
    let dh = SCREEN_HEIGHT / 11;

    ctx.drawImage(playBtn, sx, sy, sw, sh, dx, dy, dw, dh);

    const over = this.assets.over;
    sw = over.width;
    sh = over.height;
    dx = SCREEN_WIDTH / 3;
    dy = SCREEN_HEIGHT / 6;
    dw = SCREEN_WIDTH / 3;
    dh = SCREEN_HEIGHT / 4 - 100;

    ctx.drawImage(over, sx, sy, sw, sh, dx, dy, dw, dh);

    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(
      'Your Socre : ' + score,
      SCREEN_WIDTH / 2.5 + 40,
      SCREEN_HEIGHT / 2 + 60
    );
    ctx.fillText(
      'High Socre : ' + this.highScore,
      SCREEN_WIDTH / 2.5 + 40,
      SCREEN_HEIGHT / 2 + 90
    );
    ctx.font = '16px Arial';
    ctx.fillText(
      'Click to restart',
      SCREEN_WIDTH / 2.5 + 45,
      SCREEN_HEIGHT / 2 - 35
    );
    ctx.fillText(
      'Click anywhere to exit',
      SCREEN_WIDTH / 2.5,
      SCREEN_HEIGHT / 2 + 120
    );
  }

  handleClick(x, y) {
    switch (this.currentScreenIndex) {
      case 0: {
        const horizantalCheck =
          x > (5 * SCREEN_WIDTH) / 11 && x < (6 * SCREEN_WIDTH) / 11;

        const verticalCheck =
          y > (5 * SCREEN_HEIGHT) / 11 && y < (6 * SCREEN_HEIGHT) / 11;

        if (horizantalCheck && verticalCheck) {
          this.play();
        }
        break;
      }

      case 1: {
        break;
      }

      case 2: {
        const horizantalCheck =
          x > (5 * SCREEN_WIDTH) / 11 && x < (6 * SCREEN_WIDTH) / 11;

        const verticalCheck =
          y > (5 * SCREEN_HEIGHT) / 11 && y < (6 * SCREEN_HEIGHT) / 11;

        if (horizantalCheck && verticalCheck) {
          this.play();
          break;
        }

        this.show();
      }

      default: {
        break;
      }
    }
  }
}
