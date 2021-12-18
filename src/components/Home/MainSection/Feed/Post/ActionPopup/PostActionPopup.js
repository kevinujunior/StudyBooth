import React from 'react';

import classes from './ActionPopup.css';

import ShareIcon from '@mui/icons-material/Share';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from 'react'

const PostActionPopUp = (props) => {

    let classN = [classes.ActionPopUp];
    
    let currUserID = localStorage.getItem('user');

    const [bottom, setBottom] = useState(null)

    return (
        <div ref={el => {
            if(!el) return;
            console.log(window.innerHeight - el.getBoundingClientRect().bottom)
            if(el.getBoundingClientRect().bottom >= 600) setBottom(1);
            console.log(bottom)
          }} >
            <div className={classes.Backdrop} onClick={props.close} ></div>
            <div className={[classes.ActionPopUp, bottom ? classes.bottom : classes.top ].join(" ")} >
                <div> <ShareIcon className={classes.grey}/> <p>Share</p></div>
                <div><TurnedInIcon className={classes.grey}/> <p>Save</p> </div>
                <div><FileDownloadIcon className={classes.grey}/> <p>Download</p> </div>
                <div> <BlockIcon className={classes.grey}/> <p>Block</p></div>
                {currUserID == props.userId ? <div onClick={props.onDeletePost}> <DeleteIcon className={classes.grey} /><p>Delete</p></div> : null}
            </div>
        </div>
    );
}

export default PostActionPopUp;