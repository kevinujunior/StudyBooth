import React from 'react';

import classes from './CommentActionPopup.css';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentActionPopUp = (props) => {

    let classN = [classes.CommentActionPopUp];
    if(props.Visible){
        classN.push(classes.Visible);
    }

    return (
        
        <div className={classN.join(" ")}>
            <div onClick={props.deleteCmt}> <DeleteIcon className={classes.grey} /><p>Delete</p></div>
        </div>
    );
}

export default CommentActionPopUp;