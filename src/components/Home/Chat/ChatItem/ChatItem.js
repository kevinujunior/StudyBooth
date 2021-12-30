import React, { Component } from "react";
import classes from './ChatItem.css';


class ChatItem extends Component {
    
    state = {
        friend:null,
        id:null
    }

    componentDidMount(){
        let curruserId = localStorage.getItem('user');
        let friend;
        if(this.props.data.author == null) friend = this.props.data.name;
        else friend = this.props.data.author.id ? this.props.data.friend.username : this.props.data.author.username;
        
        let id = this.props.data.id;
        this.setState({friend:friend, id:id});
    }

    render(){
        let chatClass = [classes.ChatItem];
        
        // if(props.theme === 'dark'){
        //     chatClass.push(classes.Dark);
        // } 
        return (
            <div className={chatClass.join(' ')} onClick={() => this.props.changeChatId(this.state.id,this.state.friend)}>
                {/* <div className="rajkumar">dfiushsiisdid</div> */}
                <img src="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg" alt="lull"/>
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

