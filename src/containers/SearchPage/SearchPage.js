import React, {useState} from 'react';
import styles from './SearchPage.css';
import SearchIcon from '@mui/icons-material/Search';

import axios from '../../axios_base'
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


const SearchPage = (props) => {
    const [profilesList, setProfilesList] = useState([]);
    const [searchText, setSearchText] = useState("");

    const fetchProfile = () => {
        console.log("fxn called")
        axios.get(`users/userview/?user=${searchText}`)
        .then(res => setProfilesList(res.data))
        .catch(err => console.log(err));
    }

    let history = useHistory();

    const callBack = (userId) => {
        props.onFetchUserProfile(userId);
        history.push({   
            pathname: '/profile',
            userId: userId,
        });
    }

    return (
        <div className={styles.SearchPage}>
            <div className={styles.Input}>
                <input 
                    type="text" 
                    className={styles.inputSearch} 
                    placeholder="search profiles..."  
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                >
                </input>
                <button className={styles.btnSearch} onClick={() => fetchProfile()}>{<SearchIcon/>}</button>
            </div>
            <div className={styles.UserList}>
                {profilesList.map((user, i) => {
                    return <div key={user.id} className={styles.User} onClick={() => callBack(user.id)}>
                                <p>{user.fullName}</p>
                            </div>
                })}
            </div>
        </div>
    )
}

const mapDispathToProps = dispatch => {
    return {
        onFetchUserProfile : (userId) => dispatch(actions.fetchUserData(userId))
    }
}


export default connect(null,mapDispathToProps)(SearchPage);