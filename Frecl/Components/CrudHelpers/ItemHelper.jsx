import React, {PropTypes} from "react";
import CrudHelperWrapper from "./CrudHelperWrapper.jsx";
import {Map} from "immutable";

const ItemHelper = ({data, children, ...props}) => (
  <CrudHelperWrapper {...props}>
    {React.Children.map(children, child => React.cloneElement(child, {
      data,
    }))}
  </CrudHelperWrapper>
);

ItemHelper.propTypes = {
  stateName: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  params: PropTypes.object,
  apiVerb: PropTypes.string,
  pathArgs: PropTypes.instanceOf(Map)
};

export default ItemHelper;