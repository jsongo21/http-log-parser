export const defaultParsedResult = {
  numUniqueIPAddresses: 11,
  mostActiveIPAddresses: ["168.41.191.40", "177.71.128.21", "50.112.00.11", "72.44.32.10"],
  mostVisitedURLs: [
    "/docs/manage-websites/",
    "/intranet-analytics/",
    "http://example.net/faq/",
    "/this/page/does/not/exist/",
    "http://example.net/blog/category/meta/",
    "/blog/2018/08/survey-your-opinion-matters/",
    "/docs/manage-users/",
    "/blog/category/community/",
    "/faq/",
    "/faq/how-to-install/",
    "/asset.js",
    "/to-an-error",
    "/",
    "/docs/",
    "/moved-permanently",
    "/temp-redirect",
    "/faq/how-to/",
    "/translations/",
    "/newsletter/",
    "/hosting/",
    "/download/counter/",
    "/asset.css",
  ],
};

export const logResults = [
  {
    ipAddress: "168.41.191.9",
    request: {
      method: "GET",
      url: "/app",
      protocol: "HTTP/1.1",
    },
  },
  {
    ipAddress: "168.41.191.9",
    request: {
      method: "GET",
      url: "/app",
      protocol: "HTTP/1.1",
    },
  },
  {
    ipAddress: "177.71.128.21",
    request: {
      method: "GET",
      url: "/app",
      protocol: "HTTP/1.1",
    },
  },
  {
    ipAddress: "168.41.191.9",
    request: {
      method: "GET",
      url: "/",
      protocol: "HTTP/1.1",
    },
  },
  {
    ipAddress: "177.71.128.21",
    request: {
      method: "GET",
      url: "/faq",
      protocol: "HTTP/1.1",
    },
  },
  {
    ipAddress: "168.41.191.43",
    request: {
      method: "GET",
      url: "/",
      protocol: "HTTP/1.1",
    },
  },
];

export const aggregatedResult = {
  mostActiveIPAddresses: ["168.41.191.9", "177.71.128.21", "168.41.191.43"],
  mostVisitedURLs: ["/app", "/", "/faq"],
  numUniqueIPAddresses: 3,
};
