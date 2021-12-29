import React, { Component } from "react";
import classes from "./Chat.css";
import { connect } from "react-redux";
import WebSocketInstance from '../../../websocket';
import MessageBox from './MessageBox';
import onClickOutside from 'react-onclickoutside'
import * as actions from '../../../store/actions/index'
import SearchBox from '../../../components/UI/SearchBox/SearchBox';
import axios from '../../../axios_base';

import PersonalChat from "../../../components/Home/Chat/PersonalChat/Chat";

class Chat extends Component {


  state = {
    showMessageBox:true,
    messages:[],
    chatId:null,
    chatList: [],
  }

  initialiseChat = (chatId,username) => {
    console.log(chatId,username)
    WebSocketInstance.setChatId(chatId);
    console.log(this)
    WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        username,
        chatId,
      );
    });
    WebSocketInstance.connect();
  }


  waitForSocketConnection = (callback) => {
    const component = this;
    setTimeout(
        function () {
        if (WebSocketInstance.state() === 1) {
            console.log("Connection is made")
            callback();
            return;
        } else {
            console.log("wait for connection...")
            component.waitForSocketConnection(callback);
        }
    }, 100);
  }

  handleClickOutside = () => {
    this.props.close && this.props.close();
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message]});
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse()});
  }


  sendMessageHandler = (e, message) => {
    e.preventDefault();
    const messageObject = {
        from: this.props.data ? this.props.data.username : "admin",
        content: message,
        chatId : this.state.chatId,
    };
    WebSocketInstance.newChatMessage(messageObject);
  }

  componentDidMount(){
    this.props.onFetchUserProfile(localStorage.getItem('user'))
    this.fetchChatList();
    this.initialiseChat();
  }

  changeChatId = (chatId) => {
    console.log("chat id change", chatId)
    this.setState({
      chatId:chatId
    })
    WebSocketInstance.disconnect();
    this.initialiseChat(chatId,this.props.data.username);
  }

  callback = (author, friend) => {
    axios.post('chat/privatechat/', {author: author, friend:friend} )
    .then(res => {
      this.changeChatId(res.data.id)
    })
    .catch(err => console.log(err))
  }


  fetchChatList = () => {
    axios.get('users/userchats/')
    .then(res => {
      this.setState({
        chatList: res.data
      })
      this.chatIdChanged();
    })
    .catch(err => console.log(err))
  }


  render() {
    let chatclasses = [classes.Chat];
    if (this.props.theme === "dark") chatclasses.push(classes.Dark);
    if (this.props.isActive) {
      chatclasses.push(classes.ActiveChat);
    }
    return (
      <div className={chatclasses.join(" ")}>
        <div className={classes.ChatList}>
          <div className={classes.SearchInputBox}>
            <SearchBox theme={this.props.theme} callBack={this.callback}/>
          </div>
          <PersonalChat chatList={this.state.chatList} changeChatId={this.changeChatId}/>
        </div>
        <MessageBox show={this.state.showMessageBox} send={this.sendMessageHandler} messages={this.state.messages} username={this.props.data ? this.props.data.username : null}/>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    theme: state.theme.theme,
    data: state.currentUser.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserProfile : (userId) => dispatch(actions.fetchUserData(userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(onClickOutside(Chat));
