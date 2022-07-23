import path from "path";

import { handleFile } from "../action";
import * as parser from "../parser";
import { parsedResult } from "./fixtures/parsedResult";

describe("testing actions", () => {
  describe("handle file", () => {
    test("should run log parser", () => {
      const logParserSpy = jest.spyOn(parser, "logParser").mockReturnValue(parsedResult);

      handleFile("test.log");

      expect(logParserSpy).toBeCalledWith(path.join(process.cwd(), "test.log"));
      expect(logParserSpy).toBeCalledTimes(1);
    });
  });
});
