/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from "fs";
import readline from "readline";

interface ParsedResult {
  numUniqueIPAddresses: number;
  mostVisitedURLs: string[];
  mostActiveIPAddresses: string[];
}

interface LogResult {
  ipAddress: string;
  request: {
    method: string;
    url: string;
    protocol: string;
  };
}

interface Counter {
  [ip: string]: number;
}

interface LogCounter {
  ipAddresses: Counter;
  urls: Counter;
}

export async function logParser(path: string): Promise<ParsedResult> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });

  const logResults: Array<LogResult> = [];
  for await (const line of rl) {
    logResults.push(parseLine(line));
  }
  const aggregated = aggregateLogResults(logResults);

  console.log(`Number of Unique IP Addresses: ${aggregated.numUniqueIPAddresses}`);
  console.log(`Most Visited URLs: ${aggregated.mostVisitedURLs.join(", ")}`);
  console.log(`Most Active IP Addresses: ${aggregated.mostActiveIPAddresses.join(", ")}`);

  return aggregated;
}

export function parseLine(line: string): LogResult {
  // structure
  // ip_addr clientid userid [date_time] "request" status_code size referrer user_agent
  const logRegex = /((?:[0-9]{1,3}\.){3}[0-9]{1,3}) (.+) (.+) (\[.*?\]) (".+") (\d+) (\d+) (".+") (".+")/;
  const matches = line.match(logRegex);
  if (!matches) {
    return {
      ipAddress: "-",
      request: {
        method: "-",
        protocol: "-",
        url: "-",
      },
    };
  }
  const ipAddress = matches![1];
  const request = matches![5];
  const [method, url, protocol] = request.replace(/["]/g, "").split(" ");

  return {
    ipAddress,
    request: {
      method,
      url,
      protocol,
    },
  };
}

export function aggregateLogResults(logResults: LogResult[]): ParsedResult {
  const updateCounter = (value: string, counter: { [x: string]: number }) => {
    if (counter[value] !== undefined) {
      counter[value]++;
    } else {
      counter[value] = 1;
    }

    return counter;
  };

  const counter = logResults.reduce(
    (acc, result): LogCounter => {
      const { ipAddress, request } = result;
      const { url } = request;

      acc.ipAddresses = updateCounter(ipAddress, acc.ipAddresses);
      acc.urls = updateCounter(url, acc.urls);

      return acc;
    },
    { ipAddresses: {}, urls: {} } as LogCounter
  );

  const numUniqueIPAddresses = Object.keys(counter.ipAddresses).length;
  const mostActiveIPAddresses = kTopElements(counter.ipAddresses, 3);
  const mostVisitedURLs = kTopElements(counter.urls, 3);
  return {
    mostActiveIPAddresses,
    mostVisitedURLs,
    numUniqueIPAddresses,
  };
}

function kTopElements(counter: Counter, k: number) {
  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]);
  const kTopValues: string[] = [];

  const set = new Set();
  sorted.forEach(([val, count]) => {
    // add if not in set and length is less than k
    // continue if count is in set
    // if not in set and array length is greater than k return
    if (set.has(count)) {
      kTopValues.push(val);
    } else if (!set.has(count) && kTopValues.length < k) {
      set.add(count);
      kTopValues.push(val);
    } else if (!set.has(count) && kTopValues.length > k) {
      return;
    }
  });

  return kTopValues;
}
