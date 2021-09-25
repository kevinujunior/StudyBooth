import React, {Component} from 'react';

import classes from './MainSection.css';

import CreateFeed from '../../../components/MainSection/CreateFeed/CreateFeed';
import Feed from '../../../components/MainSection/Feed/Feed';

class MainSection extends Component {

    render(){
        return (
            <div className={classes.MainSection}>
                <div className={classes.Feed}>
                    <CreateFeed />
                    <div className={classes.Line}></div>
                    <Feed />
                </div>
                <div className={classes.Activity}>
                    {/* Activity */}
                </div>
            </div>
        );
    }
}

export default MainSection;