import React , {Component} from "react";
import {connect} from 'react-redux';

//This Component will be used to render right Panel of home page.
import classes from './RightPanel.css';
import UserProfile from '../../../components/Profile/RightPanel/UserProfile'


class RightPanel extends Component {

  
    render(){
        let classNames = [classes.RightPanel];
        if(this.props.theme === 'dark') classNames.push(classes.Dark)
        return (
            <div className={classNames.join(" ")}>
                <UserProfile user={this.props.user ? this.props.user[0] : null } postUnfollow={this.props.postUnfollow}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(RightPanel);