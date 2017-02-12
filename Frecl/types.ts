import {Iterable, List, Map} from "immutable";
import {Moment} from "moment";
import {Action} from "redux";


export type apiPathArgs = Map<string, string | number>
export type apiParamArgs = apiPathArgs

export type apiResponseData<T> = string | number | boolean | Map<string | number, T> | List<T> 

// TODO: Actually force the developer to pass in T that reflects the stucture of the response
export type apiResponseDataMap = Map<string, apiResponseData<apiResponseData<apiResponseData<apiResponseData<apiResponseData<any>>>>>>;
export type apiRequestDataMap = apiResponseDataMap

interface AxiosResponse {
  status: number,
  data: apiResponseDataMap
}


export type api = (data?:apiRequestDataMap, params?:Object, pathArgs?:apiPathArgs) => Promise<AxiosResponse>


export interface BaseAction extends Action {
  type: string;
}

export interface PromiseAction extends BaseAction {
  payload: {
      promise: Promise<any>;
  };
}

export interface StateNameAction extends BaseAction {
  meta: {
    stateName: string
  }
}

export interface PostAction extends BaseAction, PromiseAction, StateNameAction {};

export interface BaseReactProps {
		children?: React.ReactNode,
		key?: React.Key,
		className?: string
}

export interface DateRangeMoment {
  startDate: Moment,
  endDate: Moment
}
export interface DateRangeMap extends Map<string, Moment> {
  startDate: Moment,
  endDate: Moment
}

// TODO: Actually force the developer to pass in T that reflects the structure of ShallowCompare
export type ShallowCompareInner<T> = string | number | boolean | DateRangeMoment | Iterable<string | number, File | T> | List<File | T> 
export type ShallowCompare = ShallowCompareInner<ShallowCompareInner<ShallowCompareInner<ShallowCompareInner<ShallowCompareInner<any>>>>>;

export interface ShallowCompareProps {
  [propName: string]: ShallowCompare
}

export type ReactComponent<T> = React.ComponentClass<T> | React.StatelessComponent<T> | React.ClassicComponentClass<T>

export type ReactElement<T> = React.ComponentElement<T, any> | React.SFCElement<T> | React.ClassicElement<T>
