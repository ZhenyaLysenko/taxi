import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import styleSignIn from '../Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import styleSignInRider from '../Sign_in_rider/Sign_in_rider.css';

class SignInDriver extends Component {
    render() {
        return(
            <div className={styleSignInRider.signInBackground}>
                <div className={styleSignInRider.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRider.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={styleSignInRider.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={styleSignInRider.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRider.signInTitle}>Sign <span className={styleHome.yellow_span}>In</span> as driver</h1>
                    <span className={styleSignInRider.inputSpan}>Enter your data</span>
                    <form>
                        <input className={styleSignInRider.signInInput} type="email" placeholder="Your email adress"/>
                        <Link to="/" className={styleSignInRider.forgotPass}><span>Forgot your password ?</span></Link>
                        <input className={styleSignInRider.signInInput} type="password" placeholder="Your password"/>
                        <input className={styleSignInRider.signInInput + ' ' + styleSignInRider.signInInputSubmit} type="submit" value="Submit"/>
                    </form>
                    <span>Don't have an account? <NavLink to="/sign-up" className={styleSignInRider.signUpSmallBtn}>Sign up</NavLink></span>
                </div>
            </div>
        );
    }
}

export default SignInDriver;
