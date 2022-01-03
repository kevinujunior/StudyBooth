import React, {useState, useEffect} from 'react';
import styles from './SearchPage.css';
import SearchIcon from '@mui/icons-material/Search';

import axios from '../../axios_base'
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import LoadingBar from '../../components/UI/LoadingBar/LoadingBar';


const SearchPage = (props) => {
    const [profilesList, setProfilesList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProfile = () => {
        console.log("fxn called")
        setLoading(true)
        axios.get(`users/userview/?user=${searchText}`)
        .then(res => {
            if(res.data.length > 0) setProfilesList(res.data)
            else {
                setProfilesList([{
                    fullName:"No user found 🥱🥱"
                }])
            }
            setLoading(false)
        })
        .catch(err => console.log(err));
    }

    const history = useHistory();

    const callBack = (userId) => {
        props.onChangePage(userId, () => history.push({
            pathname: '/profile',
            userId: userId,
            shouldReplace:true, 
        }))
    }

    useEffect(() => {
        setTimeout(() => {
            props.onSetPageLoading();
        },300)

        return () => {
            if (history.action === "POP") {
                // props.history.replace('/home')
                props.onChangePage('/home', () => {
                    props.history.replace('/home')
                })
            }
        }

    },[history])

    return (
        <div className={styles.SearchPage}>
            {loading ? <LoadingBar backgroundColor="#4FC4F6"/> : null}
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
        onChangePage : (userId, callBack) => dispatch(actions.changePage('/profile', {userId:userId})).then(() => callBack()),
        onSetPageLoading: () => dispatch(actions.pageLoading(false)),
    }
}


export default connect(null,mapDispathToProps)(SearchPage);