import React, {Component} from 'react';
import classes from './Layout.css';
import Header from '../../components/Home/Header/Header';
import Modal from '../../components/UI/Modal/Modal';
import CreateFeed from '../../components/Home/MainSection/CreatePost/CreatePost';
import Chat from '../../containers/Home/Chat/Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LeftPanel from '../../containers/Home/LeftPanel/LeftPanel'
class Layout extends Component {

    state = {
        isChatActive: false,
        isLeftPanelVisible: false, //with help of this we can control the visiblity of left panel in mobile view i.e less than 580px
        isCreatePostVisible: false,
        shouldLeftPanelVisible: false,
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

    onCreateFeedClick = (currentState) => {
        this.setState({
            isCreatePostVisible: !currentState,
        })
    }


    componentDidMount(){
        if(window.innerWidth >= 630) this.setState({shouldLeftPanelVisible:false}) ;
        window.addEventListener('resize', () => {
            console.log(window.innerWidth)
            if(window.innerWidth >= 630) this.setState({shouldLeftPanelVisible:false})
            else this.setState({shouldLeftPanelVisible:true})
        })
    }

    render(){
        let ButtonIcon = <ChatBubbleIcon />;
        return (
            <div className={classes.Layout}>
                <Header 
                    onHamburgerClick = {() => this.onHamburgerClick(this.state.isLeftPanelVisible)}
                    onCreateFeedClick = {() => this.onCreateFeedClick(this.state.isCreatePostVisible)}
                />
                {this.props.children}

                {this.state.shouldLeftPanelVisible ? <LeftPanel isVisible = {this.state.isLeftPanelVisible} closeLeftPanel={() => this.onHamburgerClick(this.state.isLeftPanelVisible)}/> : null}

                <Modal show={this.state.isCreatePostVisible} closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}>
                    {this.state.isCreatePostVisible ? <CreateFeed  closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}  /> : null }
                </Modal>

                <Chat isActive={this.state.isChatActive}/>

                <button className={classes.SwitchButton} onClick={() => this.switchChatState(this.state.isChatActive)}>
                    {ButtonIcon}
                </button>
            </div>
        );
    }
}

export default Layout;