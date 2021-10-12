import React, { Component } from 'react';

import classes from './LeftPanel.css';
import DashBoard from '../../../components/Home/LeftPanel/DashBoard/DashBoard';

class LeftPanel extends Component{
    
    render(){
        return (
            <div className={classes.LeftPanel}>
                <DashBoard changeMain = {this.props.changeMain}/>
            </div>
        )
    }
}


export default LeftPanel;