import ENVIRONMENTS from "../Constants/ENVIRONMENTS";

declare var process;

function _getEnviroment():string {
  return process.env.NODE_ENV;
}

export function isDevelopment():boolean {
  return _getEnviroment() === ENVIRONMENTS.get('dev') || _getEnviroment() === ENVIRONMENTS.get('development');
}

export function isStaging():boolean {
  return _getEnviroment() === ENVIRONMENTS.get('staging');
}

export function isProduction():boolean {
  return _getEnviroment() === ENVIRONMENTS.get('production');
}

export function getConstant(constant):string {
  return constant.get(_getEnviroment());
}
