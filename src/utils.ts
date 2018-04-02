export const isPrimitive = (arg: any) => arg !== Object(arg);

export const unique = (arrArg: Object[]) => {
  return arrArg.filter((elem, pos, arr) => {
    // tslint:disable-next-line
    return arr.indexOf(elem) == pos;
  });
};

export const isBothObject = (objOne: any, objTwo: any, key: string) =>
  objOne[key] &&
  typeof objOne[key] === 'object' &&
  (objTwo[key] && typeof objTwo[key] === 'object');

export const isBothArray = (objOne: any, objTwo: any, key: string) =>
  objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));
