import React from 'react';

import classes from './ActionPopup.css';

import ShareIcon from '@mui/icons-material/Share';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';

const PostActionPopUp = (props) => {

    let classN = [classes.ActionPopUp];
    if(props.Visible){
        classN.push(classes.Visible);
    }
    
    let currUserID = localStorage.getItem('user');

    return (
        
        <div className={classN.join(" ")}>
            <div> <ShareIcon className={classes.grey}/> <p>Share</p></div>
            <div><TurnedInIcon className={classes.grey}/> <p>Save</p> </div>
            <div><FileDownloadIcon className={classes.grey}/> <p>Download</p> </div>
            <div> <BlockIcon className={classes.grey}/> <p>Block</p></div>
            {currUserID == props.userId ? <div onClick={props.onDeletePost}> <DeleteIcon className={classes.grey} /><p>Delete</p></div> : null}
        </div>
    );
}

export default PostActionPopUp;