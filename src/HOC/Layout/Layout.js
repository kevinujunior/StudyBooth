import React, {Component} from 'react';
import classes from './Layout.css';
import Header from '../../components/Home/Header/Header';
import Modal from '../../components/UI/Modal/Modal';
import CreateFeed from '../../components/Home/MainSection/CreatePost/CreatePost';
import LeftPanel from '../../containers/Home/LeftPanel/LeftPanel'

import {connect } from 'react-redux';
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
        this.setState({
            isLeftPanelVisible: !currentState,
        })
    }

    onCreateFeedClick = (currentState) => {
        this.setState({
            isCreatePostVisible: !currentState,
        })
    }


    componentWillMount(){
        if(window.innerWidth < 630) this.setState({shouldLeftPanelVisible:true}) ;
        window.addEventListener('resize', () => {
            if(window.innerWidth >= 630) this.setState({shouldLeftPanelVisible:false})
            else this.setState({shouldLeftPanelVisible:true})
        })

        console.log(this.state)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',null);
    }

    render(){

        let classesL = [classes.Layout]
        if(this.props.theme == 'dark') classesL.push(classes.Dark)
        return (
            <div className={classesL.join(" ")}>
                <Header 
                    onHamburgerClick = {() => this.onHamburgerClick(this.state.isLeftPanelVisible)}
                    onCreateFeedClick = {() => this.onCreateFeedClick(this.state.isCreatePostVisible)}
                />

                {this.props.children}

                {this.state.shouldLeftPanelVisible ? <LeftPanel isVisible = {this.state.isLeftPanelVisible} closeLeftPanel={() => this.onHamburgerClick(this.state.isLeftPanelVisible)}/> : null}

                <Modal show={this.state.isCreatePostVisible} closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}>
                    {this.state.isCreatePostVisible ? <CreateFeed  closeModal={() => this.onCreateFeedClick(this.state.isCreatePostVisible)}  /> : null }
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(Layout);