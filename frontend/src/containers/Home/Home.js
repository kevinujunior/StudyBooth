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
import Modal from '../../components/UI/Modal/Modal';
import CreateFeed from '../../components/Home/MainSection/CreatePost/CreatePost';
import * as actions from '../../store/actions/index'

class Home extends Component {

    state = {
        isChatActive: false,
        isLeftPanelVisible: false, //with help of this we can control the visiblity of left panel in mobile view i.e less than 580px
        isCreatePostVisible: false,
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

    componentDidMount() {
        this.props.onFetchCurrentUserDetail();
    }

    render(){
        let ButtonIcon = <ChatBubbleIcon />;
        let homeClasses = [classes.Home];
        if(this.props.theme === 'dark'){
            homeClasses.push(classes.Dark);
        }
       
        return (
            <div className={homeClasses.join(" ")} >
                <Header 
                    onHamburgerClick = {() => this.onHamburgerClick(this.state.isLeftPanelVisible)}
                    onCreateFeedClick = {() => this.onCreateFeedClick(this.state.isCreatePostVisible)}
                />
                <Modal show={this.state.isCreatePostVisible} closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}>
                    {this.state.isCreatePostVisible ? <CreateFeed  closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}  /> : null }
                </Modal>
                <div className={classes.main}>
                    <LeftPanel isVisible = {this.state.isLeftPanelVisible}/> 
                    <MainSection /> 
                    {/* <ChatIn /> */}
                    <RightPanel />
                </div>
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

const mapDispatchToProps = dispatch => {
    return {
        onFetchCurrentUserDetail: () => dispatch(actions.fetchCurrentUser()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)