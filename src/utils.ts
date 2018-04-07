export const isPrimitive = (arg: any) => arg !== Object(arg);

export const containsOnlyPrimitives = (array: any[]): boolean =>
  array.reduce((accumulator, currentVal) => {
    return accumulator && isPrimitive(currentVal);
  }, true);

export const unique = (arrArg: Object[]) => {
  return arrArg.filter((elem, pos, arr) => {
    // tslint:disable-next-line
    return arr.indexOf(elem) == pos;
  });
};

export const isObject = (obj: any): boolean => {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
};

export const isBothObject = (objOne: any, objTwo: any): boolean => {
  return isObject(objOne) && isObject(objTwo);
};

export const isBothArray = (objOne: any, objTwo: any, key: string) =>
  objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));

export const normalize = (elements: any[] = [], key: string = '') => {
  if (elements.length === 0) {
    throw new Error("Array doesn't contains elements");
  }

  if (!(key in elements[0])) {
    throw new Error(`Object to normalize doesn't contains the key ${key}`);
  }

  return elements.reduce(
    (accumulator, currVal: any) => ({ ...accumulator, [currVal[key]]: currVal }),
    {}
  );
};
