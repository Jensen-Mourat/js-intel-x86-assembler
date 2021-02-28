interface IHashMap<T, U> {
  set(key: T, val: U): IHashMap<T, U>;

  get(key: T): U | undefined;
}

export class HashMap<T, U> implements IHashMap<T, U> {
  private map = new Map<string, U>();

  constructor() {
    return this;
  }

  set(key: T, val: U): this {
    const _key = JSON.stringify(key);
    this.map.set(_key, val);
    return this;
  }

  get(key: T): U | undefined {
    const _key = JSON.stringify(key);
    return this.map.get(_key);
  }
}
