import { Avatar,IconButton} from "@mui/material-ui/core"
import{ AttachFile, MoreVert, SearchOutlined } from "@mui/material-ui/icons"
import React, { useState,useEffect } from "react"
import { InsertEmoticonIcon,MicIcon } from "@mui/material-ui/icons"
import "./chatIn.css"
import { useState } from "react"

function ChatIn() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState("")

    useEffect(() =>{
        setLoading(Math.floor(Math.random()*5000));
    },[])
    const sendMessage = (e) => {
      e.preventDefault();
      console.log("You typed >>>",input)
    };
    return(
        <div className="chat">
            <div className="chat_header">
               <Avatar sec={'https://avatar.dicebear.com/api/human/${loading}.svg'} />
               
               <div className="chat_headerInfo">
                  <h3>Room name</h3>
                  <p>last seen at ...</p>
               </div>

               <div className="chat_headerRight">
                   <IconButton>
                       <SearchOutlined />  
                    </IconButton>
                    <IconButton>
                       <AttachFile />  
                    </IconButton>
                    <IconButton>
                       <MoreVert />  
                    </IconButton>

               </div>
            <div className="chat_body">
              <p className={`chat_message ${true && 
                "chat_receiver"}`}>
              <span className="chat_name">rajkumar</span>
              Hey Guys
               <span className="chat_timestamp">5:25pm</span>
              </p>
            </div>
            
            <div className="chat_footer">
              <InsertEmoticonIcon/>
              <form>
                  <input value={input}
                  onChange={e =>
                  setInput(e.target.value)}
                   placeholder="Type a message"
                   type="text"/>
                  <button onClick={sendMessage} 
                   type="submit">Send</button>
              </form>
              <MicIcon />

            </div>
            </div>
        </div>
    )
}

export default ChatIn;