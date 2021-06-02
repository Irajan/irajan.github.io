const fs = require('fs');

//Read from file
fs.readFile('./files/read.txt', 'utf-8', (err, data) => {
	if (err) {
		throw err;
	}
	console.log(data);
});

//Write to file
const text = 'Written by file system module';
fs.writeFile('./files/write.txt', text, function (err) {
	if (err) {
		throw err;
	}
	console.log('File Written successfully');
});

//Append to file
const dataToAppend = '\nI want this to be added';
fs.appendFile('./files/append.txt', dataToAppend, (err) => {
	if (err) {
		throw err;
	}
	console.log(dataToAppend + ' has been appended to file');
});

//Delete file
fs.unlink('./files/deleteMe.txt', (err) => {
	if (err) {
		throw err;
	}
	console.log('File deleted successfully');
});

//Modify File
fs.readFile('./files/modifyMe.txt', 'utf-8', (err, data) => {
	if (err) {
		throw err;
	}

	const newData = data.replace('monkey', 'dog');

	fs.writeFile('./files/modifyMe.txt', newData, (err) => {
		if (err) {
			throw err;
		}
		console.log('Modification Complete');
	});
});
