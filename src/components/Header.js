import React from 'react'
import './static/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import logo from './static/logo3.png'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Avatar, IconButton } from '@mui/material';

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <img src={logo} alt="" />
                <div className="header__input">
                    <SearchIcon />
                    <input placeholder="Search StudyBooth" type="text" />
                </div>                
            </div>
            <div className="header__middle">
                <div className="header__option header__option--active">
                    <HomeRoundedIcon />        
                    <p>Home</p>
                </div>
                <div className="header__option">
                    <BorderColorRoundedIcon />
                    <p>Classroom</p>
                </div>
                <div className="header__option">
                    <PeopleOutlineRoundedIcon />
                    <p>People</p>
                </div>
            </div>
            <div className="header__right">
                <IconButton size="large">
                    <NotificationsNoneRoundedIcon />
                </IconButton>
                <IconButton size="large">
                    <MessageRoundedIcon />
                </IconButton>
                <div className="header__info">
                    <Avatar />
                    <h4>UserName</h4>
                </div>
                <IconButton size="large">
                <ExpandMoreRoundedIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Header
