import React, {  Component,  } from 'react';
import { connect } from 'react-redux';
import * as actionsTypes from '../../../store/actions/actionTypes';
import { withRouter } from 'react-router';
import classes from './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../../assets/Study_Booth.png'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../axios_base';
import onClickOutside from 'react-onclickoutside'

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

    fetchSearch = () => {
        let users = null;
        axios.get(`users/userview/?user=${this.state.searchInput}`)
        .then(response =>{
            const search = response.data   
            
            var number_of_users = Object.keys(search).length;

            if(number_of_users === 0) {
                users = <li><p>No user found :-( </p></li>
            }
            else{
                users = [...Array(number_of_users)].map((x, i) => {
                    return  <li key={i} value={search[i]["username"]} onClick={() => {
                        this.props.history.push({
                            pathname: '/profile',
                            userId: search[i]["id"],
                        });
                    }}>
                        <Avatar alt={search[i]["username"]} src={search[i]["userPic"]} />
                        <p className={classes.searchDropdownMenu__fullname}>{search[i]["fullName"]}</p>
                        <p className={classes.searchDropdownMenu__username}>@{search[i]["username"]}</p>
                    </li> 
                })
            } 

            this.setState({
                dropdown:users,
            })
        })
        .catch(err => {
            console.log(err)
        }); 
    } 

    triggerSearch = () => {
        this.fetchSearch();
    }
    
    render(){
        
        let headerClasses = [classes.Header];
        if(this.props.theme === 'dark'){
            headerClasses.push(classes.Dark);
        }

        let dropdownMenu = this.state.dropdown ? (<div className={classes.searchDropdown}>
                            <ul class={classes.searchDropdownMenu} aria-label="submenu">
                                {this.state.dropdown}
                            </ul>
                        </div>) : null;
        return (
            <div className={headerClasses.join(" ")}>
                <div className={classes.HeaderContent}>
                    <div className = {classes.homeIcon} title="Home">        
                        <img src={logo} alt=""  id={classes.fuckoff} onClick={() => {
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
                        <div className={classes.Input}>
                            <input 
                                type="text" 
                                class={classes.inputSearch}     
                                value={this.state.searchinput}
                                onChange={e => this.setState({
                                    searchInput: e.target.value,
                                })}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.triggerSearch()
                                    }
                                }}
                                placeholder="Type to Search...">
                            </input>
                            <button class={classes.btnSearch} onClick={this.triggerSearch}>{<SearchIcon/>}</button>
                            {dropdownMenu}
                        </div>
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
                
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispathToProps)(withRouter(onClickOutside(Header)));
//connect is a method to connect react component to store, it's like a subscription 