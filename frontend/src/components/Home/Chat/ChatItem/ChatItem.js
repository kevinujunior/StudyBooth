import React from "react";
import classes from './ChatItem.css';

const ChatItem = () => {
    return (
        <div className={classes.ChatItem}>
            <img src="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg" alt="lull"/>
            <div className={classes.ChatPreview}>
                <div>
                    <h4>Andrew parker</h4>
                    <p>This is a message .</p>
                </div>
                <div className={classes.TimeAndCount}>
                    <p>11:45</p>
                    <div>
                        <p>5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItem;