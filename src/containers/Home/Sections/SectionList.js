import React, { Component } from 'react';
import classes from './SectionList.css'
import Section from './SectionComp/Section';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class SectionList extends Component {

    componentDidMount = () => {
        this.props.onFetchSection();
    }


    render() {

        let sections  = <Spinner />;

        // if(this.props.sections != null){
        //     sections = this.props.sections.map( section => {
        //         return <Section 
        //         id={section.id}
        //         key ={section.id} 
        //         sectionName={section.sectionName} 
        //         sectionPic = {section.sectionPic} />
        //     })
        // }

        return(
            <section className = {classes.leftSection}>
                <div id ={classes.friends}>
                    <Section sectionName="Friends" sectionPic="images/signin-image.jpg" />
                    </div>
                <div className = {classes.sectionContainer}>
                    <h4 class = {classes.sectionName}> Popular Sections</h4>
                    {sections}
                </div>

                <div class = {classes.sectionContainer}>
                    <h4 class = {classes.sectionName}> All Sections</h4>
                    {sections}
                </div>

            </section>
        )
    }
  
}

const mapStateToProps = state => {
    return {
        sections: state.feed.sections,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchSection : () => dispatch(actions.fetchSection()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionList);