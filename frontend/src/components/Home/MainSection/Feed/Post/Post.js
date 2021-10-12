import React ,{Component} from 'react';
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
import ActionPopUp from './ActionPopup/ActionPopup';


class Post extends Component{

    state = {
        isActionsVisible : false,
    }

    toggleActions = (actionState) =>{
        console.log("called")
        this.setState({
            isActionsVisible: !actionState,
        })
    }
    
    render(){
        return (
            <div className={classes.Post}>
                <div className={classes.Header}>
                    <div className={classes.NamePhoto}>
                        <img src = {this.props.profileImage} alt=""/>
                        <p>{this.props.name}</p>
                    </div>
                    <div className={classes.Category}>
                        <p>{this.props.category}</p>
                        <IconButton onClick = {() => this.toggleActions(this.state.isActionsVisible)}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.PostInfo}>
                    <p>{this.props.about}</p>
                </div>
                <div className={classes.PostImage}>
                    <img src = {this.props.postImage}  alt=""/>
                </div>
                <div className={classes.Interact}>
                    <div className={classes.Icons}>
                        <div className={classes.IconLeft}>
                            <IconButton>
                                <FavoriteBorderOutlinedIcon style={{color:"crimson"}}/>
                            </IconButton>
                            <p>69</p>
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
                <ActionPopUp Visible={this.state.isActionsVisible}/>
            </div>
        )
    }
}

export default Post;