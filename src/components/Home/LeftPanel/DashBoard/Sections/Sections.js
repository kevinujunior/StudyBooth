import React from 'react';

import SectionItems from '../DashBoardItems/DashBoardItem';
import classes from './Sections.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faFlask, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons'

const Sections = (props) => {

    let ClassNames = [classes.Sections];
    if(!props.visible){
        ClassNames.push(classes.Visible)
    }
    return (
        <div className={ClassNames.join(" ")}>
            <SectionItems name="Maths" icon = {<FontAwesomeIcon icon={faSquareRootAlt} />}/>
            <SectionItems name="Science" icon = {<FontAwesomeIcon icon={faFlask} />}/>
            <SectionItems name="Machine learning" icon = {<FontAwesomeIcon icon={faRobot} />}/>
        </div>
    );
}

export default Sections;