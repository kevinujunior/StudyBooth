import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionsTypes from '../../../store/actions/actionTypes';

import classes from './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../../assets/Study_Booth.png'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { Avatar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';


function Header(props) {

    
    const [searchinput, setSearchInput] = useState("");
    let [searchDropdown,setSearchDropdown] = useState({});
    let [dropdownMenu,setDropdownMenu] = useState();
    const [followData,setFollowData] = useState({});
    let headerClasses = [classes.Header];
    if(props.theme === 'dark'){
        headerClasses.push(classes.Dark);
    }
     
    const fetchSearch = () => {
        axios.get(`http://localhost:8000/users/userview/?user=${searchinput}`)
        .then(response =>{
            const search = response.data
            console.log("searching..")
            setSearchDropdown(search)
            // console.log(search)
            console.log(Object.entries(searchDropdown)) 
            // if(Object.entries(searchDropdown) > 0)    
            const postFollow = (data) =>{
                axios.post(`http://localhost:8000/users/followingview/`, data)
                .then(response =>{
                    console.log(response);
                })
                .catch(err => {
                    console.log(err)
                });
            }

            const number_of_users = Object.keys(search).length;
            setDropdownMenu([...Array(number_of_users)].map((x, i) => {
                return  <li value={search[i]["username"]}>
                        <Avatar alt={search[i]["username"]} src={search[i]["userPic"]} />
                        <p>{search[i]["fullName"]}</p>
                        <Button 
                        variant="contained" 
                        size="small"
                        onClick={postFollow({
                            currUser: 1,
                            followingUser: search[i]["id"]})}>Follow</Button>
                        </li> 
            }))
             })
        .catch(err => {
            console.log(err)
        });      
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
                <div className={classes.SearchAndCreate}>
                    <div className={classes.Input}>
                        <input 
                        type="text" 
                        class={classes.inputSearch}     
                        value={searchinput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="Type to Search...">
                        </input>
                        <button class={classes.btnSearch} onClick={fetchSearch}>{<SearchIcon/>}</button>
                    </div>
                    
                <div className={classes.searchDropdown}>
                    <ul class={classes.searchDropdownMenu} aria-label="submenu">
                        {dropdownMenu}
                    </ul>
                </div>
                    <div>
                        <button  className={classes.CreatePostButton1} onClick={props.onCreateFeedClick}>
                            <p>Create Post</p>
                            <AddIcon style={{color:'white'}} />
                        </button>
                    </div>
                </div>   
                
                <div className={classes.Buttons}>
                    <div className={classes.ToggleBtn}>
                        <ToggleButton theme={props.theme} onClick = {() => props.onChangeTheme(props.theme)} />
                    </div>
                    <div className={classes.NotfBtn}>
                        <IconButton >
                            <NotificationsNoneRoundedIcon className={classes.IconColor}/>
                        </IconButton>
                    </div>
                    <button  className={classes.CreatePostButton2} onClick={props.onCreateFeedClick}>
                        <AddIcon style={{color:'white'}} />
                    </button>
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