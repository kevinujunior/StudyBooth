import React from 'react';

import classes from './CreateFeed.css';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton
 } from '@mui/material';
const createFeed = () => {

    return (
        <div className={classes.CreateFeed}>
            <div className={classes.Type}>
                <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"/>
                <input type="text" placeholder="share some experiences..."/>
            </div>
            <div className={classes.Choose}>
                <IconButton>
                    <InsertPhotoIcon />
                </IconButton>
                <IconButton>
                    <VideoCameraBackIcon />
                </IconButton>
                <IconButton>
                    <AddLinkIcon />
                </IconButton>
                <IconButton>
                    <ArticleIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default createFeed;