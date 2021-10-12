import React, { Component } from 'react';

import classes from './LeftPanel.css';
import DashBoard from '../../../components/Home/LeftPanel/DashBoard/DashBoard';
import {connect} from 'react-redux';

class LeftPanel extends Component{
    componentDidUpdate(){
        console.log(this.props)
    }
    render(){
        let classNames = [classes.LeftPanel];
        if(this.props.theme === 'dark') classNames.push(classes.Dark)
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

const mapStateToProps = state =>{
    return{
        theme: state.theme
    }
}

export default connect(mapStateToProps)(LeftPanel);