import React, { Component } from "react";
import classes from "./Chat.css";
import { connect } from "react-redux";
import WebSocketInstance from '../../../websocket';
import MessageBox from './MessageBox';
import * as actions from '../../../store/actions/index'
import SearchBox from '../../../components/UI/SearchBox/SearchBox';
import axios from '../../../axios_base';
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import PersonalChat from "../../../components/Home/Chat/PersonalChat/Chat";

class Chat extends Component {


  state = {
    showMessageBox:false,
    messages:[],
    chatId:null,
    chatList: [],
    chatName: "Anonymous",
    loading:false,
    showAddGroup:false,
    grpName:null,
    grpDescription:null,
  }

  initialiseChat = (chatId,username) => {
    console.log(chatId,username)
    WebSocketInstance.setChatId(chatId);
    WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this));
    WebSocketInstance.connect();
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        username,
        chatId,
      );
    });
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


  addMessage = (message) => {
    let length = this.state.messages.length;
    if(this.state.messages[length-1].id === message.id) return;
    this.setState({ messages: [...this.state.messages, message]});
  }

  setMessages = (messages) => {
    this.setState({ messages: messages.reverse()});
    this.setState({loading:false})
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

  changeChatId = (chatId,friend) => {
    if(this.state.chatId === chatId) {
      this.setShowMessageBox(true);
      return;
    };
    WebSocketInstance.disconnect();
    this.setState({
      messages:[],
      loading:true,
      chatId:chatId,
      chatName:friend,
    })
    this.initialiseChat(chatId,this.props.data.username);
    this.setShowMessageBox(true);
  }

  callback = (author, friend) => {
    axios.post('chat/privatechat/', {author: author, friend:friend} )
    .then(res => {
      this.changeChatId(res.data.id)
      this.setState({chatName:friend})
    })
    .catch(err => console.log(err))
  }


  fetchChatList = () => {

    let list = [];
    axios.get('users/userchats/')
    .then(res => {
      list = res.data;
      axios.get('users/usergroupchats/')
      .then(res => {
        list = [...list, ...res.data]
        // console.log(list)
        this.setState({chatList:list})
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  }

  

  setShowMessageBox = (val) => {
    this.setState({showMessageBox:val})
    console.log(this.state.showMessageBox)
  }


  createGroup = () => {
    axios.post('chat/groupchat/', {
      name:this.state.grpName,
      description:this.state.grpDescription,
    })
    .then(res => console.log(res))
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
          <div 
            className={classes.AddGroup} 
            style={{'display':`${this.state.showAddGroup ? 'flex':'none'}`}}
          >
            <div className={classes.Backdrop} onClick={() => this.setState({showAddGroup:false})}></div>
            <div className={classes.AddGroupBox}>
                <h3>Add New Group</h3>
                <input placeholder="enter group name" onChange={(e) => this.setState({grpName:e.target.value})}></input>
                <input placeholder="enter group description" onChange={(e) => this.setState({grpDescription:e.target.value})}></input>
                <p className={classes.Button} onClick={this.createGroup}>Create Group ➡️</p>
            </div>
          </div>
          <div className={classes.SearchInputBox}>
            <SearchBox 
              theme={this.props.theme} 
              chatCallBack={this.callback}
            />
            <IconButton 
              className={classes.AddButton} 
              onClick={() => this.setState({showAddGroup:true})}>
                <AddCircleIcon />
            </IconButton>
          </div>
          <PersonalChat 
            chatList={this.state.chatList} 
            changeChatId={this.changeChatId}
          />
        </div>
        <MessageBox 
          show={this.state.showMessageBox} 
          send={this.sendMessageHandler} 
          messages={this.state.messages} 
          username={this.props.data ? this.props.data.username : null}
          chatName={this.state.chatName}
          setShowMessageBox={this.setShowMessageBox}
          loading={this.state.loading}
          theme={this.props.theme}
        />
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

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
