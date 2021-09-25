import React from "react";
import classes from './Profile.css';

const profile = () => {
    return (
        <div className={classes.Profile}>
            <div className = {classes.Info}>
                <div>
                    {/* photo and name*/}
                    <div>
                        <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
                    </div>
                    <p>Alien</p>
                    <p>About</p>
                </div>
                <div className={classes.stats}>
                    <div>
                        <div>
                            <p>Post</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>Following</p>
                            <p>100</p>
                        </div>
                        <div>
                            <p>Followers</p>
                            <p>1.2M</p>
                        </div>
                    </div>
                    <div>
                        <button>Edit Profile</button>
                        <button>View Profile stats</button>
                    </div>
                </div>
            </div>
            <div className={classes.line}></div>
            <div className = {classes.Intrest}> 
                <p>Intrested In</p>
                <p>Top skills</p>
                <p>Bookmarks</p>
            </div>
        </div>
    )
}

export default profile;