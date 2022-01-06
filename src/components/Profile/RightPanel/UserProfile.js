import React from 'react';
import classes from './UserProfile.css';
import { Button } from '@mui/material';

import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import ImageLoading from '../../UI/ImageLoading/ImageLoading';

const UserProfile = (props) => {

    
    let userData = props.user ? props.user.isFollowedByCurrUser ? props.user.viewUser : props.user : null;

    const currUser = localStorage.getItem('user')

    console.log(userData)

    let history = useHistory();


    const routeChange = (path) => {
        props.onPageChange(path, () => {
            history.replace(path);
        })
    }   

    const imgEl = React.useRef(null);
    const [loaded, setLoaded] = React.useState(false);

    const onImageLoaded = () => setLoaded(true);

    React.useEffect(() => {
        const imgElCurrent = imgEl.current;

        if (imgElCurrent) {
        imgElCurrent.addEventListener('load', onImageLoaded);
        return () => imgElCurrent.removeEventListener('load', onImageLoaded);
        }
    }, [imgEl]);


    return (
        <div className={classes.UserProfile}>
            <div>
                <div className={classes.ImgAndStats}>
                    <img ref={imgEl} src={userData.userPic ? userData.userPic : "/images/male_emoji.png"} alt="" style={{display:`${loaded ? 'block' : 'none' }`}}></img>
                    {!loaded && userData.userPic? <ImageLoading width="35px" height="35px" borderRadius="50%"/> : null}
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
                <div className={classes.NameAndDescription}>
                    <h3>{userData.fullName}</h3>
                    <p>{userData.userBio !== "null" ? userData.userBio : "How are you??"}</p>
                </div>
                <div className={classes.Buttons}>
                    {Number(currUser)!==userData.id ? 
                    (
                    <>
                        <Button variant="outlined" style={{'margin':'auto'}} onClick={() => props.postUnfollow()}>Unfollow</Button>
                        <Button variant="outlined" style={{'margin':'auto'}} onClick={() => routeChange('/chat')}>Message</Button>
                    </>
                    ) 
                    : <Button variant="outlined" style={{'margin':'auto'}} onClick={() => routeChange('/settings')}>Edit Profile</Button>}
                </div>
            </div>
            {/* <div>
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
            </div> */}
        </div>
    );
}


const mapStateToProps = state => {
    return {
        loading: state.feed.isFeedLoading || state.profile.profileFeedLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPageChange : (page, callBack) => dispatch(actions.changePage(page)).then(() => callBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
