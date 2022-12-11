import { None, Option, Some } from "./option";

export type Result<T, E> = Ok<T, E> | Err<T, E>;

class CommonResult<T, E> {
  protected value: Option<T>;
  protected error: Option<E>;

  protected constructor(value?: T, error?: E) {
    if (value !== undefined && error !== undefined) {
      throw new Error("Cannot create a Result with both a value and an error");
    }

    if (value !== undefined) {
      this.value = new Some(value);
    } else {
      this.value = new None();
    }

    if (error !== undefined) {
      this.error = new Some(error);
    } else {
      this.error = new None();
    }
  }

  public isOk(): boolean {
    return this.value.isSome();
  }

  public isOkAnd(predicate: (value: T) => boolean): boolean {
    return this.isOk() && predicate(this.value.unwrap());
  }

  public isErr(): boolean {
    return this.error.isSome();
  }

  public isErrAnd(predicate: (error: E) => boolean): boolean {
    return this.isErr() && predicate(this.error.unwrap());
  }

  public ok(): T | undefined {
    return this.value.unwrap();
  }

  public err(): E | undefined {
    return this.error.unwrap();
  }

  public unwrap(): T {
    if (this.value === undefined) {
      throw new Error("Cannot unwrap an Err value");
    }

    return this.value.unwrap();
  }

  public unwrapErr(): E {
    if (this.error === undefined) {
      throw new Error("Cannot unwrap an Ok value");
    }

    return this.error.unwrap();
  }

  public map<U>(mapper: (value: T) => U): Result<U, E> {
    if (this.isOk()) {
      return new Ok(mapper(this.value.unwrap()));
    } else {
      return new Err(this.error.unwrap());
    }
  }

  public mapErr<F>(mapper: (error: E) => F): Result<T, F> {
    if (this.isErr()) {
      return new Err(mapper(this.error.unwrap()));
    } else {
      return new Ok(this.value.unwrap());
    }
  }

  public and<U>(result: Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return result;
    } else {
      return new Err(this.error.unwrap());
    }
  }

  public andThen<U>(mapper: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return mapper(this.value.unwrap());
    } else {
      return new Err(this.error.unwrap());
    }
  }

  public or<F>(result: Result<T, F>): Result<T, F> {
    if (this.isErr()) {
      return result;
    } else {
      return new Ok(this.value.unwrap());
    }
  }

  public orElse<F>(mapper: (error: E) => Result<T, F>): Result<T, F> {
    if (this.isErr()) {
      return mapper(this.error.unwrap());
    } else {
      return new Ok(this.value.unwrap());
    }
  }
}

export class Ok<T, E> extends CommonResult<T, E> {
  constructor(value: T) {
    super(value);
  }
}

export class Err<T, E> extends CommonResult<T, E> {
  constructor(error: E) {
    super(undefined, error);
  }
}
