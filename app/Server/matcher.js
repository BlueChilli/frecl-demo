import {match, useRouterHistory} from "react-router";
import getRoutes from "../Routes/getRoutes.js";
import React from "react";
import createHistory from "history/lib/createMemoryHistory";

module.exports = function(data , callback) {

    const loc = data.location;
    const url = data.url;
    const routes = getRoutes(url);
    const basename = BASE_URL;
    const appHistory = useRouterHistory(createHistory)({
        basename: basename
    });
    const location = appHistory.createLocation(loc);

    match({routes, location, basename}, (error, redirectLocation, renderProps) => {
        if (error) {
            callback(error, {
                data: null,
                error: error,
                statusCode: 500
            });
        }
        else if (redirectLocation) {
            callback(error, {
                data: null,
                statusCode: 302,
                error: null,
                redirectLocation: {
                    path: redirectLocation.pathname,
                    search: redirectLocation.search
                }
            });
        }
        else if (renderProps) {
            callback(error, {
                data: renderProps.params,
                statusCode: 200,
                error: null,
            });

        }
        else {
            callback(error, {
                statusCode: 404,
                data: null,
                error: null
            });
        }
    })
};
