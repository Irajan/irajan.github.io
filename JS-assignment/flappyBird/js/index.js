const canvas = $('canvas');

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const gameController = new GameController(canvas);

canvas.addEventListener('click', function (e) {
  const boundRect = canvas.getBoundingClientRect();
  const x = e.clientX - boundRect.left;
  const y = e.clientY - boundRect.top;
  gameController.handleClick(x, y);
});
