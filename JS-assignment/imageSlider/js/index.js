const fasterSlider = $('#faster-slider');
const fastSlider = $('#fast-slider');
const slowSlider = $('#slow-slider');
const slowerSlider = $('#slower-slider');

window.onload = function () {
	new ImageSlider(fasterSlider, 40, 1000);
	new ImageSlider(fastSlider, 100, 2000);
	new ImageSlider(slowSlider);
	new ImageSlider(slowerSlider, 700, 4000);
};
