import {flowRight as compose} from "lodash";

type ReactComponent<T> = React.ComponentClass<T> | React.StatelessComponent<T>
type GenericFunc<T> = (arg : ReactComponent<T>) => ReactComponent<T>

export default <T> (reactClass:ReactComponent<T>, ...composeFuncs: Function[]) :ReactComponent<T> => {
  const result = compose<GenericFunc<T>>(...composeFuncs)
  return result(reactClass);
}