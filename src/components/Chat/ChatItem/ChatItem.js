import React, { Component } from "react";
import classes from './ChatItem.css';


class ChatItem extends Component {
    
    state = {
        friend:null,
        id:null,
        whichChat:null,
        userIsAdmin:false,
        grpMemberList:[],
        image:null,
    }


    componentWillMount(){

        let curruserId = localStorage.getItem('user');
        let friend,whichChat,userIsAdmin, memberList, image=null;

        console.log(this.props.data)

        if(this.props.data.author == null){
            friend = this.props.data.name;
            whichChat = 'Group';
            if(this.props.data.member[0].member == curruserId) userIsAdmin = true;
            memberList = this.props.data.member;
            console.log(memberList)
        } 
        else {
            friend = curruserId == this.props.data.author.id ? this.props.data.friend.username : this.props.data.author.username;
            image = curruserId == this.props.data.author.id ? this.props.data.friend.userPic : this.props.data.author.userPic;
            whichChat = 'User';
        }
        
        this.setState({
            friend:friend, 
            id:this.props.data.id, 
            whichChat: whichChat, 
            userIsAdmin: userIsAdmin,
            grpMemberList: memberList,
            image:image,
        });
    }

    render(){
        let chatClass = [classes.ChatItem];
        
        // if(props.theme === 'dark'){
        //     chatClass.push(classes.Dark);
        // } 
        return (
            <div 
                className={chatClass.join(' ')} 
                onClick={() => this.props.changeChatId(
                                this.state.id,
                                this.state.friend, 
                                this.state.whichChat, 
                                this.state.userIsAdmin,
                                this.state.grpMemberList,
                            )}>
                <img src={this.state.image ? this.state.image : "/images/male_emoji.png"} alt="lull"/>
                <div className={classes.ChatPreview}>
                    <div>
                        <h4>{this.state.friend}</h4>
                        <p>This is a message .</p>
                    </div>

                    <div className={classes.TimeAndCount}>
                        <p>11:45</p>
                        <div>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                {/* <div>                
                    <textarea id="chat-log" cols="100" rows="20"></textarea><br/>
                    <input id="chat-message-input" type="text" size="100" ></input><br/>
                    <input id="chat-message-submit" type="button" value="Send"></input>
                </div> */}
            </div>
        );
    }
}
export default ChatItem;

