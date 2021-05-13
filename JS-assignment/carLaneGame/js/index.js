const manyCanvas = $('canvas');

console.log(manyCanvas);

manyCanvas.forEach((canvas) => {
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;

	const game = new Game(canvas);
	game.show();

	canvas.addEventListener('click', function (e) {
		const boundRect = canvas.getBoundingClientRect();
		const x = e.clientX - boundRect.left;
		const y = e.clientY - boundRect.top;

		game.mouseClicked(x, y);
	});
});
