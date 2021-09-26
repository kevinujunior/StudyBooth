import React from "react";

import classes from './ActivityItem.css';

const ActivityItem = () => {

    return (
        <div className={classes.ActivityItem}>
            <img src="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg"/>
            <div>Hey your photo sucks</div>
        </div>
    );
}  

export default ActivityItem;