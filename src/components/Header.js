import React from 'react'
import './static/HeaderMobile.css'
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
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <div className="header__menu">        
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </div>
                <img src={logo} alt="" />
                <div className="header__input">
                    <button class="btn-search"><i class="fas fa-search"><SearchIcon/></i></button>
                    <input type="text" class="input-search" placeholder="Type to Search..."></input>
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
                <IconButton>
                    <NotificationsNoneRoundedIcon />
                </IconButton>
                <IconButton>
                    <MessageRoundedIcon />
                </IconButton>
                <div className="header__info">
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
