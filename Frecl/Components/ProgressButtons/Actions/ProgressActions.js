// creates a action to register a new progress item in the bread crumbs
export const registerProgressButton = (name, buttonTitle, id) => {
    return {
        type: 'REGISTER_PROGRESS_BUTTON',
        payload: {
            name,
            buttonTitle,
            id
        }
    }
}

// creates a action to set a new current chosen item
export const setChosenProgressItem = (name, index) => {
    return {
        type: 'SET_CHOSEN_PROGRESS_ITEM',
        payload: {
            name,
            index
        }
    }
}

export const changeStep = (nameSpace, noSteps) => (dispatch, getState) => {
    const ProgressState = getState().getIn(["ProgressWrapperState", nameSpace]);
    const noButtons = ProgressState.get('buttons').size;
    const currentState = ProgressState.get('state', 0);
    const newPosition = currentState + noSteps;
    if(newPosition < 0){
        dispatch(setChosenProgressItem(nameSpace, 0));
    } else if(newPosition > noButtons) {
        dispatch(setChosenProgressItem(nameSpace, noButtons));
    } else {
        dispatch(setChosenProgressItem(nameSpace, newPosition));
    }

}

// creates actions to update state from outside the progress wrapper
export const goToNextStep = (nameSpace) => {
    return (dispatch) => {
        dispatch(changeStep(nameSpace, 1));
    }
}

export const goToPreviousStep = (nameSpace) => {
    return (dispatch) => {
        dispatch(changeStep(nameSpace, -1)); //TODO pressing back on index 0 should take back to home page??
    }
}

// creates an action to clear ProgressWrapperState when ProgressButtons unmount
export const clearProgressWrapperState = (name) => {
    return {
        type: 'CLEAR_PROGRESS_STATE',
        payload: {
            name
        }
    }
}