import React, {PropTypes} from "react";
import {Map} from "immutable";
import {connect} from "react-redux";
import {getData} from "./Actions/CrudHelpers"
import {getFirstPath, getTopStatePath} from "./Helpers/stateHelpers"
import createSpecificShallowEqual from "../../Helpers/createSpecificShallowEqual"

const specificShallowEqual = createSpecificShallowEqual("pathname", "params", "pathArgs");

/** A higher order component to be used internally primarily used to fetch data and pass it down to children  */
const CrudHelperWrapper = React.createClass({
  propTypes: {
    /** Capitalised: The key that the data will be added to state under,
     * should match the string provided to createCrudReducer */
    stateName: PropTypes.string.isRequired,
    /** The group of api calls the wrapper interacts with */
    apiType: PropTypes.string.isRequired,
    /** Api verb to fetch the data from, the default: 'Query' */
    apiVerb: PropTypes.string,
    /** Params to be passed to the api request passed in the body of the request */
    params: PropTypes.object,
    /** Path arguments to be passed to the api request injected into the path */
    pathArgs: PropTypes.instanceOf(Map),
    /** Passed down by mapStateToProps contains the data from the request */
    data: PropTypes.any,
    /** Crud helper to wrap */
    children: PropTypes.element
  },
  componentWillMount() {
    this.props.getData();
  },
  componentWillReceiveProps(nextProps) {
    if (!specificShallowEqual(this.props, nextProps)) {
      nextProps.getData();
    }
  },
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
});

const mapStateToProps = (state, {stateName, pathArgs = Map()}) => {
  const statePath = getTopStatePath(stateName);
  const defaultDataPath = [statePath, getFirstPath(stateName), 'data'];
  const dataPath = pathArgs.has('id') ? defaultDataPath.concat(pathArgs.get('id') + "") : defaultDataPath;
  const data = state.getIn(dataPath, Map({})) || Map({});
  return {
    data
  };
};

const mapDispatchToProps = (dispatch, {stateName, apiType, params, apiVerb = "Query", pathArgs = Map()}) => {
  return {
    getData: () => {
      const pathArgsDefined = pathArgs.every(value => value);
      if (apiType !== false && pathArgsDefined) {
        dispatch(getData(stateName, window.client.getIn([apiType, `${apiType}_${apiVerb}`, 'api']), params, pathArgs))
      }
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CrudHelperWrapper);