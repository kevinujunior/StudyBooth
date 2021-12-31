import React from 'react';

import classes from './LoadingBar.css';

const LoadingBar = (props) => {
    return(
        <div className={classes.loader}>
            <div className={classes.bar} 
                style={{'background': `${props.background}`, 'backgroundColor':`${props.backgroundColor}`}}>
            </div>
        </div> 
    )
}

export default LoadingBar;