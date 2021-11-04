import React from "react";
import classes from './Profile.css';
import {connect} from 'react-redux';

const profile = (props) => {

    
    return (
        <div className={classes.Profile}>
            <div className = {classes.Info}>
                <div className={classes.InfoBox}>
                    {/* photo and name*/}
                    <div>
                        <img src={props.userData ? props.userData.userPic : "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"} />
                    </div>
                    <p>{props.userData ? props.userData.fullName : 'Alien'}</p>
                    <p style={{fontSize:"13px"}}>Lives on mars.</p>
                </div>
            </div>
            {/* <div className={classes.stats}>
                <div>
                    <div>
                        <p><b>{props.userData ? props.userData.postCount ? 0 : 0 : 0 }</b></p>
                        <p>Post</p>
                    </div>
                    <div>
                        <p><b>{props.userData ? props.userData.followingCount : 0 }</b></p>
                        <p>Following</p>
                    </div>
                    <div>
                        <p><b>{props.userData ? props.userData.followerCount : 0 }</b></p>
                        <p>Followers</p>
                    </div>
                </div>
                <div>
                    <button>Edit Profile</button>
                    <button>Profile stats</button>
                </div>
            </div> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.currentUser.data,
    }
}
export default connect(mapStateToProps)(profile);