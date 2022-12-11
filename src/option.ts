export type Option<T> = Some<T> | None<T>;

export class CommonOption<T> {
  private value?: T;

  constructor(value?: T) {
    this.value = value;
  }

  public isSome(): boolean {
    return this.value !== undefined;
  }

  public isSomeAnd(predicate: (value: T) => boolean): boolean {
    return this.isSome() && predicate(this.value!);
  }

  public isNone(): boolean {
    return this.value === undefined;
  }

  public isNoneOr(predicate: (value: T) => boolean): boolean {
    return this.isNone() || predicate(this.value!);
  }

  public some(): T | undefined {
    return this.value;
  }

  public unwrap(): T {
    if (this.value === undefined) {
      throw new Error("Cannot unwrap a None value");
    }

    return this.value;
  }

  public unwrapOr(defaultValue: T): T {
    if (this.value === undefined) {
      return defaultValue;
    }

    return this.value;
  }

  public unwrapOrElse(defaultValue: () => T): T {
    if (this.value === undefined) {
      return defaultValue();
    }

    return this.value;
  }

  public map<U>(mapper: (value: T) => U): Option<U> {
    if (this.value === undefined) {
      return new None();
    }

    return new Some(mapper(this.value));
  }

  public mapOr<U>(defaultValue: U, mapper: (value: T) => U): U {
    if (this.value === undefined) {
      return defaultValue;
    }

    return mapper(this.value);
  }

  public mapOrElse<U>(defaultValue: () => U, mapper: (value: T) => U): U {
    if (this.value === undefined) {
      return defaultValue();
    }

    return mapper(this.value);
  }

  public and<U>(other: Option<U>): Option<U> {
    if (this.value === undefined) {
      return new None();
    }

    return other;
  }

  public andThen<U>(mapper: (value: T) => Option<U>): Option<U> {
    if (this.value === undefined) {
      return new None();
    }

    return mapper(this.value);
  }

  public or(other: Option<T>): Option<T> {
    if (this.value === undefined) {
      return other;
    }

    return this;
  }

  public orElse(mapper: () => Option<T>): Option<T> {
    if (this.value === undefined) {
      return mapper();
    }

    return this;
  }

  public xor(other: Option<T>): Option<T> {
    if (this.value === undefined) {
      return other;
    }

    if (other.isSome()) {
      return new None();
    }

    return this;
  }

  public filter(predicate: (value: T) => boolean): Option<T> {
    if (this.value === undefined) {
      return new None();
    }

    if (predicate(this.value)) {
      return this;
    }

    return new None();
  }

  public expect(message: string): T {
    if (this.value === undefined) {
      throw new Error(message);
    }

    return this.value;
  }

  public unwrapOrThrow(error: Error): T {
    if (this.value === undefined) {
      throw error;
    }

    return this.value;
  }

  public unwrapOrThrowWith(mapper: () => Error): T {
    if (this.value === undefined) {
      throw mapper();
    }

    return this.value;
  }

  public toString(): string {
    if (this.value === undefined) {
      return "None";
    }

    return `Some(${this.value})`;
  }
}

export class Some<T> extends CommonOption<T> {
  constructor(value: T) {
    super(value);
  }
}

export class None<T> extends CommonOption<T> {
  constructor() {
    super();
  }
}
