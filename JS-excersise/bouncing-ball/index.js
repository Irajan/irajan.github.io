
var ball = document.createElement("div");
var bouncer = document.getElementById("bouncer");
var topLimit = 0;
var bottomLimit = bouncer.clientHeight - 100;

var leftLimit = 0;
var rightLimit = bouncer.clientWidth - 100;

ball.classList.add("ball");
ball.style.left = "200px";

bouncer.appendChild(ball);

var positionY = Math.ceil(Math.random() * 500);
var dirY = 1;

var positionX = Math.ceil(Math.random() * 500);
var dirX = 1;

setInterval(function () {
	if (positionY == bottomLimit || positionY == topLimit) dirY = -dirY;
	if (positionX == leftLimit || positionX == rightLimit) dirX = -dirX;

	positionY += dirY;
	positionX += dirX;

	ball.style.top = positionY + "px";
	ball.style.left = positionX + "px";
}, 5);
