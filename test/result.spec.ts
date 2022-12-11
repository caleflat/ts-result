// Import the test package and Result type
import { expect } from "chai";
import { Err, Ok } from "../src/result";

// Create a test suite for Result
describe("Result", () => {
  it("should be able to create an Ok value", () => {
    // Create an Ok value
    const result = new Ok(1);

    // Assert that the value is an Ok value
    expect(result.isOk()).to.be.true;
    expect(result.isErr()).to.be.false;

    // Assert that the value is correct
    expect(result.ok()).to.equal(1);
  });

  it("should be able to create an Err value", () => {
    // Create an Err value
    const result = new Err("error");

    // Assert that the value is an Err value
    expect(result.isOk()).to.be.false;
    expect(result.isErr()).to.be.true;

    // Assert that the value is correct
    expect(result.err()).to.equal("error");
  });

  it("should be able to unwrap an Ok value", () => {
    // Create an Ok value
    const result = new Ok(1);

    // Assert that the value is correct
    expect(result.unwrap()).to.equal(1);
  });

  it("should be able to unwrap an Err value", () => {
    // Create an Err value
    const result = new Err("error");

    // Assert that the value is correct
    expect(result.unwrapErr()).to.equal("error");
  });

  it("should throw an error when unwrapping an Err value", () => {
    // Create an Ok value
    const result = new Ok(1);

    // Assert that the value is correct
    expect(() => result.unwrapErr()).to.throw("Cannot unwrap a None value");
  });

  it("should throw an error when unwrapping an Ok value", () => {
    // Create an Err value
    const result = new Err("error");

    // Assert that the value is correct
    expect(() => result.unwrap()).to.throw("Cannot unwrap a None value");
  });

  it("should be able to create an Ok value with a predicate", () => {
    // Create an Ok value
    const result = new Ok(1);

    // Assert that the value is an Ok value
    expect(result.isOkAnd((value) => value === 1)).to.be.true;

    // Assert that the value is correct
    expect(result.ok()).to.equal(1);

    // Assert that the value is an Ok value
    expect(result.isOkAnd((value) => value === 2)).to.be.false;

    // Assert that the value is correct
    expect(result.ok()).to.equal(1);
  });

  it("should be able to create an Err value with a predicate", () => {
    // Create an Err value
    const result = new Err("error");

    // Assert that the value is an Err value
    expect(result.isErrAnd((value) => value === "error")).to.be.true;

    // Assert that the value is correct
    expect(result.err()).to.equal("error");

    // Assert that the value is an Err value
    expect(result.isErrAnd((value) => value === "error2")).to.be.false;

    // Assert that the value is correct
    expect(result.err()).to.equal("error");
  });

  it("should be able to map an Ok value", () => {
    // Create an Ok value
    const result = new Ok(1);

    // Assert that the value is an Ok value
    expect(result.map((value) => value + 1).isOk()).to.be.true;

    // Assert that the value is correct
    expect(result.map((value) => value + 1).ok()).to.equal(2);
  });

  it("should be able to use and then on an Ok value", () => {
    // Create an Ok value
    const result = new Ok(1);

    // Assert that the value is an Ok value
    expect(result.andThen((value) => new Ok(value + 1)).isOk()).to.be.true;

    // Assert that the value is correct
    expect(result.andThen((value) => new Ok(value + 1)).ok()).to.equal(2);
  });
});
