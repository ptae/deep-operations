export declare const sortObjKeys: (obj: any) => {};
export declare const flatValues: (obj: any) => any;
/**
 * Will mount a diff between two objects
 */
export declare const objectDiff: (objOne: any, objTwo: any, { shallow }?: {
    shallow?: boolean;
}) => any;
/**
 * Deep merges a list of objects
 * @param { vararg } objs list of objects to merge
 * @returns a single object with merged values
 *
 * @example
 *
 * const obj1 = {
 *  name: 'example1'
 *  random: 'random1'
 * };
 *
 * const obj2 = {
 *  name: 'example2'
 *  random: 'random1'
 * };
 *
 * const obj3 = {
 *  name: 'example2'
 *  random: 'random1',
 *  newKey: 'newKey',
 * };
 *
 * const mergedObject = deepMerge(obj1, obj2, obj3);
 * // => { name: 'example2', random: 'random1', newKey: 'newKey' }
 */
export declare const deepMerge: (...objs: any[]) => any;
declare const _default: {
    objectDiff: (objOne: any, objTwo: any, { shallow }?: {
        shallow?: boolean;
    }) => any;
    deepMerge: (...objs: any[]) => any;
    flatValues: (obj: any) => any;
    sortObjKeys: (obj: any) => {};
};
export default _default;
