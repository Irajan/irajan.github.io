export const multiply = (str, times) => {
  const arr = new Array(times);
  arr.fill(str);
  return arr.reduce((acc, cur) => acc + cur, str);
};

/**
 *
 */
export const typeWrite = (domElement, string, interval = 500) => {
  let displayData = domElement.innerHTML;
  const stringArray = Array.from(string);

  return new Promise(function (resolve, reject) {
    const intervalId = setInterval(() => {
      displayData += stringArray.shift(1);
      domElement.innerHTML = displayData + "|";

      if (stringArray.length === 0) {
        clearInterval(intervalId);
        domElement.innerHTML = displayData;
        resolve();
      }
    }, interval);
  });
};
