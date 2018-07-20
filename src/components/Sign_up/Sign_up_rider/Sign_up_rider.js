import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import styleSignInRide from '../../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleSignIn from '../../Sign_in/Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import style from './Sign_up_rider.css';

class SignUpRider extends Component {
    render() {
        return(
            <div>
            <div className={styleSignInRide.signInBackground}>
              <div className={styleSignInRide.orangeBackground + ' ' + style.orangeBackground}></div>
                  <div className={styleHeader.logo}>
                      <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRide.signInLogo}><button className={styleHeader.homeBtn}>
                          <h1 className={styleSignInRide.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                      </button></Link>
                  </div>
                  <div className={styleSignInRide.signInInner}>
                      <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRide.signInTitle}>Sign <span className={styleHome.yellow_span}>Up</span> as rider</h1>
                      <form>
                          <div className={style.flexInput + ' ' + style.marginBot}>
                            <div className={style.width50}>
                                <span className={styleSignInRide.inputSpan}>First name (required)</span>
                                <input className={styleSignInRide.signInInput} type="text" name="firstname" placeholder="First name"/>
                            </div>
                            <div className={style.width50}>
                                <span className={styleSignInRide.inputSpan}>Last name (required)</span>
                                <input className={styleSignInRide.signInInput} type="text" name="lastname" placeholder="Last name"/>
                            </div>
                          </div>
                          <div className={style.marginBot}>
                            <span className={styleSignInRide.inputSpan}>Enter your phone number (required)</span>
                            <input className={styleSignInRide.signInInput} type="phone" placeholder="Phone number"/>
                          </div>
                          <div className={style.marginBot}>
                            <span className={styleSignInRide.inputSpan}>Enter your email (required)</span>
                            <input className={styleSignInRide.signInInput} type="email" placeholder="Email adress"/>
                          </div>
                          <div className={style.marginBot}>
                            <span className={styleSignInRide.inputSpan}>Enter a password (required)</span>
                            <input className={styleSignInRide.signInInput} type="password" placeholder="Password"/>
                          </div>
                          <input className={styleSignInRide.signInInput + ' ' + styleSignInRide.signInInputSubmit} type="submit" value="Sign Up"/>
                          <p className={style.policy}>
                            By clicking "Sign Up", you agree to Taxicoin <Link to="/">Terms of Use</Link> and acknowledge
                            you have read the <Link to="/#">Privacy Policy</Link>
                          </p>
                      </form>
                  </div>
              </div>
            </div>
        );
    }
}

export default SignUpRider;
