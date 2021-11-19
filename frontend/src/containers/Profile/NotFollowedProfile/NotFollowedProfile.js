import React from 'react';
import classes from './NFP.css';

const NotFollowedProfile = (props) => {
    let userData = props.user ? props.user.isFollowedByCurrUser ? props.user.viewUser : props.user : null;
    let base = "http://127.0.0.1:8000"
    return (
        <div className={classes.NFP}>
            <div className={classes.UserInfo}>
                <img src={userData ? base+userData.userPic : null} alt=""></img>
                <h2>{userData ? userData.fullName : null}</h2>
                <div className={classes.stats}>
                    <div>
                        <div>
                            <p><b>{userData ? userData.postCount : null}</b></p>
                            <p>Post</p>
                        </div>
                        <div>
                            <p><b>{userData ? userData.followingCount : null}</b></p>
                            <p>Following</p>
                        </div>
                        <div>
                            <p><b>{userData ? userData.followerCount : null}</b></p>
                            <p>Followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.posts}>
                <h2>You don't follow this user</h2>
            </div>
        </div>
    );
}

export default NotFollowedProfile;