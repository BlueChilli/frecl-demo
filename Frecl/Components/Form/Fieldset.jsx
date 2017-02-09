import React, {PropTypes} from "react";
import {withContext} from "recompose";

const Fieldset = ({children, ...props}) =>(
  <fieldset {...props}>{children}</fieldset>
);

export default withContext({
  fieldSetNameSpace: PropTypes.string
}, ({name, id}) => ({
  fieldSetNameSpace: id ? `${name}/${id}` : name
}))(Fieldset);