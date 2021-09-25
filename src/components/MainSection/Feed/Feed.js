import React from 'react';

import classes from './Feed.css';

const Feed = () => {
    return (
        <div className={classes.Feed}>
            <div className={classes.Header}>
                <div className={classes.NamePhoto}>
                    <img src = "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
                    <p>Alien</p>
                </div>
                <p>Science</p>
            </div>
            <div className={classes.Post}>
                <img src = "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
            </div>
            <div className={classes.Interact}>

            </div>
        </div>
    )
}

export default Feed;