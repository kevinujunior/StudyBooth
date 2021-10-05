import React, {Component} from 'react';

import classes from './MainSection.css';

import CreateFeed from '../../../components/Home/MainSection/CreateFeed/CreateFeed';
import Feed from '../../../components/Home/MainSection/Feed/Feed';
import TodaysWord from '../../../components/Home/MainSection/TodaysWord/TodaysWord';
import Activity from '../../../components/Home/MainSection/Activity/Activity';

class MainSection extends Component {

    render(){
        return (
            <div className={classes.MainSection}>
                <div className={classes.Feed}>
                    <CreateFeed />
                    {/* <div className={classes.Line}></div> */}
                    <Feed />
                </div>
                {/* <div className={classes.Activity}>
                    <TodaysWord />
                    <Activity />
                </div> */}
            </div>
        );
    }
}

export default MainSection;