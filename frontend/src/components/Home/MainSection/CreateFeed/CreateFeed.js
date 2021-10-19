import React from 'react';
import {connect} from 'react-redux';
import classes from './CreateFeed.css';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton, Button} from '@mui/material';
import axios from 'axios';
const CreateFeed = (props) => {
    const [post, setPost] = React.useState(null);
    var imageURL = null;
    React.useEffect(() => {
      axios.get(`http://localhost:8000/feed/posts/`).then((response) => {
        setPost(response.data);
      });
    }, []);

    function createPost() {
        console.log(imageURL);
        axios
          .post('http://localhost:8000/feed/posts/', {
            PostCaption: document.getElementById("PostCaption").value,
            Postfile: imageURL,
            User:1,
            PostSection:1
          })
          .then((response) => {
            setPost(response.data);
            console.log(response.data);
          });
          if (!post) return "No post!"

      }
    function onImageChange(e) {
        console.log("Hell");
        if (e.target.files && e.target.files[0]) {
            imageURL = e.target.files[0];
            console.log(e.target.files[0]);
    }}
    let createFeedClasses = [classes.CreateFeed]
    if(props.theme === 'dark') createFeedClasses.push(classes.Dark);
    return (
        <div className={createFeedClasses.join(" ")}>
            <div className={classes.Type}>
                <img src="https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg"/>
                <textarea type="text" placeholder="share some experiences..." id="PostCaption"></textarea>
                <input
                    type="file"
                    onChange={onImageChange}
                />
                
            </div>
            <div className={classes.line}></div>
            <div className={classes.Choose}>
                <IconButton>
                    <InsertPhotoIcon className={classes.IconColor}/>
                </IconButton>
                <IconButton>
                    <VideoCameraBackIcon className={classes.IconColor}/>
                </IconButton>
                <IconButton>
                    <AddLinkIcon className={classes.IconColor}/>
                </IconButton>
                <IconButton>
                    <ArticleIcon className={classes.IconColor}/>
                </IconButton>
                <Button variant="outlined" size="small"  className={classes.IconColor} onClick={createPost}>Share</Button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(CreateFeed);