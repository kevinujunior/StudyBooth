import React, { Component } from 'react';
import classes from './SectionList.css'
import Section from './SectionComp/Section';
import axios from 'axios';

class SectionList extends Component {

    state = {
        sections : [],
    }

    componentDidMount = () => {
        axios.get("http://localhost:8000/feed/sections/")
        .then(response =>{
            const sections = response.data
            this.setState({sections: sections})
            console.log(response)
        }) 
    }


  render() {
    const sections = this.state.sections.map( section => {
        return <Section 
        id={section.id}
        key ={section.id} 
        sectionName={section.sectionName} 
        sectionPic = {section.sectionPic} />
    })
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


  export default SectionList;