import React, { Component } from 'react';

import classes from './ActionPopup.css';

import ShareIcon from '@mui/icons-material/Share';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import onClickOutside from 'react-onclickoutside'

class PostActionPopUp extends Component {
    
    state = {
        bottom:null,
    }

    setBottom(val) {
        if(this.state.bottom === val) return;
        this.setState({bottom:val});
    }

    handleClickOutside(){
        this.props.close();
    }

    render(){
        let currUserID = localStorage.getItem('user');

        return (
            <div ref={el => {
                if(!el) return;
                if(el.parentElement.getBoundingClientRect().top >= window.innerHeight - 400) this.setBottom(1);
              }} >
                <div className={[classes.ActionPopUp, this.state.bottom ? classes.bottom : classes.top, this.props.theme === 'dark'? classes.Dark : null ].join(" ")} >
                    <div> <ShareIcon className={classes.grey}/> <p>Share</p></div>
                    <div><TurnedInIcon className={classes.grey}/> <p>Save</p> </div>
                    <div><FileDownloadIcon className={classes.grey}/> <p>Download</p> </div>
                    <div> <BlockIcon className={classes.grey}/> <p>Block</p></div>
                    {currUserID == this.props.userId ? <div onClick={() => {
                        this.props.onDeletePost();
                        this.props.close();
                    }}> <DeleteIcon className={classes.grey} /><p>Delete</p></div> : null}
                </div>
            </div>
        );
    }
}

export default onClickOutside(PostActionPopUp);