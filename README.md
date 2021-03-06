# Movies

This is the solution to the problem described [here](http://webjetapitest.azurewebsites.net/).

The solution is built in NodeJS with EJS as the rendering engine. 

## Assumptions
* Data from the API can be cached. Currently caching is set to 120 seconds. This can be configured through environment variable `DATA_CACHE_TIME`.
* To make sure the flakiness of the API does not affect performance/usage, a connect/read timeout of 1500 milliseconds is set. This can be configured using environment variable `API_TIMEOUT`.

## Install and Run
To install dependencies, run `npm install`.

To run, run `npm start`. The UI should be available at `http://localhost:8080/`.

## Tests
To run, run `npm test`. Tests are run and a coverge report is created.
