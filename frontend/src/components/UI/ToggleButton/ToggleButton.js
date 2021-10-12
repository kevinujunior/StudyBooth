import React from 'react';
import classes from './ToggleButton.css'

const ToggleButton = (props) => {
    
    console.log(props)
    let classNames = [classes.Circle];
    if(props.theme === 'dark'){
        classNames.push(classes.right)
    }
    return (
        <div className={classes.ToggleButton}  >
            <div className={classNames.join(" ")} onClick={props.onClick}></div>
        </div>
    );
}

export default ToggleButton;