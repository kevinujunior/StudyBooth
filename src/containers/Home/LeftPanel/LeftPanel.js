import React, { Component } from 'react';

import classes from './LeftPanel.css';
import DashBoard from '../../../components/Home/LeftPanel/DashBoard/DashBoard';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import {connect} from 'react-redux';
import Auxi from '../../../HOC/Auxi/Auxi'

class LeftPanel extends Component{
    
    render(){
        let classNames = [classes.LeftPanel];
        if(this.props.theme === 'dark') classNames.push(classes.Dark)
        if(this.props.isVisible){
            classNames.push(classes.Visible)
        }

        return (
            <Auxi>
                <Backdrop show={this.props.isVisible} clicked={this.props.closeLeftPanel}/>
                <div className={classNames.join(' ')}>
                    <DashBoard />
                </div>
            </Auxi>
        )
    }
}

const mapStateToProps = state =>{
    return{
        theme: state.theme.theme
    }
}

export default connect(mapStateToProps)(LeftPanel);