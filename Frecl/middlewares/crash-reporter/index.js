import raygun from "../../Helpers/Raygun.js";

const raygunClient = raygun('getRaygunInstance');

const isImmutable = (obj) => { return typeof obj.toJS !== 'undefined' && typeof obj.toJS === 'function' };

export default (sessionCapture) => {
	let setUser = (raygun, getState) => {
		raygun('setUser', {
			identifier: "anonymous user",
			isAnonymous: true,
		});
	};


	if(typeof sessionCapture !== 'undefined'
		&& typeof sessionCapture === 'function') {
		setUser = sessionCapture;
	}
	else {
		console.warn('session capture must be a function');
	}

	return store => next => action => {
		try {
			return next(action);
		}
		catch(e) {
			const state = isImmutable(store.getState()) ? store.getState().toJS() : store.getState();
			console.error("Caught an exception", e, { state: state, action: action});
			setUser(raygun, store.getState);
			if(raygunClient) {
				raygunClient.send(e, { state: state, action: action});
			}

			throw e;
		}

	}
}
