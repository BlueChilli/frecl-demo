var Immutable = require("immutable");

module.exports = Immutable.Map({
  production: "production",
  staging: "staging",
  dev: "dev", // this is the development environment
  development: "development" // this is the local environment
});
