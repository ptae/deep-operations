import { isBothArray, isBothObject, isPrimitive, unique } from './utils';
import { deepMergeTwoObjects } from './internals/merge';
import { Options, KeyedObject, ObjectState, Primitive } from './types';

const containsValueCurrying = (obj: object) => {
  const flattedObject = deepValues(obj);
  return (value: Primitive) => flattedObject.some(element => element === value);
};

const hasDiff = (diffObject: object): boolean => {
  const diffObjectHas = containsValueCurrying(diffObject);
  return diffObjectHas(ObjectState.CHANGED) || diffObjectHas(ObjectState.NEW_KEY);
};

export const deepSortKeys = (obj: KeyedObject): object => {
  if (typeof obj !== 'undefined' && obj) {
    const orederedKeys = Object.keys(obj).sort();
    return orederedKeys.reduce((accumulator: object, currVal: string) => {
      return { ...accumulator, [currVal]: obj[currVal] };
    }, {});
  }
  return obj;
};

export const deepValues = (obj: object): any[] => {
  const values = Object.values(obj);

  return values.reduce((accumulator: any, currVal: any) => {
    const isObject = typeof currVal === 'object' && !Array.isArray(currVal);
    const currentArray = isObject ? deepValues(currVal) : [currVal];

    return [...accumulator, ...currentArray];
  }, []);
};

// export const deepKeys = (obj: object): any[] => {};

export const containsValue = (obj: object, value: Primitive): boolean => {
  return deepValues(obj).some(element => element === value);
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
      JSON.stringify(deepSortKeys(objOne[currVal])) !==
        JSON.stringify(deepSortKeys(objTwo[currVal]));

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
    (accumulator: any, currVal: any) => deepMergeTwoObjects(accumulator, currVal)(options),
    firstObject
  );
};

export default {
  deepSortKeys,
  deepValues,
  containsValue,
  objectDiff,
  deepMerge
};
