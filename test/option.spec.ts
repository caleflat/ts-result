import { expect } from "chai";
import { None, Option, Some } from "../src/option";

// Create a test suite for Option
describe("Option", () => {
  it("should be able to create a Some value", () => {
    // Create a Some value
    const option = new Some(1);

    // Assert that the value is a Some value
    expect(option.isSome()).to.be.true;
    expect(option.isNone()).to.be.false;

    // Assert that the value is correct
    expect(option.unwrap()).to.equal(1);
  });

  it("should be able to create a None value", () => {
    // Create a None value
    const option = new None();

    // Assert that the value is a None value
    expect(option.isSome()).to.be.false;
    expect(option.isNone()).to.be.true;
  });

  it("should throw an error when unwrapping a None value", () => {
    // Create a None value
    const option = new None();

    // Assert that the value is correct
    expect(() => option.unwrap()).to.throw("Cannot unwrap a None value");
  });
});
