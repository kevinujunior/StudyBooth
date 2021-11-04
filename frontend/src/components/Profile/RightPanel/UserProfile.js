import React from 'react';
import classes from './UserProfile.css';
const UserProfile = (props) => {
    return (
        <div className={classes.UserProfile}>
            <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"></img>
            <h2>Alien</h2>
            <div className={classes.stats}>
                <div>
                    <div>
                        <p><b>{props.userData ? props.userData.postCount ? 0 : 0 : 10 }</b></p>
                        <p>Post</p>
                    </div>
                    <div>
                        <p><b>{props.userData ? props.userData.followingCount : 100 }</b></p>
                        <p>Following</p>
                    </div>
                    <div>
                        <p><b>{props.userData ? props.userData.followerCount : 20 }</b></p>
                        <p>Followers</p>
                    </div>
                </div>
            </div>
            <div style={{'padding':'10px'}}>
                <p className={classes.Info}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
    );
}

export default UserProfile;