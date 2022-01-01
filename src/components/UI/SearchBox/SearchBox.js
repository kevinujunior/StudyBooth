import React ,{ Component} from 'react';
import classes from './SearchBox.css';
import axios from '../../../axios_base';
import { Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import onClickOutside from 'react-onclickoutside';

class SearchBox extends Component {


    state={
        searchInput:"",
        showDropdown: false,
        userList:null,
    }

    handleClickOutside = () => {
        this.setState({showDropdown:false})
    }
    
    fetchSearch = () => {
        let users = null;

        axios.get(`users/userview/?user=${this.state.searchInput}`)
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
                    return  <li key={i} value={search[i]["username"]} 
                                onClick={() => {
                                    if(this.props.chatCallBack) this.props.chatCallBack(curruserId, search[i].id);
                                    if(this.props.headerCallBack) this.props.headerCallBack(search[i].id);
                                    if(this.props.addUserCallBack) this.props.addUserCallBack(search[i].id)
                                }}
                        >
                        <Avatar alt={search[i]["username"]} src={search[i]["userPic"]} />
                        <p className={classes.searchDropdownMenu__fullname}>{search[i]["fullName"]}</p>
                        <p className={classes.searchDropdownMenu__username}>@{search[i]["username"]}</p>
                    </li> 
                })
            } 
            this.setState({
                showDropdown:true,
                userList: users,
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({showDropdown:false})
        })
        
    } 

    triggerSearch = () => {
        this.fetchSearch();
    }


    render(){
        let dropdownMenu = this.state.showDropdown ? (<div className={classes.searchDropdown} >
            <ul className={classes.searchDropdownMenu} aria-label="submenu">
                {this.state.userList}
            </ul>
        </div>) : null;
        

        let classess = [classes.Input];
        if(this.props.theme === 'dark') classess.push(classes.Dark);

        return (
            <div className={classess.join(" ")} >
                <input 
                    type="text" 
                    className={classes.inputSearch}     
                    value={this.state.searchInput}
                    onChange={e => this.setState({searchInput: e.target.value})}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.triggerSearch()
                        }
                    }}
                    placeholder={this.props.placeholder}>
                </input>
                <button className={classes.btnSearch} onClick={this.triggerSearch}>{<SearchIcon/>}</button>
                {dropdownMenu}
            </div>
        );
    }
}


export default onClickOutside(SearchBox);