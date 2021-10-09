import React from 'react';

import classes from './DashBoardItem.css';
const DashBoardItem = (props) =>{

    let ClassName = [classes.DashBoardItem];
    let IconClass = classes.Icon;
    if(props.active){
        ClassName.push(classes.Active);
        IconClass = classes.IconActive;
    }

    let execute = () => {
        if(props.onClick){
            props.onClick();
        }
        if(props.switchMain){
            props.switchMain();
        }
    }

    return (
        <div className={ClassName.join(" ")} onClick = {execute}>
            <div className={IconClass}>{props.icon}</div>
            <div><p>{props.name}</p></div>
        </div>
    )
}

export default DashBoardItem;