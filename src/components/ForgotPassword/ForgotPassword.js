import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import styleSignIn from '../Sign_in/Sign_in.css';
import styleSignInRider from '../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleHome from '../Home/Home.css';
import styleHeader from '../Header/Header.css';
import style from './ForgotPassword.css';

class ForgotPassword extends Component {
    render() {
        return(
            <div className={styleSignInRider.signInBackground}>
                <div className={styleSignInRider.orangeBackground + ' ' + style.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRider.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={styleSignInRider.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={styleSignInRider.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRider.signInTitle}>Forgot <span className={styleHome.yellow_span}>your</span> password</h1>
                    <span>We will send you an email with instructions on how to reset your password</span>
                    <form>
                        <input className={styleSignInRider.signInInput} type="email" placeholder="Your email adress"/>
                        <input className={styleSignInRider.signInInput + ' ' + styleSignInRider.signInInputSubmit} type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
