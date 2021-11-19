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
    let [dropdownMenu,setDropdownMenu] = useState();
    const [dropdown,setDropdown] = useState();
    const [following,setFollowing] = useState([]);
    let headerClasses = [classes.Header];
    if(props.theme === 'dark'){
        headerClasses.push(classes.Dark);
    }

    const fetchFollowing = () =>{
        var arr = new Array();
        axios.get(`http://localhost:8000/users/followingview/`)
        .then(response =>{
            const data = response.data
            const n = data.length
            for(var i=0;i<n;i++)
                arr.push(data[i]['followingUser'])
            setFollowing(arr)
            }
        )
        .catch(err => {
            console.log(err)
        });
    }

    const postFollow = data =>{
        console.log("inside postfollow")
        axios.post(`http://localhost:8000/users/followingview/`, data)
        .then(response =>{
            console.log(response);
        })
        .catch(err => {
            console.log(err)
        });
    }

    const fetchSearch = () => {
        axios.get(`http://localhost:8000/users/userview/?user=${searchinput}`)
        .then(response =>{
            const search = response.data
            // if(Object.entries(searchDropdown) > 0)    
            fetchFollowing()
            // console.log(search[0]["id"])
            console.log(following.includes(1))
            const number_of_users = Object.keys(search).length;
            setDropdownMenu([...Array(number_of_users)].map((x, i) => {
                if(following.indexOf(search[i]["id"]) != -1){
                    return  <li key={i} value={search[i]["username"]}>
                        <Avatar alt={search[i]["username"]} src={search[i]["userPic"]} />
                        <p className={classes.searchDropdownMenu__fullname}>{search[i]["fullName"]}</p>
                        <p className={classes.searchDropdownMenu__username}>@{search[i]["username"]}</p>
                        <Button 
                        variant="contained" 
                        size="small" disabled>Follow</Button>
                        </li> 
                }else{
                    return  <li key={i} value={search[i]["username"]}>
                    <Avatar alt={search[i]["username"]} src={search[i]["userPic"]} />
                    <p className={classes.searchDropdownMenu__fullname}>{search[i]["fullName"]}</p>
                    <p className={classes.searchDropdownMenu__username}>@{search[i]["username"]}</p>
                    <Button 
                    variant="contained" 
                    size="small"
                    onClick= {function(e) {
                        postFollow({
                        currUser: props.userData.id,
                        followingUser: search[i]["id"]});
                        }} >Follow</Button>
                    </li>
                }
            }))
            })
        .catch(err => {
            console.log(err)
        });      
    } 
    
    const triggerSearch = () => {
        fetchSearch()
        setDropdown(
            <div className={classes.searchDropdown}>
                <ul class={classes.searchDropdownMenu} aria-label="submenu">
                    {dropdownMenu}
                </ul>
            </div>)
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
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                triggerSearch()
                            }
                          }}
                        placeholder="Type to Search...">
                        </input>
                        <button class={classes.btnSearch} onClick={triggerSearch}>{<SearchIcon/>}</button>
                    </div>
                    {dropdown}
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
        userData: state.currentUser.data,
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