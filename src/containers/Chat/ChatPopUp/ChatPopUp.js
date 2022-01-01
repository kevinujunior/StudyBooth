import React from 'react';
import classes from './ChatPoPUp.css';
import onClickOutside from 'react-onclickoutside';

class ChatPopUp extends React.Component {

    handleClickOutside = () => {
        this.props.setPopUp(false);
    }

    close = () => {
        this.props.setPopUp(false);
    }

    render(){
        let toRender = (
            <>
                {this.props.whichChat === 'Group' ? 
                <div 
                    className={classes.ChatPopUpItem}
                    onClick={() => {
                        this.props.setShowBox("AddUser")
                        this.close();
                    }}
                    >
                        <p>Add new user</p>
                </div> 
                : null}
                {this.props.whichChat === 'Group' ? 
                <div 
                    className={classes.ChatPopUpItem}
                    onClick={() => {
                        this.props.setShowBox("MemberList")
                        this.close();
                    }}
                    >
                        <p>Member List</p>
                </div> 
                : null}
                <div className={classes.ChatPopUpItem} onClick={() => {
                        this.props.deleteChat()
                        this.close();
                    }}><p>Delete Chat</p></div>
            </>
        )

        if(this.props.where == 'ChatList'){
            toRender = (
                <>
                    <div className={classes.ChatPopUpItem} onClick={() => {this.props.showAddGrp(); this.close()}}><p>New Group</p></div>
                </>
            )
        }
        return(
            <div className={[classes.ChatPopUp, this.props.theme === 'dark' ? classes.Dark : null].join(" ")}>
                {toRender}
            </div>
        );
    }
}

export default onClickOutside(ChatPopUp);