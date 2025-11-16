export interface IRepository<T> {
  get(): Promise<T[] | []>;
}
