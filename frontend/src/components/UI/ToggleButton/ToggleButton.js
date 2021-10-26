import React from 'react';
import classes from './ToggleButton.css'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const ToggleButton = (props) => {
    
    console.log(props)
    let CirlceClassNames = [classes.Circle];
    let BodyClassName = [classes.ToggleButton];
    if(props.theme === 'dark'){
        CirlceClassNames.push(classes.right);
        BodyClassName.push(classes.LightBody)
    }
    else{
        BodyClassName.push(classes.DarkBody)
    }
    return (
        <div className={BodyClassName.join(' ')}  >
            <div className={CirlceClassNames.join(" ")} onClick={props.onClick}>
                {props.theme === 'light' ? <LightModeIcon style={{color:'grey'}}/> : <DarkModeIcon style={{color:'black'}}/>}
            </div>
        </div>
    );
}

export default ToggleButton;