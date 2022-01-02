import React, { Component } from "react";
import classes from "./Chat.css";
import { connect } from "react-redux";
import WebSocketInstance from '../../websocket';
import MessageBox from './MessageBox';
import * as actions from '../../store/actions/index'
import SearchBox from '../../components/UI/SearchBox/SearchBox';
import LoadingBar from "../../components/UI/LoadingBar/LoadingBar";
import axios from '../../axios_base';
import { IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatPopUp from "./ChatPopUp/ChatPopUp";

import PersonalChat from "../../components/Chat/PersonalChat/Chat";

class Chat extends Component {


  state = {
    showMessageBox:false,
    messages:[],
    grpMessages:[],
    chatId:null,
    chatList: [],
    chatName: null,
    loading:false,
    showAddGroup:false,
    grpName:null,
    grpDescription:null,
    whichChat:null,
    whichList:"Personal",
    chatListLoading:true,
    userIsAdmin:false,
    grpMemberList:[],
  }


  initialiseChat = (chatId,username,whichChat) => {
    console.log(chatId,username)
    if (chatId==null) return

    WebSocketInstance.setChatId(chatId);
    WebSocketInstance.addCallbacks(
      this.setMessages.bind(this), 
      this.addMessage.bind(this), 
      this.setGroupMessages.bind(this),
      this.addGroupMessage.bind(this),
    );

    console.log(whichChat)
    if(whichChat==='Group'){
        WebSocketInstance.connect();
        this.waitForSocketConnection(() => {
          WebSocketInstance.fetchGroupMessages(
            username,
            chatId,
          );
        });
    }
    else{
        WebSocketInstance.connect();
        this.waitForSocketConnection(() => {
          WebSocketInstance.fetchMessages(
            username,
            chatId,
          );
        });
    }
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
    if(length !== 0 && this.state.messages[length-1].id === message.id) return;
    this.setState({ messages: [...this.state.messages, message]});
  }

  setMessages = (messages) => {
    console.log(messages)
    this.setState({ messages: messages.reverse()});
    this.setState({loading:false})
  }

  addGroupMessage = (message) => {
    let length = this.state.grpMessages.length;
    if(length !== 0 && this.state.grpMessages[length-1].id === message.id) return;
    this.setState({ grpMessages: [...this.state.grpMessages, message]});
  }

  setGroupMessages = (messages) => {
    console.log(messages)
    this.setState({ grpMessages: messages.reverse()});
    this.setState({loading:false})
  }

  sendMessageHandler = (e, message) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.data ? this.props.data.username : "admin",
      content: message,
      chatId : this.state.chatId,
    };
    if(this.state.whichChat==='Group') WebSocketInstance.newGroupMessage(messageObject);
    else WebSocketInstance.newChatMessage(messageObject);
  }

  

  componentDidMount(){
    this.props.onFetchUserProfile(localStorage.getItem('user'))
    this.fetchChatList("New");
    this.initialiseChat();
  }

  changeChatId = (chatId,chatName,whichChat, userIsAdmin, grpMemberList) => {

    if(this.state.chatId === chatId && this.state.whichChat === whichChat) {
      this.setShowMessageBox(true);
      return;
    };
    WebSocketInstance.disconnect();
    this.setState({
      messages:[],
      grpMessages:[],
      loading:true,
      chatId:chatId,
      chatName:chatName,
      whichChat: whichChat,
      userIsAdmin: userIsAdmin,
      grpMemberList:grpMemberList,
    })

    this.initialiseChat(chatId,this.props.data.username,whichChat);
    this.setShowMessageBox(true);
  }

  callback = (author, friend) => {
    axios.post('chat/privatechat/', {author: author, friend:friend} )
    .then(res => {
      this.fetchChatList("New")
    })
    .catch(err => console.log(err))
  }


  fetchChatList = (whichList) => {
    if((whichList !== "New" || whichList !== "Delete") && whichList === this.state.whichList) return;
    if(whichList === "New" || whichList === "Delete") whichList = this.state.whichList;

    console.log(whichList,"from fetch List")
    this.setState({chatListLoading:true})
    if(whichList === "Personal"){
      axios.get('users/userchats/')
      .then(res => {
        this.setState({chatList:res.data, chatListLoading:false})
      })
      .catch(err => console.log(err))
    }
    else{
      axios.get('users/usergroupchats/')
      .then(res => {
        this.setState({chatList:res.data, chatListLoading:false})
      })
      .catch(err => console.log(err))
    }
  }

  deleteChat = () => {
    let url=`chat/privatechat/${this.state.chatId}`;
    if(this.state.whichChat === 'Group') url = `chat/groupchat/${this.state.chatId}`;
    if(this.state.whichChat === 'Group' && !this.state.userIsAdmin) return; //if user is not admin then he/she should not be able to delete tha chat ig.
    axios.delete(url)
    .then(res => {
      WebSocketInstance.disconnect();
      this.setState({
        showMessageBox:false,
        chatId:null,
        chatName:null,
        messages:[],
        grpMessages:[]
      })
      this.fetchChatList("Delete");
    })
    .catch(err => console.log(err))
  }

  setShowMessageBox = (val) => {
    this.setState({showMessageBox:val})
  }

  createGroup = () => {
    axios.post('chat/groupchat/', {
      name:this.state.grpName,
      description:this.state.grpDescription,
    })
    .then(res => {
      this.setState({showAddGroup:false})
      this.fetchChatList("New");
    })
    .catch(err => console.log(err))
  }

  addNewUserToGroup = (userId) => {
    console.log("new user called")
    axios.post('chat/groupmember/',{
      member:userId,
      group:this.state.chatId,
      role:'M'
    })
    .then(res => {
      console.log(res)
      this.setState({grpMemberList: [...this.state.grpMemberList, res.data]})
    })
    .catch(err => console.log(err))
  }

  setChatList=(listName) => {
    console.log(listName)
    if(this.state.whichList !== listName){
      this.setState({whichList:listName})
      this.fetchChatList(listName);
    }
  }

  render() {
    let chatclasses = [classes.Chat];
    if (this.props.theme === "dark") chatclasses.push(classes.Dark);
    if (this.props.isActive) {
      chatclasses.push(classes.ActiveChat);
    }
    return (
      <div className={chatclasses.join(" ")}  
          style={{
            'marginTop':`${this.props.device === 'mobile' ? '20px' : '80px'}`,
            'height': `${this.props.device === 'mobile' ? '90vh' : '85vh'}`}
        }>
        <div className={classes.ChatList}>
          {this.state.chatListLoading ? <LoadingBar background={'linear-gradient(to right,rgb(76,217,105),rgb(90,200,250),rgb(0,132,255),rgb(52,170,220),rgb(88,86,217),rgb(255,45,83))'}/> :null}
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
          <div className={classes.SwitchChat}>
            <button onClick={() => this.setChatList("Personal")}>Personal</button>
            <button onClick={() => this.setChatList("Group")}>Group</button>
          </div>
          <div className={classes.SearchInputBox}>
            <SearchBox 
              theme={this.props.theme} 
              chatCallBack={this.callback}
              placeholder={"Search user to start chat..."}
            />
            <div>
              <IconButton 
                className={classes.AddButton} 
                onClick={() => this.setState({showPopUp:true})}
                >
                  <MoreHorizIcon />
              </IconButton>
              {this.state.showPopUp ? 
                <ChatPopUp 
                    setPopUp={(val) => this.setState({showPopUp:val})} 
                    theme={this.props.theme} 
                    where="ChatList"
                    showAddGrp={() => this.setState({showAddGroup:true})}
                /> : null}
            </div>
          </div>
          <PersonalChat 
            chatList={this.state.chatList} 
            changeChatId={this.changeChatId}
          />
        </div>
        <MessageBox 
          show={this.state.showMessageBox} 
          send={this.sendMessageHandler} 
          messages={this.state.whichChat === 'Group' ? this.state.grpMessages: this.state.messages} 
          username={this.props.data ? this.props.data.username : null}
          chatName={this.state.chatName}
          setShowMessageBox={this.setShowMessageBox}
          loading={this.state.loading}
          theme={this.props.theme}
          whichChat={this.state.whichChat}
          addNewUserToGroup={this.addNewUserToGroup}
          deleteChat={this.deleteChat}
          chatId={this.state.chatId}
          grpMemeberList={this.state.grpMemberList}
        />
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    theme: state.theme.theme,
    data: state.currentUser.data,
    device: state.page.whichDevice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserProfile : (userId) => dispatch(actions.fetchUserData(userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
