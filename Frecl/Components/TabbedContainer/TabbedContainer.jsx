import React from "react"
import classNames from "classnames"
import {Link} from "react-router";
import {startCase} from "lodash"
import {compose} from "recompose";
import normalize from "normalize-path";

import "./TabbedContainer.scss"

const stripSlashes = (path) => {
  const removedBackslash = path.replace('\\', '');
  return removedBackslash.replace('/', '');
};

const stripColons = (path) => {
  return path.replace(':', '');
};


/**
 * A tabbed container that is integrated with react router
 *
 * <Route component={TabbedContainer}>
 *   <Route path="style-guide" component={StyleGuide}/>
 *   <Route path="crud-helpers" component={CrudHelpers}/>
 * </Route>
 *
 * @param path is the name displayed in the container
 * @param component is the react component to display when selected
 *
 * */
export default React.createClass({
  render() {
    const {children, className} = this.props;
    const tabsRoute = this.props.routes[this.props.routes.length - 2];
    const removedTopEl = this.props.routes.slice(0, -1);
    const tabs = tabsRoute.childRoutes;
    const basePath = removedTopEl.reduce((reduction, value) => {
      return reduction + (value.path ? value.path : "");
    }, "");

    const normalizedPath = normalize(basePath);
    const tabNames = tabs.map(({path}) => {
      const safePath = compose(stripSlashes, stripColons)(path);
      const isActive = this.props.location.pathname.search(safePath) !== -1;
      const classes = classNames("tabbed-header", {"active-tab": isActive});
      return (
        <Link className={classes} key={safePath} to={normalizedPath + '/' + safePath}>{startCase(safePath)}</Link>
      )
    });

    return (
      <div className={classNames("tabbed-container", className)}>
        <div className="tabbed-container-header-tabs">
          {tabNames}
        </div>
        <div className="tabbed-container-body">
          {children}
        </div>
      </div>
    )
  }
})