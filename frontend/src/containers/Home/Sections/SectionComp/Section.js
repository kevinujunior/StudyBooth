import React, { Component } from 'react';
import classes from './Section.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Section = (props) => {
    return(
        <div>
             <a className= {classes.individualSection} href="/login">
                    <div className ={classes.sectionIconHolder}>
                        <img className ={classes.sectionImage} src="images/signin-image.jpg " alt="sign in image" /> 
                    </div>
                    <div className ={classes.sectionTextHolder}>
                        <h3 className={classes.sectionText}>{props.name}</h3>
                    </div>
                    <div className = {classes.star}>
                        <StarBorderIcon className = {classes.starButton}/>
                    </div>
                </a>
        </div>
       
        
    )
}

export default Section;