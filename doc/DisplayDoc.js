/**
 * Created by shane on 18/10/16.
 */
import React from "react";
import Docs from "./doc.json"
import {fromJS, Map} from "immutable";

const parsedDocs = fromJS(JSON.parse(Docs));

export default  React.createClass({
  render() {
    console.log(parsedDocs.toJS());
    return (
      <div className="home-hero">
        {parsedDocs.map((value, key) => {
          return (
            <dl style={{marginBottom: 50}}>
              <dt><strong>File Name</strong></dt>
              <dd>{key.match(/\w*.jsx?$/)[0]}</dd>
              <dt><strong>Location</strong></dt>
              <dd>{key}</dd>
              <dt><strong>Description</strong></dt>
              <dd>{value.get('description')}</dd>
              <dt><strong>Props</strong></dt>
              <dd>
                {/*LATER: Need a way to display JSX*/}
                <div>
                  {value.get('props', Map()).map((value, key) => {
                    return [
                      (<dt><em>{key}</em></dt>),
                      (<dd>
                        <div>Type: {value.get('type')}</div>
                        <div>Required: {value.get('required') + ""}</div>
                        <div>Description: {value.get('description')}</div>
                      </dd>)
                    ]
                  })}
                </div>

              </dd>
            </dl>
          )
        })}
      </div>
    );
  }
});


