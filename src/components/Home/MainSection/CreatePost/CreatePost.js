import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './CreatePost.css';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton, Button} from '@mui/material';
import * as actions from '../../../../store/actions/feed'

class  createPost extends Component {

    state = {
        postCaption : "",
        selectedfile: null,
        fileType: "",
        error:"",
    }

    fileSelectHandler = (event) => {
        if(event.target.files[0] === null) return;

        this.setState({
            selectedfile: event.target.files[0],
            fileType: event.target.files[0].type,
        })
    }



    makePost = () => {
        //if user has not selected image and not written some caption then we should return.
        if(this.state.postCaption == null && this.state.selectedfile ==null) return;

        const formData = new FormData();

        formData.append('postCaption' , this.state.postCaption)
        if(this.state.selectedfile!==null){
            formData.append('postFile' , this.state.selectedfile)
        }
        formData.append('user' ,localStorage.getItem('user'))
       
        this.props.onCreateNewPost(formData, () => {
            console.log("callBack called")
            if(localStorage.getItem("createPostError") !== 'null'){
                this.setState({
                    error: JSON.parse(localStorage.getItem("createPostError")),
                })
                console.log(this.state.error)
                localStorage.setItem("createPostError",null)
            }
            else{
                this.props.closeModal();
                this.setState({
                    error: null,
                })
            }
        })
        
        
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
                return <img src={this.state.selectedfile ? URL.createObjectURL(this.state.selectedfile) : null} alt=""/>;
            case "video":
                return <video controls>
                    <source src={this.state.selectedfile ? URL.createObjectURL(this.state.selectedfile) : null}></source>
                </video>;
            default:
                return null;
        }
    }

    render(){
        let createFeedClasses = [classes.CreateFeed]
        if(this.props.theme === 'dark') createFeedClasses.push(classes.Dark);
        return (
            <div className={createFeedClasses.join(" ")}>
                <div className={classes.Type}>
                    <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg" alt=""/>
                    <div className={classes.Errormessage}>
                    <textarea type="text" value ={this.state.postCaption} placeholder="share some experiences..." onChange={(event) => this.setState({postCaption: event.target.value})}  onInput={(event) => this.auto_grow(event)} required/>
                    <p>{this.state.error ? this.state.error.postCaption : null}</p>
                    </div>
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
                    {/* <input type="file"  onChange={this.fileSelectHandler}/> */}
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

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewPost : (formData, callBack) => dispatch(actions.createNewPost(formData, callBack))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createPost);

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