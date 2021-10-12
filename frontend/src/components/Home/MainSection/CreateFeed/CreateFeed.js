import React from 'react';

import classes from './CreateFeed.css';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton, Button} from '@mui/material';
const createFeed = () => {

    return (
        <div className={classes.CreateFeed}>
            <div className={classes.Type}>
                <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"/>
                <textarea type="text" placeholder="share some experiences..."/>
            </div>
            <div className={classes.line}></div>
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
                <Button variant="outlined" size="small" style={{color:"grey", borderColor: "grey"}}>Share</Button>
            </div>
        </div>
    );
}

export default createFeed;