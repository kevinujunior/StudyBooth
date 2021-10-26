import React, { Component } from 'react';
import classes from './Section.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/feed';

class Section extends Component {

    // state = {
    //     isRepliesVisible: false,
    //     isReplyBoxVisible: false,
    // }
    state = {
        posts : [],
    }

    sectionHandler = () => {
        this.props.onFilterFeedBySection(this.props.id);
        document.documentElement.scrollTop = 0; //scrolling to top 
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

const mapDispatchToProps = dispatch => {
    return {
        onFilterFeedBySection: (id) => dispatch(actions.fetchFeedFilterBySection(id)),
    }
}
export default connect(null,mapDispatchToProps)(Section);