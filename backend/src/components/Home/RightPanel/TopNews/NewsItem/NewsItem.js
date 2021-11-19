import React from "react";

import classes from './NewsItem.css';
const newsItem = () => {
    return (
        <div className={classes.NewsItem}>
            <div>
                <img src ="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg"/>
            </div>
            <div>
                <p>Some content</p>
            </div>
        </div>
    );
}

export default newsItem;