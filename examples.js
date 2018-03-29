const deepOperations = require('./dist/index.bundle');

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

console.log('=============================');
console.log('deepOperations obj ', deepOperations);
console.log('=============================');

const diff = deepOperations.objectDiff(objectExampleOne, objectExampleTwo, {});

console.log('=============================');
console.log(diff);
console.log('=============================');
