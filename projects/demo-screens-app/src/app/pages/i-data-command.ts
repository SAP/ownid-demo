export interface IDataCommand<T> {
  execute(payload: T): Promise<void> | void;
}
