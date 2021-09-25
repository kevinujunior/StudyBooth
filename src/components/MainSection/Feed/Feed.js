import React from 'react';
import classes from './Feed.css';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {IconButton } from '@mui/material';
const Feed = () => {
    return (
        <div className={classes.Feed}>
            <div className={classes.Header}>
                <div className={classes.NamePhoto}>
                    <img src = "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
                    <p>Alien</p>
                </div>
                <p>Science</p>
            </div>
            <div className={classes.Post}>
                <img src = "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" />
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
                    <h4 id={classes.cool}>Alien</h4>
                    <p>See this is my thopda.</p>
                </div>
            </div>
        </div>
    )
}

export default Feed;