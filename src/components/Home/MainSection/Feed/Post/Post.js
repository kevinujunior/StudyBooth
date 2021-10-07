import React from 'react';
import classes from './Post.css';

// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import ShareIcon from '@mui/icons-material/Share';
// import DownloadIcon from '@mui/icons-material/Download';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
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
                    <p>{props.category}</p>
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
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
                            <FavoriteBorderOutlinedIcon style={{color:"crimson"}}/>
                        </IconButton>
                    </div>
                    <div className={classes.VerticalLine}></div>
                    <div className={classes.Comment}>
                        <input type="text" placeholder="write a comment..."/>
                    </div>
                    <IconButton>
                        <SendRoundedIcon style={{color:"#1e90ff"}}/>
                    </IconButton>
                </div>
                
            </div>
        </div>
    )
}

export default Feed;