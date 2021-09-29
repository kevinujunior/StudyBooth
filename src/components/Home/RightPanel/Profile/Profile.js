import React from "react";
import classes from './Profile.css';

const profile = () => {
    return (
        <div className={classes.Profile}>
            <div className = {classes.Info}>
                <div className={classes.InfoBox}>
                    {/* photo and name*/}
                    <div>
                        <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
                    </div>
                    <p>Alien</p>
                    <p style={{fontSize:"13px"}}>Lives on mars.</p>
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
                        <button>Profile stats</button>
                    </div>
                </div>
            </div>
            <div className={classes.line}></div>
            <div className = {classes.Intrest}> 
                <p>Intrested In</p>
                <div>
                    <p>Science, Technology, Maths </p>
                </div>
                <p>Top skills</p>
                <div>
                    <p>Only Mastii </p>
                </div>
                <p>Bookmarks</p>
                <div>
                    <p>Reverse an array </p>
                </div>
            </div>
        </div>
    )
}

export default profile;