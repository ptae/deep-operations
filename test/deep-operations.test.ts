import deepOperations from '../src/deep-operations';

const objectExampleOne = {
  name: 'Gabriel',
  lastname: 'Seixas',
  address: {
    streetName: 'Master street',
    number: '355',
    example: {
      name: 'name1'
    }
  },
  randomKey1: undefined,
  randomKey2: 'randomExample',
  randomKey3: 'with a random example',
  randomKey4: null,
  telephones: ['2256-4329', '99283-7844'],
  dogs: ['jujuba', 'nina'],
  images: [{ id: 1, permalink: 'www.example.com/' }, { id: 2, permalink: 'www.example2.com/' }]
};

const objectExampleTwo = {
  name: 'Raquel',
  lastname: 'Seixas',
  address: {
    streetName: 'Creep street',
    number: '355',
    example: {
      name: 'name2',
      example: 'exampleKey'
    }
  },
  telephones: ['2256-4329', '99283-7777'],
  dogs: ['hana', 'bidu', 'nina'],
  randomKey1: 'randomExample',
  randomKey2: undefined,
  randomKey3: null,
  randomKey4: 'random test',
  images: [
    { id: 1, permalink: 'www.example-other.com/' },
    { id: 2, permalink: 'www.example2.com/' }
  ]
};

describe('Test objectDiff', () => {
  it('deep checks differences', () => {
    const expectedValue = [
      {
        name: 'changed',
        lastname: 'not changed',
        address: {
          streetName: 'changed',
          number: 'not changed',
          example: {
            name: 'changed',
            example: 'new key'
          }
        },
        randomKey1: 'changed',
        randomKey2: 'changed',
        randomKey3: 'changed',
        randomKey4: 'changed',
        telephones: { '0': 'not changed', '1': 'changed' },
        dogs: { '0': 'changed', '1': 'changed', '2': 'new key' },
        images: {
          '0': { id: 'not changed', permalink: 'changed' },
          '1': { id: 'not changed', permalink: 'not changed' }
        }
      },
      true
    ];

    expect(deepOperations.objectDiff(objectExampleOne, objectExampleTwo)).toEqual(expectedValue);
  });

  it('shallow checks differences', () => {
    const expectedValue = [
      {
        name: 'changed',
        lastname: 'not changed',
        address: 'changed',
        images: 'changed',
        randomKey1: 'changed',
        randomKey2: 'changed',
        randomKey3: 'changed',
        randomKey4: 'changed',
        telephones: 'changed',
        dogs: 'changed'
      },
      true
    ];

    expect(
      deepOperations.objectDiff(objectExampleOne, objectExampleTwo, { shallow: true })
    ).toEqual(expectedValue);
  });
});

describe('Test deepMerge', () => {
  it('deep merges objects', () => {
    const expectedValue = {
      name: 'Raquel',
      lastname: 'Seixas',
      address: {
        streetName: 'Creep street',
        number: '355',
        example: { name: 'name2', example: 'exampleKey' }
      },
      randomKey1: 'randomExample',
      randomKey2: undefined,
      randomKey3: null,
      randomKey4: 'random test',
      images: [
        {
          id: 1,
          permalink: 'www.example.com/'
        },
        {
          id: 2,
          permalink: 'www.example2.com/'
        },
        {
          id: 1,
          permalink: 'www.example-other.com/'
        },
        {
          id: 2,
          permalink: 'www.example2.com/'
        }
      ],
      telephones: ['2256-4329', '99283-7844', '99283-7777'],
      dogs: ['jujuba', 'nina', 'hana', 'bidu']
    };

    const result = deepOperations.deepMerge({
      objects: [objectExampleOne, objectExampleTwo],
      mergeObjectIntoArrays: false,
      indexKeyOnArrays: ''
    });

    expect(result).toEqual(expectedValue);
  });

  it('merges objects into arrays', () => {
    const expectedValue = {
      name: 'Raquel',
      lastname: 'Seixas',
      address: {
        streetName: 'Creep street',
        number: '355',
        example: { name: 'name2', example: 'exampleKey' }
      },
      randomKey1: 'randomExample',
      randomKey2: undefined,
      randomKey3: null,
      randomKey4: 'random test',
      telephones: ['2256-4329', '99283-7844', '99283-7777'],
      dogs: ['jujuba', 'nina', 'hana', 'bidu'],
      images: [
        { id: 1, permalink: 'www.example-other.com/' },
        { id: 2, permalink: 'www.example2.com/' }
      ]
    };

    const result = deepOperations.deepMerge({
      objects: [objectExampleOne, objectExampleTwo],
      mergeObjectIntoArrays: true,
      indexKeyOnArrays: 'id'
    });

    expect(result).toEqual(expectedValue);
  });
});
