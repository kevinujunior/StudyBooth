import React, { Component } from 'react';
import classes from '../auth/css/Login-Signup.css'
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import * as actions from '../../store/actions/auth'
export class Login extends Component {
    handleSubmit = (e) => {
        //signin
        e.preventDefault();
        this.props.onAuth(e.target[0].value,e.target[1].value)
    }

    render() {
        let errorMessage = null;
        console.log(this.props.error)
        if (this.props.error){
            errorMessage = (
                <p style={{'fontSize':'13px', 'fontStyle':'italic', 'fontWeight':'bold', 'color':'crimson', }}>{this.props.error === 'This field may not be blank.' ? "Please enter all the fields." : this.props.error}</p>
            )
        }
        return(  
            <div class = {classes.loginMain}>
                {this.props.isAuthenticated ? <Redirect to="/home"/> : null}
                <section class={classes.signin}>
                <div class={classes.container}>
                    <div class={classes.signinContent}>
                        <div class={classes.signinImage}>
                            <figure><img src="images/signin-image.jpg" alt="sign in image" /></figure>
                            <a href="/signup" class={classes.signupImageLink}>Create an account</a>
                        </div>

                        <div class={classes.signinForm}>
                            <h2 class={classes.formTitle}>Log In</h2>
                            <form onSubmit={this.handleSubmit} method="POST" class={classes.registerForm} id={classes.signinForm}>
                                <div class={classes.formGroup}>
                                    
                                    <label for="your_name"><i class={classes.materialIconsName}></i></label>
                                    <input type="text" name="your_name" id="your_name" placeholder="Username"/>
                                </div>
                                <div class={classes.formGroup}>
                                    <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                                </div>
                                <div class={classes.formGroup}>
                                    <input type="checkbox" name="remember-me" id="remember-me" class={classes.agreeTerm} />
                                    <label for="remember-me" class={classes.labelAgreeTerm}><span><span></span></span>Remember me</label>
                                </div>
                                {errorMessage}
                                <div className = {[classes.formGroup, classes.formButton].join(" ")}>
                                    <input type="submit" name="signin" id={classes.signin} class={classes.formSubmit} value="Log in"/>
                                </div>
                            </form>
                            <div class={classes.socialLogin}>
                                    <span class={classes.socialLabel}>Or login with</span>
                                    <ul class={classes.socials}>
                                        <li><a href="#"><i className = {[classes.displayFlexCenter, classes.zmdiFacebook, classes.zmdi].join(" ")}></i></a></li>
                                        <li><a href="#"><i className = {[classes.displayFlexCenter, classes.zmdiTwitter, classes.zmdi].join(" ")}></i></a></li>
                                        <li><a href="#"><i className = {[classes.displayFlexCenter, classes.zmdiGoogle, classes.zmdi].join(" ")}></i></a></li>
                                    </ul>
                                </div>
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
        isAuthenticated: state.auth.token && localStorage.getItem('user') != null,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));