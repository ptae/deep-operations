export type Options = {
  objects?: any[];
  onlyFields?: any[];
  indexKeyOnArrays: string | '';
  mergeObjectIntoArrays: boolean;
};

export type KeyedObject = object & {
  [key: string]: any;
};

export enum ObjectState {
  CHANGED = 'changed',
  NOT_CHANGED = 'not changed',
  NEW_KEY = 'new key'
}
