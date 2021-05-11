/**
 * Takes CSS selectors as input and returns corresponding Node or NodeList.
 * @param  {selector}  CSS selector
 *
 * @returns DOM element(s) corresponding to selector
 */
var $ = function (selector) {
	var nodeList = document.querySelectorAll(selector);
	if (nodeList.length == 1) return nodeList[0];

	return nodeList;
};

/**
 * generates random number between interval [a,b] or array.
 * @param {a} lowerInterval value or an array
 * @param {b} upperInterval value
 *
 * @returns random number between a and b or random element from array a
 */
function random(a, b = 0) {
	if (a instanceof Array) return a[randomInt(a.length - 1)];

	return Math.random() * (b - a) + a;
}

/**
 * returns rounded integer between two numbers.
 */
function randomInt(a, b = 0) {
	return Math.round(random(a, b));
}

/**
 * Generates random color and returns it.
 * @param { options } array of colours (optional)
 *
 * @returns valid colours
 */
function getRandomColor(options) {
	if (options) return random(options);

	const red = randomInt(0, 255);
	const green = randomInt(0, 255);
	const blue = randomInt(0, 255);

	return `rgb(${red},${green},${blue})`;
}

/**
 * Calculates distance between two points.
 * @parms {p1,p2} points in 2d-coordinate
 *
 * @returns distance between p1 and p2
 */
function getDistance(p1, p2) {
	const diffX = p1.x - p2.x;
	const diffY = p1.y - p2.y;

	return Math.sqrt(diffX ** 2 + diffY ** 2);
}
