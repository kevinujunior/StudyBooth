import React , {Component} from 'react'
import Header from '../../components/Home/Header/Header';
import classes from './Home.css';
import RightPanel from './RightSection/RightPanel';
import LeftPanel from './LeftPanel/LeftPanel';
import MainSection from './MainSection/MainSection';
import Chat from './Chat/Chat';
// import ChatIn from './Chat/chatIn';
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
        feedCurrPageNo: null, //
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


    render(){
        let ButtonIcon = <ChatBubbleIcon />;
        let homeClasses = [classes.Home];
        if(this.props.theme === 'dark'){
            homeClasses.push(classes.Dark);
        }
        return (
            <div className={homeClasses.join(" ")} onScroll ={(e) => {
                    //here we are checking the scroll of home page and if scroll reaches to end we are calling fetchFeed for next page.
                    if(Math.round(e.target.scrollHeight -  e.target.scrollTop) <= e.target.offsetHeight + 400){
                        if(this.props.nextPageNo == this.state.feedCurrPageNo) return; //if we are calling for same page again return;
                        this.props.onFetchFeed(this.props.nextPageNo, this.props.loading)
                        this.setState({
                            feedCurrPageNo: this.props.nextPageNo,
                        })
                    }
                }}>
                    <Header 
                        onHamburgerClick = {() => this.onHamburgerClick(this.state.isLeftPanelVisible)}
                        onCreateFeedClick = {() => this.onCreateFeedClick(this.state.isCreatePostVisible)}
                    />
                    <Modal show={this.state.isCreatePostVisible} closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}>
                        {this.state.isCreatePostVisible ? <CreateFeed  closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}  /> : null }
                    </Modal>
                    <div className={classes.main}>
                        <LeftPanel isVisible = {this.state.isLeftPanelVisible} closeLeftPanel={() => this.onHamburgerClick(this.state.isLeftPanelVisible)}/> 
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
        nextPageNo: state.feed.nextPageNo,
        loading: state.feed.isFeedLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFeed: (pageNo) => dispatch(actions.fetchFeed(pageNo)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
