import React from "react";
import {renderToString} from "react-dom/server";
import {match, RouterContext, useRouterHistory} from "react-router";
import getRoutes from "../Routes/getRoutes.js";
import {Provider} from "react-redux";
import configureStore from "../Setup/configureStore.js";
import createHistory from "history/lib/createMemoryHistory";
import {Map, fromJS} from "immutable";
import asyncActionSuffixes from "../Constants/asyncActionSuffix.js";
import Helmet from "react-helmet";

const toCamelCase = (str) => {
    return str.split(' ').map(function(word){
        return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
    }).join('');
};

const removeControlCharacters = function(data)  {

        var d = data.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");

        // remove non-printable and other non-valid JSON chars
        d = d.replace(/[\u0000-\u0019]+/g, ""); 

        return d;
};


module.exports = function(data , callback) {

    try {

        const hasError = data.hasError;
        const d = removeControlCharacters(data.data); 
        const reduxStates = JSON.parse(d);
        const loc = data.location;
        const url = data.url;
        const initialState = data.initialState ? fromJS(JSON.parse(removeControlCharacters(data.initialState))) : Map();
        const statusCode = data.statusCode;
        const basename = BASE_URL;
        const appHistory = useRouterHistory(createHistory)({
            basename: basename
        });
        const store = configureStore(initialState,appHistory);
        let actions = [];

        reduxStates.forEach(m => {
            let actionCreators;
            
            try
            {
                actionCreators = require('../Actions/' + m.reduxAction.actionCreators + '.js');
            }
            catch(e) {}

            if(actionCreators) {
                let rxAction = m.reduxAction.action;

                if(m.reduxAction.isAsync) {
                    let suffix = '';
                    if(hasError) {
                        suffix = asyncActionSuffixes[2];
                    }
                    else {
                        suffix = asyncActionSuffixes[1];
                    }

                    rxAction = rxAction + toCamelCase(suffix);
                }

                const action = actionCreators[rxAction];

                if(action && typeof action === 'function') {
                    store.dispatch(action(m.data));
                }
            }

        });


        const state = store.getState();
        const newState = state.toJS();
        const routes = getRoutes(url);
        const location = appHistory.createLocation(loc);
        match({routes, location, basename}, (error, redirectLocation, renderProps) => {

            if (error) {
                callback(error, {statusCode:500, html: null, state: null, head: null});
            }
            else if (redirectLocation) {
                // don't know what to do?
                callback(null, {statusCode:302, html: null, state: null, head: null } );
            }
            else if (renderProps) {

                var html = renderToString(
                    <Provider store={store} key="provider">
                        <RouterContext {...renderProps}/>
                    </Provider>
                );

                var head = Helmet.rewind();

                const hd = {
                    htmlAttributes : head.htmlAttributes.toString(),
                    title : head.title.toString(),
                    meta : head.meta.toString(),
                    link : head.link.toString(),
                    script : head.script.toString(),
                    style : head.style.toString()
                };

                callback(null, {statusCode:200, html: html, state: JSON.stringify(newState), head: hd});
            }
            else {
                callback(null, {statusCode:404, html: null, state: null, head: null});
            }

        });

    }
    catch(e) {
        callback(e, {statusCode:500, html: null, state: null, head: null});
    }
};
