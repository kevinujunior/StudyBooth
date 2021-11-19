import React, { Component } from 'react';

import classes from './LeftPanel.css';
import DashBoard from '../../../components/Profile/LeftPanel/DashBoard';
import {connect} from 'react-redux';

class LeftPanel extends Component{
    
    render(){
        let classNames = [classes.LeftPanel];
        if(this.props.theme === 'dark') classNames.push(classes.Dark)
        if(this.props.isVisible){
            classNames.push(classes.Visible)
        }
        return (
            <div className={classNames.join(' ')}>
                <DashBoard />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        theme: state.theme.theme
    }
}

export default connect(mapStateToProps)(LeftPanel);