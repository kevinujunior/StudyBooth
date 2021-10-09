import React , {Component} from "react";

//This Component will be used to render right Panel of home page.
import classes from './RightPanel.css';
import Activity from "../../../components/Home/RightPanel/Activity/Activity"


class RightPanel extends Component {

  
    render(){


        return (
            <div className={classes.RightPanel}>
                <Activity />
            </div>
        );
    }
}

export default RightPanel;