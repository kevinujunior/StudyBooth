import React , {Component} from "react";

//This Component will be used to render right Panel of home page.
import classes from './RightPanel.css';
import Activity from "../../../components/Home/RightPanel/Activity/Activity";
import TopNews from '../../../components/Home/RightPanel/TopNews/TopNews'


class RightPanel extends Component {

  
    render(){


        return (
            <div className={classes.RightPanel}>
                <Activity />
                <TopNews  />
            </div>
        );
    }
}

export default RightPanel;