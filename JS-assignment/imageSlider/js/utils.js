/**
 * Takes CSS selectors as input and returns corresponding Node or NodeList
 * @param  {selector}  CSS selector
 * @returns DOM element(s) corresponding to selector
 */
var $ = function (selector) {
	var nodeList = document.querySelectorAll(selector);
	if (nodeList.length == 1) return nodeList[0];

	return nodeList;
};
