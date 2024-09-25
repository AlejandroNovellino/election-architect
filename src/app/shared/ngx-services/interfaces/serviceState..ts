export interface ServiceState<T> {
  data: T;
  loading: boolean;
  errored: boolean;
  skeletons: any[];
}
