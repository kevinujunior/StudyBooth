import React, {Component} from 'react';
import classes from './Layout.css';
import Header from '../../components/UI/Header/Header';
import Modal from '../../components/UI/Modal/Modal';
import CreateFeed from '../../components/Home/MainSection/CreatePost/CreatePost';
import LeftPanel from '../../containers/Home/LeftPanel/LeftPanel'
import Footer from '../../components/UI/Footer/Footer';

import {connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import LoadingPage from '../../components/UI/LoadingPage/LoadingPage';


class Layout extends Component {

    state = {
        isChatActive: false,
        isLeftPanelVisible: false, //with help of this we can control the visiblity of left panel in mobile view i.e less than 580px
        isCreatePostVisible: false,
        shouldLeftPanelVisible: false,
        chatUnmount:true,
    }

    switchChatState  = (currentState) => {
        this.setState({
            isChatActive: !currentState,
        })
    }

    onHamburgerClick = (currentState) => {
        console.log("fxn called")
        this.setState({
            isLeftPanelVisible: currentState,
        })
    }

    onCreateFeedClick = (val) => {
        console.log("setting create feed")
        this.setState({
            isCreatePostVisible: val,
        })
    }


    componentWillMount(){
        if(window.innerWidth < 630) this.setState({shouldLeftPanelVisible:true}) ;
        this.props.onChangeWidth(window.innerWidth,this.props.device)
        window.addEventListener('resize', () => {
            if(window.innerWidth >= 630) this.setState({shouldLeftPanelVisible:false})
            else this.setState({shouldLeftPanelVisible:true})
            this.props.onChangeWidth(window.innerWidth, this.props.device)
        })
    }

    componentWillUnmount(){
        window.removeEventListener('resize',null);
    }

    render(){

        let classesL = [classes.Layout]
        if(this.props.theme === 'dark') classesL.push(classes.Dark)
        return (
            <div className={classesL.join(" ")}>

                {this.props.device === 'desktop' ? 
                    <Header 
                        onHamburgerClick = {() => this.onHamburgerClick(true)}
                        onCreateFeedClick = {() => this.onCreateFeedClick(true)}
                    />
                : null}

                {this.props.children}

                {this.state.shouldLeftPanelVisible ? <LeftPanel isVisible = {this.state.isLeftPanelVisible} closeLeftPanel={() => this.onHamburgerClick(false)}/> : null}

                <Modal 
                    show={this.state.isCreatePostVisible} 
                    closeModal={() => this.onCreateFeedClick(false)}
                >
                    {this.state.isCreatePostVisible ? <CreateFeed  closeModal={() => this.onCreateFeedClick(false)}  /> : null }
                </Modal>

                {this.props.device === 'mobile' ? 
                    <Footer 
                        setLeftPanel = {this.onHamburgerClick}
                        onCreateFeedClick = {this.onCreateFeedClick}
                        theme={this.props.theme}
                    /> 
                : null}
                {this.props.isPageLoading ? <LoadingPage /> : null}
            </div>
        );


    }
}


const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
        device: state.page.whichDevice,
        isPageLoading: state.page.pageLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeWidth: (width,device) => dispatch(actions.deviceWidthChage(width,device))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);