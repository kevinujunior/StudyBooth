import React from 'react';
import classes from './ChatPoPUp.css';
import onClickOutside from 'react-onclickoutside';

class ChatPopUp extends React.Component {

    handleClickOutside = () => {
        this.props.setPopUp(false);
    }

    render(){
        return(
            <div className={[classes.ChatPopUp, this.props.theme === 'dark' ? classes.Dark : null].join(" ")}>
                <div className={classes.ChatPopUpItem}><p>Add new user</p></div>
                <div className={classes.ChatPopUpItem}><p>Delete Chat</p></div>
            </div>
        );
    }
}

export default onClickOutside(ChatPopUp);