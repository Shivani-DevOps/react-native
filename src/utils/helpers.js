const GetSumOfSpecificKeyValueInArray = (array, key) => {
  let count = 0;
  array.map((item, index) => {
    count = count + item[key];
  });
  return count;
};

export {
  GetSumOfSpecificKeyValueInArray,
};
