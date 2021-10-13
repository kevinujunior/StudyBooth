import React, { Component } from 'react';
import classes from './SectionList.css'
import Section from './SectionComp/Section';
export class SectionList extends Component {

  render() {
    return(
        <section className = {classes.leftSection}>
            <div id ={classes.friends}>
                <Section name="Friends" />
                </div>
            <div className = {classes.sectionContainer}>
                <h4 class = {classes.sectionName}> Popular Sections</h4>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
            </div>

            <div class = {classes.sectionContainer}>
                <h4 class = {classes.sectionName}> All Sections</h4>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                <Section name ="Science"/>
                
            </div>

        </section>

        )
    }
  
  }


  export default SectionList;