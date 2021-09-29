import React , {Component} from "react";

//This Component will be used to render right Panel of home page.
import Profile from "../../../components/Home/RightPanel/Profile/Profile";
import TopNews from "../../../components/Home/RightPanel/TopNews/TopNews";
import classes from './RightPanel.css';


class RightPanel extends Component {

    render(){
        return (
            <div className={classes.RightPanel}>
                <Profile />
                <TopNews />
            </div>
        );
    }
}

export default RightPanel;