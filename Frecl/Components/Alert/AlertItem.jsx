import React from "react";
import {List} from "immutable";
import classnames from "classnames";

const getAlertBody = (body) => {
  if (List.isList(body) && body.size > 1) {
    return (
      <ul>
        {body.map(item => <li className="alert-inner-item">{item}</li>)}
      </ul>
    )
  } else {
    return <p className="alert-inner-item">{body.has && body.has(0) ? body.get(0) : body}</p>
  }
};


export default ({type, header, body, close}) => {
  const classes = classnames('alert', type);
  return (
    <div className={classes}>
      <div className="container">
        <h3 className="alert-header">{header}</h3>
        {getAlertBody(body)}
        <button className="close" type="button" onClick={close}>x</button>
      </div>
    </div>
  );
}
