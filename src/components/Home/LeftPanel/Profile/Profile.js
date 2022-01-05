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
                        props.onChangePage(localStorage.getItem('user'), () => {
                            console.log("callback called")
                            history.push('/profile');
                        });
                        if(props.close) props.close()
                    }} style={{'cursor':'pointer'}}>
                        <img src={props.userData ? props.userData.userPic ? props.userData.userPic : "/images/male_emoji2.png" : "/images/male_emoji2.png" } />
                    </div>
                    <p>{props.userData ? props.userData.fullName : 'Alien'}</p>
                    <p style={{fontSize:"13px"}}>{props.userData ? props.userData.userBio : ""}</p>
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
        onChangePage : (userId, callBack) => dispatch(actions.changePage('/profile', {userId})).then(() => callBack())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);