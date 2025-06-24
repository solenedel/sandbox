export type statusOptions = 'idle' | 'loading' | 'success' | 'error';

export interface Status {
  singleDogStatus: statusOptions;
  multipleDogsStatus: statusOptions;
}
