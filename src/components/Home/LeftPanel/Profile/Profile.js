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
            </div>
            <div className={classes.stats}>
                    <div>
                        <div>
                            <p><b>1</b></p>
                            <p>Post</p>
                        </div>
                        <div>
                            <p><b>100</b></p>
                            <p>Following</p>
                        </div>
                        <div>
                            <p><b>1.2M</b></p>
                            <p>Followers</p>
                        </div>
                    </div>
                    {/* <div>
                        <button>Edit Profile</button>
                        <button>Profile stats</button>
                    </div> */}
                </div>
        </div>
    )
}

export default profile;