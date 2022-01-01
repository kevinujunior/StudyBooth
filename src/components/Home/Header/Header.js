import React, {  Component,  } from 'react';
import { connect } from 'react-redux';
import * as actionsTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router';
import classes from './Header.css';
// import logo from '../../../assets/SB_png.png'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import {  IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import onClickOutside from 'react-onclickoutside';
import SearchBox from '../../UI/SearchBox/SearchBox';

class Header extends Component {

    state = {
        searchInput:"",
        dropdown: null,
    }

    handleClickOutside = () => {
        this.setState({
            dropdown: null,
        })
    }

    callBack = (userId) => {
        this.props.onFetchUserProfile(userId);
        this.props.history.push({   
            pathname: '/profile',
            userId: userId,
        });
    }

    
    render(){
        
        let headerClasses = [classes.Header];
        if(this.props.theme === 'dark'){
            headerClasses.push(classes.Dark);
        }

        return (
            <div className={headerClasses.join(" ")} >
                <div className={classes.HeaderContent}>
                    <div className = {classes.homeIcon} title="Home">        
                        <img src="/images/logo.png" alt=""  id={classes.fuckoff} onClick={() => {
                            this.props.history.push({
                                pathname: '/',
                            });
                        }} />
                        <div className={classes.HamburgerButton}>
                            <IconButton onClick={this.props.onHamburgerClick}>
                                <MenuIcon className={classes.IconColor}/>
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.SearchAndCreate}>
                        <SearchBox theme={this.props.theme} headerCallBack={this.callBack} placeholder={"search profile.."}/>
                        <div>
                            <button  className={classes.CreatePostButton1} onClick={this.props.onCreateFeedClick}>
                                <p>Create Post</p>
                                <AddIcon style={{color:'white'}} />
                            </button>
                        </div>
                    </div>   
                    
                    <div className={classes.Buttons}>
                        <div className={classes.ToggleBtn}>
                            <ToggleButton theme={this.props.theme} onClick = {() => this.props.onChangeTheme(this.props.theme)} />
                        </div>
                        <div className={classes.NotfBtn}>
                            <IconButton >
                                <NotificationsNoneRoundedIcon className={classes.IconColor}/>
                            </IconButton>
                        </div>
                        <button  className={classes.CreatePostButton2} onClick={this.props.onCreateFeedClick}>
                            <AddIcon style={{color:'white'}} />
                        </button>
                    </div>             
                    
                </div>
                {this.props.loading ?<div className={classes.loader}>
                        <div className={classes.bar}></div>
                    </div> : null }
            </div>
        );
    }
}

//here we have access to whole store and we can splice the data we want/
const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
        userData: state.currentUser.data,
        loading: state.feed.isFeedLoading || state.profile.profileFeedLoading,
    }
}
const mapDispathToProps = dispatch => {
    return {
        onChangeTheme: (theme) => {
            //here we are changing theme of basis of current theme
            if(theme === 'light') return dispatch({type: actionsTypes.DARK_THEME})
            return dispatch({type: actionsTypes.LIGHT_THEME})
        },
        onFetchUserProfile : (userId) => dispatch(actions.fetchUserData(userId))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(withRouter(onClickOutside(Header)));
//connect is a method to connect react component to store, it's like a subscription 