import React, {PropTypes} from "react";
import CrudHelperWrapper from "./CrudHelperWrapper";
import {Map} from "immutable";
import {CrudHelperChildProps} from "./CrudHelperWrapper";

import {BaseReactProps} from "../../types";

interface DataProps {
  data: any
}

interface ItemHelperChildProps extends BaseReactProps, DataProps{}


type ItemHelperChild = React.ReactElement<ItemHelperChildProps>

const ItemHelper = ({data, children, ...props}:CrudHelperChildProps) => (
  <CrudHelperWrapper {...props}>
    {React.Children.map<ItemHelperChild>(children, (child:ItemHelperChild) => React.cloneElement(child, {
      data
    }))}
  </CrudHelperWrapper>
);

export default ItemHelper;