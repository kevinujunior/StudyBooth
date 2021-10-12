import React from 'react';
import {connect} from 'react-redux';

import classes from './CreateFeed.css';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton, Button} from '@mui/material';
const createFeed = (props) => {

    let createFeedClasses = [classes.CreateFeed]
    if(props.theme === 'dark') createFeedClasses.push(classes.Dark);
    return (
        <div className={createFeedClasses.join(" ")}>
            <div className={classes.Type}>
                <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"/>
                <textarea type="text" placeholder="share some experiences..."/>
            </div>
            <div className={classes.line}></div>
            <div className={classes.Choose}>
                <IconButton>
                    <InsertPhotoIcon className={classes.IconColor}/>
                </IconButton>
                <IconButton>
                    <VideoCameraBackIcon className={classes.IconColor}/>
                </IconButton>
                <IconButton>
                    <AddLinkIcon className={classes.IconColor}/>
                </IconButton>
                <IconButton>
                    <ArticleIcon className={classes.IconColor}/>
                </IconButton>
                <Button variant="outlined" size="small"  className={classes.IconColor}>Share</Button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(createFeed);