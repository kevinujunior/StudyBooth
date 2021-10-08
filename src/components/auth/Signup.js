import React, { Component } from 'react';
import classes from '../auth/css/Login-Signup.css'
export class Signup extends Component {

  render() {
    return(
     
    <div class = {classes.signupMain}>
       <section class={classes.signup}>
            <div class={classes.container}>
                <div class= {classes.signupContent}>
                    <div class={classes.signupForm}>
                        <h2 class={classes.formTitle}>Sign up</h2>
                        <form method="POST" class={classes.registerForm} id={classes.registerForm}>
                            <div class={classes.formGroup}>
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name"/>
                            </div>
                            <div class={classes.formGroup}>
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email"/>
                            </div>
                            <div class={classes.formGroup}>
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password"/>
                            </div>
                            <div class={classes.formGroup}>
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                            </div>
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


export default Signup