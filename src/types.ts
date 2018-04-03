export type Options = {
  objects?: any[];
  onlyFields?: any[];
  indexKeyOnArrays: string | '';
  mergeObjectIntoArrays: boolean;
};

export type KeyedObject = {
  [key: string]: any;
};
