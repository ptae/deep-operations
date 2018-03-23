const isPrimitive = arg => arg !== Object(arg);

const unique = arrArg => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
};

const deepMergeTwoObjects = (objOne, objTwo) => {
  const objOneKeys = Object.keys(objOne);
  const objTwoKeys = Object.keys(objTwo);

  return objTwoKeys.reduce((accumulator, currKey) => {
    const oneHasKey = objOneKeys.includes(currKey);

    const isArray = oneHasKey && Array.isArray(objTwo[currKey]);
    const isObject = oneHasKey && objTwo[currKey] && typeof objTwo[currKey] === 'object';

    const mergeArrays = () => unique(objOne[currKey].concat(objTwo[currKey]));
    const mergeObject = () => isObject && deepMergeTwoObjects(objOne[currKey], objTwo[currKey]);

    const mergedObject = isArray ? mergeArrays() : mergeObject();

    const result = isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject;
    const putIfNew = !oneHasKey ? objTwo[currKey] : result;

    return { ...accumulator, [currKey]: putIfNew };
  }, {});
};

/**
 * Deep merges a list of objects
 */
const deepMerge = (...objs) => {
  const firstObject = objs[0];

  return objs.reduce((accumulator, currentVal) => {}, { ...firstObject });
};

module.exports = {
  deepMergeTwoObjects,
  deepMerge,
};
