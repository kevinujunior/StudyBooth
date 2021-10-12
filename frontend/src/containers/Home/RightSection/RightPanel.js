import React , {Component} from "react";
import {connect} from 'react-redux';

//This Component will be used to render right Panel of home page.
import classes from './RightPanel.css';
import Activity from "../../../components/Home/RightPanel/Activity/Activity";
import TopNews from '../../../components/Home/RightPanel/TopNews/TopNews'


class RightPanel extends Component {

  
    render(){
        let classNames = [classes.RightPanel];
        if(this.props.theme === 'dark') classNames.push(classes.Dark)
        return (
            <div className={classNames.join(" ")}>
                <Activity />
                <TopNews  />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(RightPanel);