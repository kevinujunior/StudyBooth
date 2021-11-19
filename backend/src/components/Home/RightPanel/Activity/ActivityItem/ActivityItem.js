import React from "react";

import classes from './ActivityItem.css';

const ActivityItem = () => {

    return (
        <div className={classes.ActivityItem}>
            <img src="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg"/>
            <div><p>Unknown started following you.</p></div>
            <div className={classes.MyImage}>
                <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
            </div>
        </div>
    );
}  

export default ActivityItem;