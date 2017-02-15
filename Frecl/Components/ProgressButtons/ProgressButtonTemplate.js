import React from "react"

const ProgressButtonTemplate = ({title, state, activateStep}) => {
    if(state === 'active' || state === 'complete') {
        return <div className='progress-button active' onClick={activateStep}>{title}</div>;
    }
    return <div className='progress-button' onClick={activateStep}>{title}</div>;
}

export default ProgressButtonTemplate;