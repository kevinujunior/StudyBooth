import { Avatar,IconButton} from "@mui/material"
import{ AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material"
import React, { useState,useEffect } from "react"
import { InsertEmoticonOutlined , Mic,Send} from "@mui/icons-material"
import classes from "./chatIn.css"
// import { useState } from "react"

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
        <div className={classes.chat}>
            <div className={classes.chat_header}>
               <Avatar sec={'https://avatar.dicebear.com/api/human/${loading}.svg'} />
               
               <div className={classes.chat_headerInfo}>
                  <h3>Room name</h3>
                  <p>last seen at ...</p>
               </div>

               <div className={classes.chat_headerRight}>
                   <IconButton>
                       <SearchOutlined />  
                    </IconButton>
                    <IconButton>
                       <AttachFile />  
                    </IconButton>
                    <IconButton>
                       <MoreVert />  
                    </IconButton>

               </div> </div>
            <div className={classes.chat_body}>
              {/* <p className={`classes.chat_message ${true && 
                "chat_receiver"}`}> */}
                <p className={classes.chat_message}>
                  
              {/* <span className={classes.chat_name}>rajkumar</span> */}
              Hey Guys
               <span className={classes.chat_timestamp}>5:25pm</span>
              </p>
            </div>
           
            
            <div className={classes.chat_footer}>
              <InsertEmoticonOutlined
              style={styles.button}
              />
               <form>
                  <input value={input}
                  onChange={e =>
                  setInput(e.target.value)}
                   placeholder="Type a message"
                   type="text"/>
                  {/* <button onClick={sendMessage} 
                   type="submit">Send</button> */}
              </form>
              <Send
              style={styles.send}/>
              <Mic
              style={styles.mic}/>
            </div>
        </div>
    )
}
const styles = {
  button: {
    marginLeft : -20,
    marginRight : 10,
  },
  send: {
    marginLeft : 5,
    marginRight : 5,
  },
  mic : {
    marginRight : -20,
  }
};

export default ChatIn;