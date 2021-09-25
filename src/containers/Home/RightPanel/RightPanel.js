import React , {Component} from "react";

import classes from './RightPanel.css';

//This Component will be used to render right Panel of home page.

class RightPanel extends Component {

    render(){
        return (
            <div className={classes.RightPanel}>
                <p>Hello world!!</p>
            </div>
        );
    }
}

export default RightPanel;