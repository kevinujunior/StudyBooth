import React, {Component} from 'react';

import classes from './MainSection.css';
import Posts from '../../../components/Profile/MainSection/UserPosts'

class MainSection extends Component {

    render(){
        // to show property will decide what to show
        return (
            <div className={classes.MainSection}>
                <div className={classes.Feed}>
                   {this.props.posts ? <Posts posts={this.props.posts}/> : <p>You don't follow this user.</p>}
                </div>
            </div>
        
        );
    }
}

export default MainSection;