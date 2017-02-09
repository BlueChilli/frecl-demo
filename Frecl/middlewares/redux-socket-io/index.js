
/**
 * Allows you to register actions that when dispatched, send the action to the
 * server via a socket.io socket.
 * `option` may be an array of action types, a test function, or a string prefix.
 */
export default (socket, asyncActionSuffixes, { eventName = 'action' } = {}) => {
    return ({ dispatch }) => {
        // Wire socket.io to dispatch actions sent by the server.
        socket.on(eventName, dispatch);

        return next => action => {
            const data = action.payload.data;
            const meta = action.meta;
            const type = action.type;

            if(meta && meta.toServer) {
                var PENDING = asyncActionSuffixes[0];

                const nextAction = Object.assign({
                    type: type + '_' + PENDING
                }, !!data ? { payload: data } : {}, !!meta ? { meta: meta } : {});

                const newAction = Object.assign({}, nextAction, {type: type});

                socket.emit(eventName, newAction);

                return next(nextAction);
            }

            return next(action);
        };
    };
}