class WebSocketService {
  static instance = null;
  callbacks = {};
  chatId = null;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  setChatId(chatId){
    this.chatId= chatId;
  }

  connect() {
    const path = `wss://studybooth-backend.onrender.com/ws/chat/${this.chatId}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketNewMessage(JSON.stringify({
      command: 'fetch_messages'
    }));
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_message') {
      this.callbacks[command](parsedData.message);
    }
    if (command === 'group_messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_group_message') {
      this.callbacks[command](parsedData.message);
    }
  }


  fetchMessages(username,chatId) {
    this.sendMessage({ command: 'fetch_messages', username: username, chatId: chatId});
  }

  newChatMessage(message) {
    this.sendMessage({ command: 'new_message', from: message.from, message: message.content, chatId :message.chatId }); 
  }

  fetchGroupMessages(username,chatId) {
    this.sendMessage({ command: 'fetch_group_messages', username: username, chatId: chatId});
  }

  newGroupMessage(message) {
    this.sendMessage({ command: 'new_group_message', from: message.from, message: message.content, chatId :message.chatId }); 
  }

  addCallbacks(messagesCallback, newMessageCallback, groupMessageCallback, newGroupMessageCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
    this.callbacks['group_messages'] = groupMessageCallback;
    this.callbacks['new_group_message'] = newGroupMessageCallback;
  }
  
  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }  
  }

  state() {
    return this.socketRef.readyState;
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;