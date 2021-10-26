import React, { Component } from 'react';
import classes from './Section.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';

class Section extends Component {

    // state = {
    //     isRepliesVisible: false,
    //     isReplyBoxVisible: false,
    // }
    state = {
        posts : [],
    }

    sectionHandler = () => {
            axios.get("http://localhost:8000/feed/posts/?section="+this.props.id)
            .then(response =>{
                const posts= response.data
                this.setState({posts: posts})
                console.log(response)
                console.log(this.props.id)
            })
            
        }


    render(){
    return(
        <div>
             <a className= {classes.individualSection} onClick = {this.sectionHandler} >
                    <div className ={classes.sectionIconHolder}>
                        <img className ={classes.sectionImage} src={this.props.sectionPic} alt="lol" /> 
                    </div>
                    <div className ={classes.sectionTextHolder}>
                        <h3 className={classes.sectionText}>{this.props.sectionName}</h3>
                    </div>
                    <div className = {classes.star}>
                        <StarBorderIcon className = {classes.starButton}/>
                    </div>
                </a>
        </div>
       
        
    )
    }
}

export default Section;