import {
  isBothArray,
  isBothObject,
  isPrimitive,
  unique,
  normalize,
  containsOnlyPrimitives
} from './../utils'
import { Options } from '../types'

const parseArraysToIndexObjects = (arrayOne: any[], arrayTwo: any[], indexKey: string): any[] => {
  return [normalize(arrayOne, indexKey), normalize(arrayTwo, indexKey)]
}

const mergeObjectsOptions: Options = {
  mergeObjectIntoArrays: false,
  indexKeyOnArrays: ''
}

/**
 * It will merge only two objects
 */
export const deepMergeTwoObjects = (
  objOne: any,
  objTwo: any,
  options = mergeObjectsOptions
): object => {
  const { indexKeyOnArrays, mergeObjectIntoArrays } = options
  const objOneKeys = Object.keys(objOne)
  const objTwoKeys = Object.keys(objTwo)

  return objTwoKeys.reduce((accumulator, currKey) => {
    const oneHasKey = objOneKeys.includes(currKey)

    const isArray = isBothArray(objOne, objTwo, currKey)
    const isObject = isBothObject(objOne, objTwo, currKey)

    const concatArrays = () => unique(objOne[currKey].concat(objTwo[currKey]))
    const mergeObject = () => isObject && deepMergeTwoObjects(objOne[currKey], objTwo[currKey])

    const concatOrMerge = () =>
      mergeObjectIntoArrays &&
      !containsOnlyPrimitives(objOne[currKey]) &&
      !containsOnlyPrimitives(objTwo[currKey])
        ? Object.values(mergeArrayObjects(objOne[currKey], objTwo[currKey], indexKeyOnArrays))
        : concatArrays()

    const mergedObject = isArray ? concatOrMerge() : mergeObject()

    const result = isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject
    const putIfNew = !oneHasKey ? objTwo[currKey] : result

    return { ...accumulator, [currKey]: putIfNew }
  }, {})
}

const mergeArrayObjects = (arrayOne: any[], arrayTwo: any[], indexKey: string) => {
  const [indexedOne, indexedTwo] = parseArraysToIndexObjects(arrayOne, arrayTwo, indexKey)

  return deepMergeTwoObjects(indexedOne, indexedTwo, {
    indexKeyOnArrays: indexKey,
    mergeObjectIntoArrays: true
  })
}
