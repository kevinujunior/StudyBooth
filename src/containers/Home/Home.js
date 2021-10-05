import React , {Component} from 'react'
import Header from '../../components/Home/Header/Header'
import classes from './Home.css'
import RightPanel from './RightSection/RightPanel'
import LeftSection from './LeftSection/LeftSection';
import MainSection from './MainSection/MainSection';
import Chat from './Chat/Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

class Home extends Component {

    state = {
        isChatActive: false,
    }
    
    switchChatState  = (currentState) => {
        console.log("state changed")
        this.setState({
            isChatActive: !currentState,
        })
    }
    
    render(){
        let ButtonIcon = <ChatBubbleIcon />;
        return (
            <div className={classes.Home}>
                {/* Header */}
                <Header />
                <div className={classes.main}>
                    <LeftSection/>
                    <MainSection />
                    <RightPanel />
                </div>
                <Chat isActive = {this.state.isChatActive} />
                {/* <h4>Home</h4> */}
                {/* Left Sidebar */}
                {/* Feed */}
                {/* Right Sidebar */}
                {/* Footer */}
                <button className={classes.SwitchButton} onClick={() => this.switchChatState(this.state.isChatActive)}>
                    {ButtonIcon}
                </button>
            </div>
        )
    }
}

export default Home
