import React from 'react';
import styles from './Footer.css';

import {IconButton} from '@mui/material'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

import { useHistory } from 'react-router-dom';

const Footer = (props) => {

    let history = useHistory();

    return(
        <div className={[styles.Footer, props.theme === 'dark' ? styles.Dark : null].join(" ")}>
            <IconButton onClick={() => props.setLeftPanel(true)} className={styles.Icon}><AccountCircleIcon /></IconButton>
            <IconButton onClick={() => props.onCreateFeedClick(true)} className={styles.Icon}><AddCircleRoundedIcon /></IconButton>
            <IconButton onClick={() => history.push('/search')} className={styles.Icon}><SearchIcon /></IconButton>
            {/* <IconButton onClick={() => history.push('/chat')}><MarkChatUnreadIcon /></IconButton>
            <IconButton onClick={() => history.push('/home')}><HomeIcon /></IconButton> */}
        </div>
    )
}

export default Footer;