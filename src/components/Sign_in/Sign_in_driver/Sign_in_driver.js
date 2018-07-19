import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import styleSignIn from '../Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import style from './Sign_in_driver.css';

class SignInDriver extends Component {
    render() {
        return(
            <div className={style.signInBackground}>
                <div className={style.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + style.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={style.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={style.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + style.signInTitle}>Sign <span className={styleHome.yellow_span}>In</span> as driver</h1>
                    <span>Enter your email adress</span>
                    <form>
                        <input className={style.signInInput} type="email" placeholder="Your email adress"/>
                        <input className={style.signInInput + ' ' + style.signInInputSubmit} type="submit" value="Submit"/>
                    </form>
                    <span>Don't have an account? <NavLink to="/sign-up" className={style.signUpSmallBtn}>Sign up</NavLink></span>
                </div>
            </div>
        );
    }
}

export default SignInDriver;
