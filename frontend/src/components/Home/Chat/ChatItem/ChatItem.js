import React from "react";
import classes from './ChatItem.css';
import {connect} from 'react-redux';

const ChatItem = (props) => {
    let chatClass = [classes.ChatItem];
    if(props.theme === 'dark'){
        chatClass.push(classes.Dark);
    } 
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme
    }
}

export default  connect(mapStateToProps)(ChatItem);