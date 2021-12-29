import React ,{useState} from 'react';
import classes from './SearchBox.css';
import axios from '../../../axios_base';
import { Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const SearchBox = (props) => {

    const [searchInput, setSearchInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [userList, setUserList] = useState(null);

    console.log(props)

    const fetchSearch = () => {
        let users = null;

        axios.get(`users/userview/?user=${searchInput}`)
        .then(response =>{
            const search = response.data   
            console.log(response.data)
            var number_of_users = Object.keys(search).length;


            let curruserId = localStorage.getItem('user');

            if(number_of_users === 0) {
                users = <li><p>No user found :-( </p></li>
            }
            else{
                users = [...Array(number_of_users)].map((x, i) => {
                    return  <li key={i} value={search[i]["username"]} onClick={() => props.callBack(curruserId, search[i].id)}>
                        <Avatar alt={search[i]["username"]} src={search[i]["userPic"]} />
                        <p className={classes.searchDropdownMenu__fullname}>{search[i]["fullName"]}</p>
                        <p className={classes.searchDropdownMenu__username}>@{search[i]["username"]}</p>
                    </li> 
                })
            } 
            setUserList(users)
            setShowDropdown(true)
        })
        .catch(err => {
            console.log(err)
            setShowDropdown(false)
        })
        
    } 


    let dropdownMenu = showDropdown ? (<div className={classes.searchDropdown} tabIndex={0} onBlur={() => setShowDropdown(false)}>
        <ul className={classes.searchDropdownMenu} aria-label="submenu">
            {userList}
        </ul>
    </div>) : null;

    console.log(showDropdown,dropdownMenu)

    const triggerSearch = () => {
        fetchSearch();
    }

    let classess = [classes.Input];
    if(props.theme === 'dark') classess.push(classes.Dark);

    return (
        <div className={classess.join(" ")} >
            <input 
                type="text" 
                className={classes.inputSearch}     
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        triggerSearch()
                    }
                }}
                placeholder="Type to Search...">
            </input>
            <button className={classes.btnSearch} onClick={triggerSearch}>{<SearchIcon/>}</button>
            {dropdownMenu}
        </div>
    );
}


export default SearchBox;