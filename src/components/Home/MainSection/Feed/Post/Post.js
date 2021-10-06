import React from 'react';
import classes from './Post.css';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import ShareIcon from '@mui/icons-material/Share';
// import DownloadIcon from '@mui/icons-material/Download';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton } from '@mui/material';
const Feed = (props) => {
    return (
        <div className={classes.Post}>
            <div className={classes.Header}>
                <div className={classes.NamePhoto}>
                    <img src = {props.profileImage} alt=""/>
                    <p>{props.name}</p>
                </div>
                <div className={classes.Category}>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <p>{props.category}</p>
                </div>
            </div>
            <div className={classes.PostInfo}>
                <p>{props.about}</p>
            </div>
            <div className={classes.PostImage}>
                <img src = {props.postImage}  alt=""/>
            </div>
            <div className={classes.Interact}>
                <div className={classes.Icons}>
                    <div className={classes.IconLeft}>
                        <IconButton>
                            <ThumbUpIcon style={{color: "green"}}/>
                        </IconButton>
                        <IconButton>
                            <ThumbDownIcon style={{color: "lightblue"}}/>
                        </IconButton>
                    </div>
                    <div className={classes.VerticalLine}></div>
                    <div className={classes.Comment}>
                        <input type="text" placeholder="write a comment"/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Feed;