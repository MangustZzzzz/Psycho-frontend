export const tableCreator = (numOfStr, numOfQuestions) => {
  const column = Math.ceil(numOfQuestions - 1 / numOfStr);
  let arr = new Array(numOfStr);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [];
    for (let k = 0; k < column; k++) {
      if (i + k * numOfStr > numOfQuestions - 1) break;
      arr[i].push(i + k * numOfStr);
    }
  }
  return arr;
};
