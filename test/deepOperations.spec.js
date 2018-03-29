const deepOperations = require('../src/');

const objectExampleOne = {
  name: 'Gabriel',
  lastname: 'Seixas',
  address: {
    streetName: 'Master street',
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
    streetName: 'Creep street',
    number: '355',
    example: {
      name: 'name2',
      example: 'exampleKey',
    },
  },
  telephones: ['2256-4329', '99283-7777'],
  dogs: ['hana', 'bidu', 'nina'],
};

test('objectDiff', () => {
  expect(deepOperations.objectDiff(objectExampleOne, objectExampleTwo)).toBe([
    {
      name: 'changed',
      lastname: 'not changed',
      address: {
        streetName: 'changed',
        number: 'not changed',
        example: {
          name: 'changed',
          example: 'new key',
        },
      },
      telephones: { '0': 'not changed', '1': 'changed' },
      dogs: { '0': 'changed', '1': 'changed', '2': 'new key' },
    },
    true,
  ]);
});

// Object merge future test
// { name: 'Raquel',
//   lastname: 'Seixas',
//   address:
//    { streetName: 'Creep street',
//      number: '355',
//      example: { name: 'name2', example: 'exampleKey' } },
//   telephones: [ '2256-4329', '99283-7844', '99283-7777' ],
//   dogs: [ 'jujuba', 'nina', 'hana', 'bidu' ] }
