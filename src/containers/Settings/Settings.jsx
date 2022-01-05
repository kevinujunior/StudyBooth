import React from 'react';
import styles from './Settings.css';

import { TextField } from '@mui/material';
import { Button } from '@mui/material';

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import imageCompression from 'browser-image-compression';
import LoadingBar from '../../components/UI/LoadingBar/LoadingBar';

import axios from '../../axios_base';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'


class Settings extends React.Component {

    state={
        image:null,
        fullName:this.props.userData.fullName !== "null" ? this.props.userData.fullName : "" ,
        email:this.props.userData.email !== "null" ? this.props.userData.email : "",
        bio:this.props.userData.userBio !== "null" ? this.props.userData.userBio : "",
        username:this.props.userData.username !== "null" ? this.props.userData.username : "",
        loading:false,
        currimg: null
    }

    compressImage = () => {

        let imageFile = null;
        this.setState({loading:true})

        if(this.state.image == null) this.updateDetails();
        else 
        {
            imageFile = this.state.image;

        // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        let component = this;
        const options = {
          maxSizeMB: 0.15,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        imageCompression(imageFile, options)
        .then(function (compressedFile) {
            // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            
            component.updateDetails(compressedFile) // write your own logic
        })
        .catch(function (error) {
            console.log(error.message);
        });
    }

    }

 

   
    
    updateDetails = (image) => {
        console.log(this.props.userData.userPic)
        var url = this.props.userData.userPic
 
    
        let res = fetch(url)
        var imgfile = new File([res],{type:'image/jpeg'});  
       
       
        console.log(imgfile)

        
    
        const userId = localStorage.getItem('user');

        const formData = new FormData();
        formData.append('fullName', this.state.fullName)
        formData.append('email', this.state.email)
        formData.append('userPic', image ? image: imgfile)
        formData.append('userBio', this.state.bio)
        formData.append('username', this.state.username)

        axios.put(`/users/userview/${userId}/`,formData)
        .then(() => {
            this.props.onPageChange('/profile',{userId}, () => {
                this.props.history.replace('/profile')
            })
        })
    }

    componentDidMount(){
        setTimeout(() => {
            console.log('loading false settings')
            this.props.onSetPageLoading();
        },1000)
    }

    componentWillUnmount(){
        if(this.props.history.action === "POP") {
            this.props.onPageChange('/home', () => {
                this.props.history.replace('/home')
            })
        }
    }

    updateForm = (e, which) => {
        switch(which){
            case "fullName":
                this.setState({fullName: e.target.value}); break;
            case "username":
                this.setState({username: e.target.value}); break;
            case "email":
                this.setState({email: e.target.value}); break;
            case "bio":
                this.setState({bio: e.target.value}); break;
            default:
                break;
        }
    }

    render(){
        // console.log(this.state.image ? URL.createObjectURL(this.state.image) : null)
        return(
            <div 
                className={[styles.Settings, this.props.theme === 'dark' ? styles.Dark : null].join(" ")}
                style={{height:`${this.props.device === 'mobile' ? 'calc(100vh - 50px)' : '100vh'}`}}
            >
                {this.state.loading ? <LoadingBar backgroundColor="#FEB12F" /> : null}
                <div className={styles.InputBox}>
                    <h2>Update Details</h2>
                    <div className={styles.ImageBox} >
                        <div style={{'backgroundColor':'cornflowerblue', padding:'12px 15px', borderRadius:'10px', marginRight:'10px', cursor:'pointer'}}>
                            <UploadButton accept="image/*" onChange={(e) => this.setState({image:e.target.files[0]})}>
                                <CameraEnhanceIcon className={styles.IconColor}/>
                            </UploadButton> 
                        </div>
                        <img src={this.state.image ? URL.createObjectURL(this.state.image) : this.props.userData.userPic ? this.props.userData.userPic : null }/>
                    </div>
                    <div className={styles.Inputs}>
                        <div className={[styles.form__group,styles.field].join(" ")}>
                            <input type="input" value={this.state.username} className={styles.form__field} placeholder="Username" name="name" id='name' required onChange={(e) => this.updateForm(e,"username")} />
                            <label for="name" className={styles.form__label}>Username</label>
                        </div>
                        <div className={[styles.form__group,styles.field].join(" ")}>
                            <input type="input" value={this.state.fullName} className={styles.form__field} placeholder="Full Name" name="name" id='name' required onChange={(e) => this.updateForm(e,"fullName")}/>
                            <label for="name" className={styles.form__label}>Full Name</label>
                        </div>
                        <div className={[styles.form__group,styles.field].join(" ")}>
                            <input type="input" value={this.state.email} className={styles.form__field} placeholder="Email" name="name" id='name' required onChange={(e) => this.updateForm(e,"email")}/>
                            <label for="name" className={styles.form__label}>Email</label>
                        </div>
                        <div className={[styles.form__group,styles.field].join(" ")}>
                            <input type="input" value={this.state.bio} className={styles.form__field} placeholder="Bio" name="name" id='name' required onChange={(e) => this.updateForm(e,"bio")}/>
                            <label for="name" className={styles.form__label}>Bio</label>
                        </div>
                        <Button variant="contained" onClick={this.compressImage}>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
        userData: state.currentUser.data,
        device: state.page.whichDevice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPageChange : (page,userId, callBack) => dispatch(actions.changePage(page,userId)).then(() => callBack()),
        onSetPageLoading: () => dispatch(actions.pageLoading(false)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));

function UploadButton  (props) {
    return (
        <div>
            <label style={{position:'relative', cursor:'pointer'}}>
                <input type="file" style={{display:'none'}} accept={props.accept} onChange={props.onChange}/>
                {props.children}
            </label>
        </div>
    );
}