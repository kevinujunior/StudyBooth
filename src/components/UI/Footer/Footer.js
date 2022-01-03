import React from 'react';
import styles from './Footer.css';

import LoadingBar from '../LoadingBar/LoadingBar';
import {IconButton} from '@mui/material'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const Footer = (props) => {

    let history = useHistory();

    const routePush = (path) => {
        console.log("route push called")
        if(!shouldRoutePush(path)) return;
        if(isHome(path)) props.onPageChange(path,() => history.push(path))
        else props.onPageChange(path,() => history.replace(path))
    }

    const isHome = (path) => history.location.pathname === '/home';

    const shouldRoutePush = (path) => !(history.location.pathname === path);

    return(
        <div className={[styles.Footer, props.theme === 'dark' ? styles.Dark : null].join(" ")}>
            {props.loading ? <LoadingBar backgroundColor="#4FC4F6"/> : null}
            <div className={styles.Buttons}>
                <IconButton onClick={() => routePush('/home')}><HomeIcon className={styles.Icon}/></IconButton>
                <IconButton onClick={() => routePush('/search')} ><SearchIcon className={styles.Icon}/></IconButton>
                <IconButton onClick={() => props.onCreateFeedClick(true)} ><AddCircleRoundedIcon className={styles.Icon}/></IconButton>
                <IconButton onClick={() => routePush('/chat')}><MarkChatUnreadIcon className={styles.Icon}/></IconButton>
                <IconButton onClick={() => props.setLeftPanel(true)} ><AccountCircleIcon className={styles.Icon}/></IconButton>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.feed.isFeedLoading || state.profile.profileFeedLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPageChange : (page, callBack) => dispatch(actions.changePage(page)).then(() => callBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);