// Copyright (c) 2014 - 2023 UNICEF. All rights reserved.

import * as index from "./index";

describe("demo-indicator/index", () => {
  it("exports an object", () => {
    expect(index).to.be.an("object");
  });

  describe("properties", () => {
    let clone;

    before(() => {
      clone = { ...index };
    });

    after(() => {
      expect(clone).to.be.empty;
    });

    ["default"].forEach(property => {
      it(`exports '${property}'`, () => {
        expect(index).to.have.property(property);
        delete clone[property];
      });
    });
  });
});