const objectExampleOne = {
  name: 'Gabriel',
  lastname: 'Seixas',
  address: {
    streetName: 'Rua republica do peru',
    number: '355',
    example: {
      name: 'name1',
    },
  },
  telephones: ['2256-4329', '99283-7844'],
  dogs: ['jujuba', 'nina'],
};

const objectExampleTwo = {
  name: 'Raquel',
  lastname: 'Seixas',
  address: {
    streetName: 'Rua inhovera',
    number: '355',
    example: {
      name: 'name2',
      example: 'exampleKey',
    },
  },
  telephones: ['2256-4329', '99283-7777'],
  dogs: ['hana', 'bidu'],
};

const deepMergeTwoObjects = (objOne, objTwo) => {
  const objOneKeys = Object.keys(objOne);
  const objTwoKeys = Object.keys(objTwo);

  return objTwoKeys.reduce((accumulator, currVal) => {
    // const hasKey =

    const isArray = Array.isArray(accumulator[currVal]);
    const isObject = accumulator[currVal] && typeof accumulator[currVal] === 'object';

    const deepMergeArray = isArray && objOneKeys[currVal].concat();

    return { ...accumulator };
  }, {});
};

/**
 * Deep merges a list of objects
 */
export const deepMerge = (...objs) => {
  const firstObject = objs[0];

  return objs.reduce((accumulator, currentVal) => {}, { ...firstObject });
};
