import React, {Component} from 'react';

import classes from './MainSection.css';

import Feed from '../../../components/Home/MainSection/Feed/Feed';

class MainSection extends Component {

    render(){
        // to show property will decide what to show
        return (
            <div className={classes.MainSection}>
                <div className={classes.Feed}>
                    {/* <CreateFeed /> */}
                    <Feed />
                </div>
            </div>
        
        );
    }
}

export default MainSection;