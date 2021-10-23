import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './CreateFeed.css';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton, Button} from '@mui/material';
import axios from 'axios';


class  createFeed extends Component {

    state = {
        selectedfile: null,
        fileType: "",
        
    }

    fileSelectHandler = (event) => {
        if(event.target.files[0] == null) return;
        this.setState({
            selectedfile: event.target.files[0],
            fileType: event.target.files[0].type,
        })
    }

    makePost = () => {
        axios.post("url",{

        }).then((res) => {
            console.log(res);
        })
        this.props.closeModal();
    }


    auto_grow(element) { //this funciton is needed to auto height textarea.
        element = element.target
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
    }


    getContentRenderer = () => {
        let file = this.state.fileType.split('/')[0];
        switch (file) {
            case "image":
                return <img src={this.state.selectedfile ? URL.createObjectURL(this.state.selectedfile) : null}/>;
            case "video":
                return <video controls>
                    <source src={this.state.selectedfile ? URL.createObjectURL(this.state.selectedfile) : null}></source>
                </video>;
            default:
                return null;
        }
    }

    componentWillMount(){
        console.log("create feed unmount")
        this.setState({
            selectedfile:null,
        })
    }

    render(){
        let createFeedClasses = [classes.CreateFeed]
        if(this.props.theme === 'dark') createFeedClasses.push(classes.Dark);
        return (
            <div className={createFeedClasses.join(" ")}>
                <div className={classes.Type}>
                    <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"/>
                    <textarea type="text" placeholder="share some experiences..." onInput={(event) => this.auto_grow(event)}/>
                </div>
                <div className={classes.Content}>
                    {this.getContentRenderer()}
                </div>
                <div className={classes.line}></div>
                <div className={classes.Choose}>
                    <UploadButton accept="image/*" onChange={this.fileSelectHandler}>
                        <InsertPhotoIcon className={classes.IconColor}/>
                    </UploadButton>
                    <UploadButton accept="video/*" onChange={this.fileSelectHandler}>
                        <VideoCameraBackIcon className={classes.IconColor}/>   
                    </UploadButton>
                    <Button variant="outlined" size="small"  className={classes.IconColor} onClick={this.makePost}>Share</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(createFeed);

function UploadButton  (props) {
    return (
        <div>
            <label style={{position:'relative'}}>
                <input type="file" style={{display:'none'}} accept={props.accept} onChange={props.onChange}/>
                {props.children}
            </label>
        </div>
    );
}