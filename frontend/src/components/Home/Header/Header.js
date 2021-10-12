import React from 'react'
import './HeaderMobile.css'
import classes from './Header1.css';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../../assets/Study_Booth.png'
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
// import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderContent}>
                <div >        
                    {/* <IconButton>
                        <MenuIcon />
                    </IconButton> */}
                    <img src={logo} alt="" />
                </div>
                <div className={classes.Input}>
                    <input type="text" class={classes.inputSearch} placeholder="Type to Search..."></input>
                    <button class={classes.btnSearch}>{<SearchIcon/>}</button>
                </div>   
                <div>
                    <IconButton>
                        <NotificationsNoneRoundedIcon />
                    </IconButton>
                </div>             
            </div>
        </div>
    )
}

export default Header
