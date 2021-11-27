import React, { Component } from 'react';
import classes from '../auth/css/Login-Signup.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth'
import { Redirect } from 'react-router';
export class Signup extends Component {
    handleSubmit = async (e) => {
        //signUp
        e.preventDefault();
        this.props.onAuth(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value)
    }  

    render() {
        let errorMessage = null;
        
        if (this.props.error){
            console.log(this.props.error)
            errorMessage = (
                <p style={{'fontSize':'13px', 'fontStyle':'italic', 'fontWeight':'bold', 'color':'crimson', }}>{this.props.error === 'This field may not be blank.' ? "Please enter all the fields." : this.props.error}</p>
            )
        }
        console.log(this.props)
        return(
        <div class = {classes.signupMain}>
            {this.props.isAuthenticated ? <Redirect to="/home"/> : null}
        <section class={classes.signup}>
                <div class={classes.container}>
                    <div class= {classes.signupContent}>
                        <div class={classes.signupForm}>
                            <h2 class={classes.formTitle}>Sign up</h2>
                            <form onSubmit={this.handleSubmit} method="POST" class={classes.registerForm} id={classes.registerForm}>
                                <div class={classes.formGroup}>
                                    <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="username" id="name" placeholder="Username"/>
                                </div>
                                <div class={classes.formGroup}>
                                    <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" id="name" placeholder="Full Name"/>
                                </div>
                                <div class={classes.formGroup}>
                                    <label for="email"><i class="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" value={this.props.location.email} placeholder="Your Email"/>
                                </div>
                                <div class={classes.formGroup}>
                                    <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="pass" id="pass" placeholder="Password"/>
                                </div>
                                <div class={classes.formGroup}>
                                    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                                </div>
                                {errorMessage}
                                <div class={classes.formGroup}>
                                    <input type="checkbox" name="remember-me" id="remember-me" class={classes.agreeTerm} />
                                <label for="remember-me" class={classes.labelAgreeTerm}><span><span></span></span>I agree all statements in  <a href="#" class={classes.termService}>Terms of service</a></label>
                                </div>
                                <div className = {[classes.formGroup, classes.formButton].join(" ")}>
                                    <input type="submit" name="signup" id={classes.signup} class={classes.formSubmit} value="Register"/>
                                </div>
                            </form>
                        </div>
                        <div class={classes.signupImage}>
                            <figure>
                            <img src ="images/signup-image.jpg" alt=""/>
                            </figure>
                            <a href="/login" class={classes.signupImageLink}>I am already member</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        )
    }
}


const mapStateToProps = (state) => {
    return{
        isAuthenticated : state.auth.token,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username,fullname,email,password1,password2) => dispatch(actions.authSignup(username,fullname, email,password1,password2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
// export default Signup