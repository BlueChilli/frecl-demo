import {Map} from "immutable";

export default Map<string, string>({
  production: "production",
  staging: "staging",
  dev: "dev", // this is the development environment
  development: "development" // this is the local environment
});
