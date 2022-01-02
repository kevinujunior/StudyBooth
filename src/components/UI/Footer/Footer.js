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

const Footer = (props) => {

    let history = useHistory();

    return(
        <div className={[styles.Footer, props.theme === 'dark' ? styles.Dark : null].join(" ")}>
            {props.loading ? <LoadingBar backgroundColor="#4FC4F6"/> : null}
            <div className={styles.Buttons}>
                <IconButton onClick={() => props.setLeftPanel(true)} ><AccountCircleIcon className={styles.Icon}/></IconButton>
                <IconButton onClick={() => props.onCreateFeedClick(true)} ><AddCircleRoundedIcon className={styles.Icon}/></IconButton>
                <IconButton onClick={() => history.push('/search')} ><SearchIcon className={styles.Icon}/></IconButton>
                {/* <IconButton onClick={() => history.push('/chat')}><MarkChatUnreadIcon /></IconButton>
                <IconButton onClick={() => history.push('/home')}><HomeIcon /></IconButton> */}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.feed.isFeedLoading || state.profile.profileFeedLoading,
    }
}

export default connect(mapStateToProps)(Footer);