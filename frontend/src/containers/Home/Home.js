import React , {Component} from 'react'
import Header from '../../components/Home/Header/Header';
import classes from './Home.css';
import RightPanel from './RightSection/RightPanel';
import LeftPanel from './LeftPanel/LeftPanel';
import MainSection from './MainSection/MainSection';
import Chat from './Chat/Chat';
import ChatIn from './Chat/chatIn';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {connect } from 'react-redux';

class Home extends Component {

    state = {
        isChatActive: false,
        isLeftPanelVisible: false, //with help of this we can control the visiblity of left panel in mobile view i.e less than 580px
    }

    switchChatState  = (currentState) => {
        this.setState({
            isChatActive: !currentState,
        })
    }

    onHamburgerClick = (currentState) => {
        this.setState({
            isLeftPanelVisible: !currentState,
        })
    }


    render(){
        let ButtonIcon = <ChatBubbleIcon />;
        let homeClasses = [classes.Home];
        if(this.props.theme === 'dark'){
            homeClasses.push(classes.Dark);
        }
       
        return (
            <div className={homeClasses.join(" ")} >
                <Header onHamburgerClick = {() => this.onHamburgerClick(this.state.isLeftPanelVisible)}/>
                <div className={classes.main}>
                    <LeftPanel isVisible = {this.state.isLeftPanelVisible}/> 
                    <MainSection /> 
                    <RightPanel />
                </div>
                <ChatIn />
                <Chat isActive={this.state.isChatActive}/>
                <button className={classes.SwitchButton} onClick={() => this.switchChatState(this.state.isChatActive)}>
                    {ButtonIcon}
                </button>
            </div>
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
    }
}
export default connect(mapStateToProps)(Home)
