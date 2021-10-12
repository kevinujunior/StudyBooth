import React, { Component } from 'react';

import classes from './LeftPanel.css';
import DashBoard from '../../../components/Home/LeftPanel/DashBoard/DashBoard';

class LeftPanel extends Component{
    componentDidUpdate(){
        console.log(this.props)
    }
    render(){
        let classNames = [classes.LeftPanel];
        if(this.props.isVisible){
            classNames.push(classes.Visible)
        }
        return (
            <div className={classNames.join(" ")}>
                <DashBoard />
            </div>
        )
    }
}


export default LeftPanel;