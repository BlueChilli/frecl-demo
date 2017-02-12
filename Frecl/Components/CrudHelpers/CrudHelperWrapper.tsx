import React, {PropTypes} from "react";
import {Map, List} from "immutable";
import {isUndefined} from "lodash";
import {connect} from "react-redux";
import {getData} from "./Actions/CrudHelpers"
import {getFirstPath, getTopStatePath} from "./Helpers/stateHelpers"
import createSpecificShallowEqual from "../../Helpers/createSpecificShallowEqual"
import {BaseReactProps, apiPathArgs, apiParamArgs} from "../../types";


const specificShallowEqual = createSpecificShallowEqual("pathname", "params", "pathArgs");

declare const window: any

interface StateProps {
  data: List<any> | Map<string, any>
}

interface DispatchProps {
  getData: () => any
}

interface CrudHelperProps extends BaseReactProps {
   /** Capitalised: The key that the data will be added to state under,
     * should match the string provided to createCrudReducer */
    stateName: string,
    /** The group of api calls the wrapper interacts with */
    apiType: string,
    /** Api verb to fetch the data from, the default: 'Query' */
    apiVerb?: string,
    /** Params to be passed to the api request passed in the body of the request */
    params: apiParamArgs,
    /** Path arguments to be passed to the api request injected into the path */
    pathArgs: apiPathArgs,
}

interface ConnectedCrudHelperProps extends CrudHelperProps, StateProps, DispatchProps{}

/** A higher order component to be used internally primarily used to fetch data and pass it down to children  */
class CrudHelperWrapper extends React.Component<ConnectedCrudHelperProps, {}>{
  componentWillMount() {
    this.props.getData();
  }
  componentWillReceiveProps(nextProps) {
    if (!specificShallowEqual(this.props, nextProps)) {
      nextProps.getData();
    }
  }
  render(){
    const {data, children} = this.props;
    return (
      <div>
        {React.Children.map(children, child => React.cloneElement(child, {
          data,
        }))}
      </div>
    );
  }
};

const mapStateToProps = (state, {stateName, pathArgs = Map()}:CrudHelperProps) => {
  const statePath = getTopStatePath(stateName);
  const defaultDataPath = [statePath, getFirstPath(stateName), 'data'];
  const dataPath = pathArgs.has('id') ? defaultDataPath.concat(pathArgs.get('id') + "") : defaultDataPath;
  const data = state.getIn(dataPath, Map({})) || Map({});
  return {
    data
  };
};

const mapDispatchToProps = (dispatch, {stateName, apiType, params, apiVerb = "Query", pathArgs}:CrudHelperProps) => {
  return {
    getData: () => {
      const pathArgsDefined = !pathArgs.every(isUndefined);
      if (pathArgsDefined) {
        dispatch(getData(stateName, window.client.getIn([apiType, `${apiType}_${apiVerb}`, 'api']), params, pathArgs))
      }
    }
  }
};


export default connect<StateProps, DispatchProps, CrudHelperProps>(mapStateToProps, mapDispatchToProps)(CrudHelperWrapper);