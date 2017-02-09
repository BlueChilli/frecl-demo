import React from "react"

const ProgressButtonTemplate = ({title, state, activateStep}) => {
    //console.log(title + ' : ' + state);
    //console.log('state : ' + state);

    if(state === 'active') {
        return <div className='progress-button active' onClick={activateStep}>{title}</div>;
    } else if(state === 'complete') {
        return <div className='progress-button complete' onClick={activateStep}>{title}</div>; 
    }
    return <div className='progress-button' onClick={activateStep}>{title}</div>;
}

export default ProgressButtonTemplate;