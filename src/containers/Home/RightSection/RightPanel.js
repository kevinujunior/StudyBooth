import React , {Component} from "react";

//This Component will be used to render right Panel of home page.
import Profile from "../../../components/Home/RightPanel/Profile/Profile";
import TopNews from "../../../components/Home/RightPanel/TopNews/TopNews";
import classes from './RightPanel.css';


class RightPanel extends Component {

  
    render(){

        let toShow = (
            <div>
                <Profile />
                <TopNews />
            </div>
        );

        return (
            <div className={classes.RightPanel}>
                {toShow}
            </div>
        );
    }
}

export default RightPanel;