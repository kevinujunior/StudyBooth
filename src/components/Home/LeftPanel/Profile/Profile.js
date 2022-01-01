import React from "react";
import classes from './Profile.css';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import * as actions from '../../../../store/actions/index';

function Profile(props){

    let history = useHistory();
    return (
        <div className={classes.Profile}>
            <div className = {classes.Info}>
                <div className={classes.InfoBox}>
                    {/* photo and name*/}
                    <div onClick={() => {
                        props.onFetchUserProfile(localStorage.getItem('user'));
                        history.push('/profile')
                    }} style={{'cursor':'pointer'}}>
                        <img src={props.userData ? props.userData.userPic ? props.userData.userPic : "/images/male_emoji2.png" : "/images/male_emoji2.png" } />
                    </div>
                    <p>{props.userData ? props.userData.fullName : 'Alien'}</p>
                    <p style={{fontSize:"13px"}}>How are you?</p>
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

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserProfile : (userId) => dispatch(actions.fetchUserData(userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);