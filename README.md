# 🚀 Http Log Parser!

This is a CLI application that parses log files and returns meaningful information related to IP addresses and website visited.

## Design
The application accepts one argument `<file>` which will be the path to the log file. The file is read and streamed one line at a time for processing. Once processed, the data is aggregated and logged to the console.

The log format must conform to the [Combined Log Format](https://httpd.apache.org/docs/2.4/logs.html#accesslog). Other formats will be filtered out.


Example of some statistics include:
  - number of unique IP addresses
  - most active ip addresses
  - most visited urls

An sample of the data is provided inside `/docs/`
An output would looks something like this

```
Number of Unique IP Addresses: 11
Most Visited URLs: /docs/manage-websites/, /intranet-analytics/, http://example.net/faq/, /this/page/does/not/exist/, http://example.net/blog/category/meta/, /blog/2018/08/survey-your-opinion-matters/, /docs/manage-users/, /blog/category/community/, /faq/, /faq/how-to-install/, /asset.js, /to-an-error, /, /docs/, /moved-permanently, /temp-redirect, /faq/how-to/, /translations/, /newsletter/, /hosting/, /download/counter/, /asset.css
Most Active IP Addresses: 168.41.191.40, 177.71.128.21, 50.112.00.11, 72.44.32.10
```

As of 23/07/22, the application will output the top 3 for any statistic that prints the most of something (e.g. most visited urls).

## Prerequisite
```
yarn install
```
> Tested on node v14.17

to install dependencies

## Usage

```
yarn start <path>
// yarn start docs/programming-task-example-data.log
```
