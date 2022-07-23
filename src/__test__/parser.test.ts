/* eslint-disable max-len */
import { aggregateLogResults, logParser, parseLine } from "../parser";
import { aggregatedResult, defaultParsedResult, logResults } from "./fixtures/parsedResult";
import fs from "fs";
import { fileStream } from "./fixtures/fileStream";

describe("testing parser", () => {
  describe("logParser", () => {
    it("should return parsed results ", async () => {
      const fsReadStreamSpy = jest.spyOn(fs, "createReadStream").mockReturnValue(fileStream);

      const result = await logParser("test.log");
      expect(result).toStrictEqual(defaultParsedResult);
      expect(fsReadStreamSpy).toBeCalledTimes(1);
    });
  });

  describe("parseLine", () => {
    it("should return data given valid input", () => {
      const parsedResult = parseLine(
        `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`
      );

      expect(parsedResult).toStrictEqual({
        ipAddress: "177.71.128.21",
        request: {
          method: "GET",
          url: "/intranet-analytics/",
          protocol: "HTTP/1.1",
        },
      });
    });

    it("should filter out excess data", () => {
      const parsedResult = parseLine(
        `72.44.32.10 - - [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0" junk extra`
      );

      expect(parsedResult).toStrictEqual({
        ipAddress: "72.44.32.10",
        request: {
          method: "GET",
          url: "/",
          protocol: "HTTP/1.1",
        },
      });
    });

    it("should return default result when line does not match", () => {
      const parsedResult = parseLine(
        `78.69.32.10 admin admin [09/Jul/2018:15:48:07 +0200] random_data "GET /some/url HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"`
      );

      expect(parsedResult).toStrictEqual({
        ipAddress: "-",
        request: {
          method: "-",
          url: "-",
          protocol: "-",
        },
      });
    });
  });

  describe("aggregateLogResults", () => {
    it("should return parsed result", () => {
      const result = aggregateLogResults(logResults);
      expect(result).toEqual(aggregatedResult);
    });
  });
});
