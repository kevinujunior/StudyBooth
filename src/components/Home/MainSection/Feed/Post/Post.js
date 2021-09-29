import React from 'react';
import classes from './Post.css';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {IconButton } from '@mui/material';
const Feed = (props) => {
    return (
        <div className={classes.Post}>
            <div className={classes.Header}>
                <div className={classes.NamePhoto}>
                    <img src = {props.profileImage} alt=""/>
                    <p>{props.name}</p>
                </div>
                <p>{props.category}</p>
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
                        <IconButton>
                            <CommentIcon />
                        </IconButton>
                        <IconButton>
                             <ShareIcon />
                        </IconButton>
                    </div>
                    <div className={classes.IconRight}>
                        <IconButton>
                            <DownloadIcon />
                        </IconButton>
                        <IconButton>
                             <BookmarkIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.PostInfo}>
                    <h4 >{props.name}</h4>
                    <p>{props.about}</p>
                </div>
            </div>
        </div>
    )
}

export default Feed;