import React, { Component } from "react";
import classes from './ChatItem.css';
import Websocket from 'react-websocket';
import {connect} from 'react-redux';

class ChatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }
    componentDidMount(){
        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/chat/'
            + 'roomName'
            + '/'
        );
        
        chatSocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            var message = {text: data.message, date: data.utc_time};
	        let updated_messages = [...this.state.messages];
            updated_messages.push(message);
            this.setState({messages: updated_messages});
        };

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            document.querySelector('#chat-log').value += (data.message + '\n');
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#chat-message-submit').click();
            }
        };

        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
        };
    }
    render(){
        let chatClass = [classes.ChatItem];
        
        // if(props.theme === 'dark'){
        //     chatClass.push(classes.Dark);
        // } 
        return (
            <div className={chatClass.join(' ')}>
                {/* <div className="rajkumar">dfiushsiisdid</div> */}
                <img src="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg" alt="lull"/>
                <div className={classes.ChatPreview}>
                    <div>
                        <h4>Andrew parker</h4>
                        <p>This is a message .</p>
                    </div>

                    <div className={classes.TimeAndCount}>
                        <p>11:45</p>
                        <div>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div>                
                    <textarea id="chat-log" cols="100" rows="20"></textarea><br/>
                    <input id="chat-message-input" type="text" size="100" ></input><br/>
                    <input id="chat-message-submit" type="button" value="Send"></input>
                </div>
            </div>
        );
    }
}
export default ChatItem;

// const mapStateToProps = (state) => {
//     return {
//         theme: state.theme.theme
//     }
// }

// export default  connect(mapStateToProps)(ChatItem);