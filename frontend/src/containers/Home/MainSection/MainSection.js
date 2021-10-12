import React, {Component} from 'react';

import classes from './MainSection.css';

import CreateFeed from '../../../components/Home/MainSection/CreateFeed/CreateFeed';
import Feed from '../../../components/Home/MainSection/Feed/Feed';


class MainSection extends Component {

    render(){
        
        return (
            <div className={classes.MainSection}>
                <div className={classes.Feed}>
                    <CreateFeed />
                    <Feed />
                </div>
            </div>
        );
    }
}

export default MainSection;