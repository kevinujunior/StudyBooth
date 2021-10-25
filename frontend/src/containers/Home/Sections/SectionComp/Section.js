import React, { Component } from 'react';
import classes from './Section.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';

class Section extends Component {

    // state = {
    //     isRepliesVisible: false,
    //     isReplyBoxVisible: false,
    // }
    

    render(){
    return(
        <div>
             <a className= {classes.individualSection} >
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