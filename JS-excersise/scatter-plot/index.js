/* 
		Scatter Plot Section
*/

var points = generateSpots(40);
var scatterPlot = document.getElementById("scatter");

//Points generation

function generateSpots(count) {
	var spots = new Array();

	for (var i = 0; i < count; i++)
		spots.push({
			id: spots.length,
			x: Math.ceil(Math.random() * 500),
			y: Math.ceil(Math.random() * 500),
		});

	return spots;
}

//Create spots as Element

function createDots(point) {
	var dot = document.createElement("div");
	dot.classList.add("dot");
	dot.id = point.id;
	dot.style.left = point.x + "px";
	dot.style.top = point.y + "px";

	dot.addEventListener("click", function (e) {
		points = points.filter(function (p) {
			return !(p.id == e.target.id);
		});
		var element = e.target;
		element.parentNode.removeChild(element);

		console.log(points);
	});

	return dot;
}

//Rendering spot on DOM

for (var i = 0; i < points.length; i++) {
	var dot = createDots(points[i]);

	scatterPlot.appendChild(dot);
}

