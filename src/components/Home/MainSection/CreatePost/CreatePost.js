import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './CreatePost.css';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
// import AddLinkIcon from '@mui/icons-material/AddLink';
// import ArticleIcon from '@mui/icons-material/Article';
import { Button} from '@mui/material';
import * as actions from '../../../../store/actions/feed';
import LoadingBar from '../../../UI/LoadingBar/LoadingBar';

import imageCompression from 'browser-image-compression';

class  createPost extends Component {

    state = {
        postCaption : "",
        selectedfile: null,
        fileType: "",
        error:"",
        loading:false,
    }

    fileSelectHandler = (event) => {
        if(event.target.files[0] === null) return;

        this.setState({
            selectedfile: event.target.files[0],
            fileType: event.target.files[0].type,
        })
    }


    handleImageUpload = (event) => {

        const imageFile = this.state.selectedfile;
        this.setState({loading:true});
        if(imageFile == null){
            this.makePost();
            return;
        }
        // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        let component = this;
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        imageCompression(imageFile, options)
        .then(function (compressedFile) {
            // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            component.makePost(compressedFile); // write your own logic
        })
        .catch(function (error) {
            console.log(error.message);
        });

    }


    makePost = (file) => {
        //if user has not selected image and not written some caption then we should return.
        if(this.state.postCaption == null && this.state.selectedfile ==null) return;
        console.log(file)
        const formData = new FormData();

        formData.append('postCaption' , this.state.postCaption)
        if(this.state.selectedfile!==null){
            formData.append('postFile' , file)
        }
        formData.append('user' ,localStorage.getItem('user'))
       
        this.props.onCreateNewPost(formData, (isError, errorMsg) => {
            if(isError){
                this.setState({
                    loading:false,
                    error: errorMsg,
                })
            }
            else{
                this.props.closeModal();
                this.setState({
                    loading:false,
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
                    <img src={this.props.currUser ? this.props.currUser.userPic :"https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"} alt=""/>
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
                    {/* <UploadButton accept="video/*" onChange={this.fileSelectHandler}>
                        <VideoCameraBackIcon className={classes.IconColor}/>
                    </UploadButton> */}
                    {/* <input type="file"  onChange={this.fileSelectHandler}/> */}
                    <Button variant="outlined" size="small"  className={classes.IconColor} onClick={this.handleImageUpload}>Share</Button>
                </div>
                {this.state.loading ? <LoadingBar backgroundColor={this.props.theme === 'dark' ?"#4150AF":"#234EBA"}/> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
        currUser: state.currentUser.data,
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