import { packer, unpacker } from "../src";

describe("msgpackr", () => {
  it("should output right value", () => {
    expect(unpacker.unpack(packer.pack([[null, null, null]]))).toEqual([
      [null, null, null],
    ]);
  });
});
