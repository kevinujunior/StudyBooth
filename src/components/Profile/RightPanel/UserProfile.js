import React from 'react';
import classes from './UserProfile.css';
const UserProfile = (props) => {

    console.log(props.user)
    let userData = props.user ? props.user.isFollowedByCurrUser ? props.user.viewUser : props.user : null;
    let base = "https://study-booth-backend.herokuapp.com"
    console.log(userData ? base+userData.userPic : null)
    return (
        <div className={classes.UserProfile}>
            <div>
                <img src={userData.userPic ? base+userData.userPic : "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg"} alt=""></img>
                <h2 style={{'textAlign':'center'}}>{userData ? userData.fullName : null}</h2>
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
            <div>
                <div style={{'padding':'10px'}}>
                    <p className={classes.Info}>{userData ? userData.userBio : null}</p>
                    <div className={classes.InfoBlocks}>
                        <h3>Locations</h3>
                        <p>Based in Chandigarh</p>
                    </div>

                    <div className={classes.InfoBlocks}>
                        <h3>Professsion</h3>
                        <p>Photographer</p>
                    </div>

                    <div className={classes.InfoBlocks}>
                        <h3>Skills</h3>
                        <p>Photography</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;