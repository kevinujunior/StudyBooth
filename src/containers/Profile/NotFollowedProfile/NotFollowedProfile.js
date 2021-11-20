import React from 'react';
import classes from './NFP.css';
import { Button } from '@mui/material';
import axios from '../../../axios_base'

const NotFollowedProfile = (props) => {
    let userData = props.user ? props.user.isFollowedByCurrUser ? props.user.viewUser : props.user : null;
    let base = "https://study-booth-backend.herokuapp.com"

    console.log(props.followingUserId)
    const postFollow = () =>{
        let currUserId = localStorage.getItem('user')
        axios.post("users/followingview/",{
            currUser : currUserId,
            followingUser : props.followingUserId
        }).then(
            res => console.log(res)
            )
        .catch(err=>console.log(err))
        
    }
    return (
        <div className={classes.NFP}>
            <div className={classes.UserInfo}>
                <img src={userData ? base+userData.userPic : "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg"} alt=""></img>
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
                {/* <h2>You don't follow this user</h2> */}
                <Button variant="outlined" onClick={postFollow}>Follow</Button>
            </div>
        </div>
    );
}

export default NotFollowedProfile;