export const isPrimitive = arg => arg !== Object(arg);

export const unique = arrArg => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
};

export const isBothObject = (objOne, objTwo, key) =>
  objOne[key] &&
  typeof objOne[key] === 'object' &&
  (objTwo[key] && typeof objTwo[key] === 'object');

export const isBothArray = (objOne, objTwo, key) =>
  objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));
