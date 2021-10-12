import React, {Component} from 'react';

import classes from './MainSection.css';

import CreateFeed from '../../../components/Home/MainSection/CreateFeed/CreateFeed';
import Feed from '../../../components/Home/MainSection/Feed/Feed';
import Chat from '../Chat/Chat';


class MainSection extends Component {

    render(){
        let toShow;
        if(this.props.show === "Feed"){
            toShow = (
                <div className={classes.Feed}>
                    <CreateFeed />
                    <Feed />
                </div>
            )
        }
        else{
            toShow = <Chat />
        }
        // to show property will decide what to show
        return (
            <div className={classes.MainSection}>
                {toShow}
            </div>
        );
    }
}

export default MainSection;