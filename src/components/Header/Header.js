import React from 'react';
import classes from './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/logo3.png'
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
                    <button class={classes.btn_search}><i class="fas fa-search"><SearchIcon/></i></button>
                    <input type="text" class={classes.inputSearch} placeholder="Type to Search..."></input>
                </div>                
            </div>
            <div className={classes.header__middle}>
                <div className={[classes.header__option, classes.header__optionActive].join(' ')}>
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

export default Header
