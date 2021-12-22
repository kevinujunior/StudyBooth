import React, { Component } from "react";
import classes from "./Chat.css";
import { connect } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import WebSocketInstance from '../../../websocket';
import MessageBox from './MessageBox';
import onClickOutside from 'react-onclickoutside'

import PersonalChat from "../../../components/Home/Chat/PersonalChat/Chat";

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMessageBox:true,
      messages:[],
    }

    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
      WebSocketInstance.fetchMessages(this.props.currentUser);
    });
  }


  waitForSocketConnection(callback) {
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
    };
    WebSocketInstance.newChatMessage(messageObject);
  }

  
  componentWillUnmount(){
    
  }

  render() {
    let chatclasses = [classes.Chat];
    if (this.props.theme === "dark") chatclasses.push(classes.Dark);
    if (this.props.isActive) {
      chatclasses.push(classes.ActiveChat);
    }
    return (
      <div className={chatclasses.join(" ")}>
        <div className={classes.Header}>
          <div className={classes.Switch}>
            <button className={classes.ActiveButton}>Chat</button>
            <button>Classes</button>
          </div>
          <div className={classes.Option}>
            <IconButton>
              <SearchIcon className={classes.IconColor} />
            </IconButton>
            <IconButton>
              <MoreVertIcon className={classes.IconColor} />
            </IconButton>
          </div>
        </div>
        <PersonalChat />
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

export default connect(mapStateToProps)(onClickOutside(Chat));
