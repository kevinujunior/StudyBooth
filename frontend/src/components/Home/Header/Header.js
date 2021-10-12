import React from 'react';
import { connect } from 'react-redux';
import * as actionsTypes from '../../../store/actions/actionTypes';

import classes from './Header1.css';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../../assets/Study_Booth.png'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';

function Header(props) {
    let headerClasses = [classes.Header];
    if(props.theme === 'dark'){
        headerClasses.push(classes.Dark);
    }

    return (
        <div className={headerClasses.join(" ")}>
            <div className={classes.HeaderContent}>
                <div >        
                    <img src={logo} alt="" />
                    <div className={classes.HamburgerButton}>
                        <IconButton onClick={props.onHamburgerClick}>
                            <MenuIcon className={classes.IconColor}/>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.Input}>
                    <input type="text" class={classes.inputSearch} placeholder="Type to Search..."></input>
                    <button class={classes.btnSearch}>{<SearchIcon/>}</button>
                </div>   
                <div className={classes.Buttons}>
                    <ToggleButton theme={props.theme} onClick = {() => props.onChangeTheme(props.theme)}/>
                    <IconButton>
                        <NotificationsNoneRoundedIcon className={classes.IconColor}/>
                    </IconButton>
                </div>             
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