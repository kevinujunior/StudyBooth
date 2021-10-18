import React, { Component } from 'react';
import classes from './CommentSection.css';

import CommentItem from './CommentItem/CommentItem';

class CommentSection extends Component{


    
    render(){
        let CmtSectionClass = [classes.CommentSection];
        if(this.props.theme === 'dark'){
            CmtSectionClass.push(classes.Dark)
        }
        if(this.props.Visible){
            CmtSectionClass.push(classes.Visible)
        }
        return(
            <div className={CmtSectionClass.join(" ")}>
                <CommentItem theme = {this.props.theme}/>
                <CommentItem theme = {this.props.theme}/>
                <CommentItem theme = {this.props.theme}/>
                <CommentItem theme = {this.props.theme}/>
                <button className={classes.LoadMore}>load more Comments</button>
            </div>
        )
    }
}

export default CommentSection;