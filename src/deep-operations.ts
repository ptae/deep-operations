import { isBothArray, isBothObject, isPrimitive, unique } from './utils';
import { deepMergeTwoObjects } from './internals/merge';
import { Options, KeyedObject, ObjectState } from './types';

export const sortObjKeys = (obj: KeyedObject): object => {
  if (typeof obj !== 'undefined' && obj) {
    const orederedKeys = Object.keys(obj).sort();
    return orederedKeys.reduce((accumulator: object, currVal: string) => {
      return { ...accumulator, [currVal]: obj[currVal] };
    }, {});
  }
  return obj;
};

export const flatValues = (obj: any) => {
  const alreadyArray = Array.isArray(obj);
  const values = alreadyArray ? obj : Object.values(obj);

  return values.reduce((accumulator: any, currVal: any) => {
    const isObject = typeof currVal === 'object' && !Array.isArray(currVal);
    const turnToArray = isObject ? flatValues(currVal) : [currVal];

    return [...accumulator, ...turnToArray];
  }, []);
};

const hasDiff = (diffObject: object): boolean => {
  return (
    flatValues(diffObject).includes(ObjectState.CHANGED) ||
    flatValues(diffObject).includes(ObjectState.NEW_KEY)
  );
};

/**
 * Will mount a diff between two objects
 */
export const objectDiff = (objOne: any, objTwo: any, { shallow = false } = {}): any => {
  const keysOne = Object.keys(objOne);
  const keysTwo = Object.keys(objTwo);

  const diffObject = keysTwo.reduce((accumulator, currVal) => {
    const hasKey = keysOne.includes(currVal);

    const isChanged =
      hasKey &&
      JSON.stringify(sortObjKeys(objOne[currVal])) !== JSON.stringify(sortObjKeys(objTwo[currVal]));

    const diffValue = isChanged ? ObjectState.CHANGED : ObjectState.NOT_CHANGED;
    const defineIfIsNew = hasKey ? diffValue : ObjectState.NEW_KEY;
    const isObject = isBothObject(objOne, objTwo, currVal);

    const recursiveStrategy = () =>
      isObject ? objectDiff(objOne[currVal], objTwo[currVal], { shallow })[0] : defineIfIsNew;

    const diffStrategy = () => (shallow ? defineIfIsNew : recursiveStrategy());

    return {
      ...accumulator,
      [currVal]: diffStrategy()
    };
  }, {});

  return [diffObject, hasDiff(diffObject)];
};

/**
 * Deep merges a list of objects
 * @param { Object } options options to costumize objects merge
 * @param { Array } objs list of objects to merge
 * @returns a single object with merged values
 */
export const deepMerge = (options: Options): object => {
  if (typeof options.objects === 'undefined') {
    throw new Error('Objects cannot be undefined.');
  }

  const firstObject = { ...options.objects[0] };

  return options.objects.reduce(
    (accumulator: any, currVal: any) => deepMergeTwoObjects(accumulator, currVal, options),
    firstObject
  );
};

export default {
  objectDiff,
  deepMerge,
  flatValues,
  sortObjKeys
};
