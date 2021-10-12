import React from 'react';
import { connect } from 'react-redux';
import * as actionsTypes from '../../../store/actions/actionTypes';

import classes from './Header1.css';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../../assets/logo3.png'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    return (
        <div className={classes.header}>
            <div className={classes.header__left}>
                <div className={classes.header__menu}>        
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </div>
                <img src={logo} alt="" />
                <div className={classes.header__input}>
                    <button class={classes.btnSearch}><i class="fas fa-search"><SearchIcon/></i></button>
                    <input type="text" class={classes.inputSearch} placeholder="Type to Search..."></input>
                </div>                
            </div>
            <div className={classes.header__middle}>
                <div className={[classes.header__option,classes.header__optionActive].join(' ')}>
                    <HomeRoundedIcon />        
                    <p>Home</p>
                </div>
                <div className={classes.header__option}>
                    <BorderColorRoundedIcon />
                    <p>Classroom</p>
                </div>
                <div className={classes.header__option}>
                    <PeopleOutlineRoundedIcon />
                    <p>People</p>
                </div>
            </div>
            <div className={classes.header__right}>
                <IconButton>
                    <NotificationsNoneRoundedIcon />
                </IconButton>
                <IconButton>
                    <MessageRoundedIcon />
                </IconButton>
                <div className={classes.header__info}>
                    <Avatar />
                    <h4>UserName</h4>
                </div>
                <IconButton>
                <ExpandMoreRoundedIcon />
                </IconButton>
            </div>
        </div>
    )
}

//here we have access to whole store and we can splice the data we want/
const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

const mapDispathToProps = dispatch => {
    return {
        onChangeTheme: (theme) => {
            //here we are changing theme of basis of current theme
            if(theme === 'light') return dispatch({type: actionsTypes.DARK_THEME})
            return dispatch({type: actionsTypes.LIGHT_THEME})
        },
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
//connect is a method to connect react component to store, it's like a subscription 
