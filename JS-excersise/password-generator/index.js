/*	Helper functions  */

var $ = function (element) {
	var nodeList = document.querySelectorAll(element);
	if (nodeList.length == 1) return nodeList[0];

	return nodeList;
};

var randomSelect = function (selectionArray) {
	var randomFloat = Math.random() * selectionArray.length;
	var index = Math.floor(randomFloat);

	return selectionArray[index];
};

/* Get DOM elements  */
var passwordLengthSlider = $('#length-slider');
var passwordLengthInput = $('#password-length');
var lowerCaseOption = $('#option-lowercase');
var upperCaseOption = $('#option-uppercase');
var numberOption = $('#option-number');
var symbolOption = $('#option-symbols');
var togglerSwitches = $('.toggler');
var form = $('form');
var outputWrapper = $('.output');
var outputText = $('.output-text');
var copyBtn = $('#copy-btn');

var backgroundColor, textColor, passwordOutput;
var rootElement = document.documentElement;
var rootElementStyle = getComputedStyle(rootElement);

backgroundColor = rootElementStyle.getPropertyValue('--background-color');
textColor = rootElementStyle.getPropertyValue('--text-color');

/* Setup an event listeners */
$('#theme-controller').addEventListener('click', function () {
	rootElement.style.setProperty('--background-color', textColor);
	rootElement.style.setProperty('--text-color', backgroundColor);

	var temp = backgroundColor;
	backgroundColor = textColor;
	textColor = temp;
});

passwordLengthInput.addEventListener('change', handleLengthChange);
passwordLengthSlider.addEventListener('change', handleLengthChange);

/* Length change handler function*/
function handleLengthChange() {
	passwordLengthInput.value = passwordLengthSlider.value = this.value;

	if (!outputWrapper.classList.contains('d-n'))
		$("button[type='submit']").click();
}

togglerSwitches.forEach(function (toggleSwitch) {
	toggleSwitch.addEventListener('click', function () {
		this.parentNode.children[0].click();
	});
});

passwordOutput = document.createElement('input');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	var options = {
		lowerCase: lowerCaseOption.checked,
		upperCase: upperCaseOption.checked,
		numbers: numberOption.checked,
		symbols: symbolOption.checked,
	};
	if (
		!(
			options.lowerCase ||
			options.upperCase ||
			options.numbers ||
			options.symbols
		)
	)
		options.lowerCase = true;

	var password = generatePassword(passwordLengthInput.value, options);

	outputWrapper.classList.remove('d-n');
	outputText.textContent = password;
	passwordOutput.value = password;

	copyBtn.textContent = 'Copy';
});

copyBtn.addEventListener('click', function () {
	console.log(passwordOutput);

	document.body.appendChild(passwordOutput);
	passwordOutput.select();
	document.execCommand('copy');
	document.body.removeChild(passwordOutput);

	this.textContent = 'Copied !';
});

/*
	Password Generation
*/

var numbers = new Array();
var upperLetters = new Array();
var lowerLetters = new Array();
var symbols = [
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'_',
	'-',
	'+',
	'=',
];

for (var i = 0; i <= 9; i++) numbers.push(i);
for (i = 65; i <= 90; i++) upperLetters.push(String.fromCharCode(i));
for (i = 97; i <= 122; i++) lowerLetters.push(String.fromCharCode(i));

function generatePassword(length, options) {
	var password = '';

	var selectionArray = new Array();
	if (options.lowerCase) selectionArray.push(lowerLetters);
	if (options.upperCase) selectionArray.push(upperLetters);
	if (options.numbers) selectionArray.push(numbers);
	if (options.symbols) selectionArray.push(symbols);

	for (var i = 0; i < length; i++)
		password += randomSelect(randomSelect(selectionArray));

	return password;
}
