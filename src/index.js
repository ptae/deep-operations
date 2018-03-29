const isPrimitive = arg => arg !== Object(arg);

const unique = arrArg => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
};

const bothIsObject = (objOne, objTwo, key) =>
  objOne[key] &&
  typeof objOne[key] === 'object' &&
  (objTwo[key] && typeof objTwo[key] === 'object');

const bothIsArray = (objOne, objTwo, key) =>
  objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));

const deepMergeTwoObjects = (objOne, objTwo) => {
  const objOneKeys = Object.keys(objOne);
  const objTwoKeys = Object.keys(objTwo);

  return objTwoKeys.reduce((accumulator, currKey) => {
    const oneHasKey = objOneKeys.includes(currKey);

    const isArray = bothIsArray(objOne, objTwo, currKey);
    const isObject = bothIsObject(objOne, objTwo, currKey);

    const mergeArrays = () => unique(objOne[currKey].concat(objTwo[currKey]));
    const mergeObject = () => isObject && deepMergeTwoObjects(objOne[currKey], objTwo[currKey]);

    const mergedObject = isArray ? mergeArrays() : mergeObject();

    const result = isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject;
    const putIfNew = !oneHasKey ? objTwo[currKey] : result;

    return { ...accumulator, [currKey]: putIfNew };
  }, {});
};

export const sortObjKeys = obj => {
  const orederedKeys = Object.keys(obj).sort();
  return orederedKeys.reduce((accumulator, currVal) => {
    return { ...accumulator, [currVal]: obj[currVal] };
  }, {});
};

export const flatValues = obj => {
  const alreadyArray = Array.isArray(obj);
  const values = alreadyArray ? obj : Object.values(obj);

  return values.reduce((accumulator, currVal) => {
    const isObject = typeof currVal === 'object' && !Array.isArray(currVal);
    const turnToArray = isObject ? flatValues(currVal) : [currVal];

    return [...accumulator, ...turnToArray];
  }, []);
};

/**
 * Will mount a diff between two objects
 */
export const objectDiff = (objOne, objTwo, { shallow = false }) => {
  const keysOne = Object.keys(objOne);
  const keysTwo = Object.keys(objTwo);
  const CHANGED = 'changed';
  const NOT_CHANGED = 'not changed';
  const NEW_KEY = 'new key';

  const diffObject = keysTwo.reduce((accumulator, currVal) => {
    const hasKey = keysOne.includes(currVal);

    const isChanged =
      hasKey &&
      JSON.stringify(sortObjKeys(objOne[currVal])) !== JSON.stringify(sortObjKeys(objTwo[currVal]));

    const diffValue = isChanged ? CHANGED : NOT_CHANGED;
    const defineIfIsNew = hasKey ? diffValue : NEW_KEY;
    const isObject = bothIsObject(objOne, objTwo, currVal);

    const recursiveStrategy = () =>
      isObject ? objectDiff(objOne[currVal], objTwo[currVal], { shallow })[0] : defineIfIsNew;

    const diffStrategy = () => (shallow ? defineIfIsNew : recursiveStrategy());

    return {
      ...accumulator,
      [currVal]: diffStrategy(),
    };
  }, {});

  const diffFlat = flatValues(diffObject);
  const hasDiff = diffFlat.includes(CHANGED) || diffFlat.includes(NEW_KEY);

  return [diffObject, hasDiff];
};

/**
 * Deep merges a list of objects
 * @param { vararg } objs list of objects to merge
 */
export const deepMerge = (...objs) => {
  const firstObject = { ...objs[0] };

  return objs.reduce(
    (accumulator, currVal) => deepMergeTwoObjects(accumulator, currVal),
    firstObject,
  );
};

export default {
  objectDiff,
  deepMerge,
  flatValues,
  sortObjKeys,
};
