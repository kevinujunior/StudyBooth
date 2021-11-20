import React from "react";
import classes from './Profile.css';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

function Profile(props){

    let history = useHistory();
    console.log(props.userData)
    return (
        <div className={classes.Profile}>
            <div className = {classes.Info}>
                <div className={classes.InfoBox}>
                    {/* photo and name*/}
                    <div onClick={() => history.push('/profile')} style={{'cursor':'pointer'}}>
                        <img src={props.userData ? props.userData.userPic ? props.userData.userPic : "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg":"https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"} />
                    </div>
                    <p>{props.userData ? props.userData.fullName : 'Alien'}</p>
                    <p style={{fontSize:"13px"}}>Lives on mars.</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.currentUser.data,
    }
}
export default connect(mapStateToProps)(Profile);