import { logParser } from "../parser";
import { parsedResult } from "./fixtures/parsedResult";

describe("testing parser", () => {
  describe("testing logParser", () => {
    it("should return parsed results ", () => {
      const result = logParser("test.log");
      expect(result).toStrictEqual(parsedResult);
    });
  });
});
