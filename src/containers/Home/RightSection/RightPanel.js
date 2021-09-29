import React , {Component} from "react";

//This Component will be used to render right Panel of home page.
import Profile from "../../../components/Home/RightPanel/Profile/Profile";
import TopNews from "../../../components/Home/RightPanel/TopNews/TopNews";
import classes from './RightPanel.css';
import Chat from '../Chat/Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';

class RightPanel extends Component {

    state = {
        visible : "profile",
    }


    switchSection  = (currentSection) => {
        
        let newSection  = currentSection === "chat" ? "profile" : "chat";
        this.setState({
            visible: newSection,
        })
    }
    render(){

        let toShow = null;
        let ButtonIcon = null;

        if(this.state.visible === "profile"){
            toShow = (
                <div>
                    <Profile />
                    <TopNews />
                </div>
            )

            ButtonIcon = <ChatBubbleIcon />;
        }

        if(this.state.visible === "chat"){
            toShow = <Chat />;
            ButtonIcon = <PersonIcon />;
        }
        return (
            <div className={classes.RightPanel}>
                {toShow}
                <button className={classes.SwitchButton} onClick={() => this.switchSection(this.state.visible)}>
                    {ButtonIcon}
                </button>
            </div>
        );
    }
}

export default RightPanel;