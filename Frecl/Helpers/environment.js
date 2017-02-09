import ENVIRONMENTS from "../Constants/ENVIRONMENTS";

function _getEnviroment() {
  return process.env.NODE_ENV;
}

export function isDevelopment() {
  return _getEnviroment() === ENVIRONMENTS.get('dev') || _getEnviroment() === ENVIRONMENTS.get('development');
}

export function isStaging() {
  return _getEnviroment() === ENVIRONMENTS.get('staging');
}

export function isProduction() {
  return _getEnviroment() === ENVIRONMENTS.get('production');
}

export function getConstant(constant) {
  return constant.get(_getEnviroment());
}
