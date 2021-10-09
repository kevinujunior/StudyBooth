import React, { Component } from 'react';
import classes from '../auth/css/Login-Signup.css'
export class Login extends Component {

  render() {
    return(
     
        <div class = {classes.loginMain}>
        <section class={classes.signin}>
        <div class={classes.container}>
            <div class={classes.signinContent}>
                <div class={classes.signinImage}>
                    <figure><img src="images/signin-image.jpg" alt="sign in image" /></figure>
                    <a href="/signup" class={classes.signupImageLink}>Create an account</a>
                </div>

                <div class={classes.signinForm}>
                    <h2 class={classes.formTitle}>Log In</h2>
                    <form method="POST" class={classes.registerForm} id={classes.signinForm}>
                        <div class={classes.formGroup}>
                            
                            <label for="your_name"><i class={classes.materialIconsName}></i></label>
                            <input type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                        </div>
                        <div class={classes.formGroup}>
                            <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                            <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                        </div>
                        <div class={classes.formGroup}>
                            <input type="checkbox" name="remember-me" id="remember-me" class={classes.agreeTerm} />
                            <label for="remember-me" class={classes.labelAgreeTerm}><span><span></span></span>Remember me</label>
                        </div>
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


export default Login