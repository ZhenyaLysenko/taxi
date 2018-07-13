import React, { Component } from 'react';
import {BrowserRouter, Route, NavLink, Link} from 'react-router-dom';
import style from './Header.css';

class Header extends Component {
    render() {
        return(
          <div className={style.header}>
            <div className={style.headerInner}>
                <div className={style.headerFlex}>
                    <div className={style.logo}>
                        <a href="#" className={style.headerLogo__a}>
                            <Link to="/home"><button className={style.homeBtn}>
                                <h1><span className={style.yellow_span}>Taxi</span><span className={style.toggle_span}>Coin</span></h1>
                            </button></Link>
                        </a>
                        <div className={style.rideDrive}>
                            <div className={style.rideDriveItem}>
                                <NavLink to="/ride" activeClassName={style.active} className={style.rideDriveItem__a}><button className={style.bannerBtn + " " + style.driveBtn}>
                                    Ride
                                </button></NavLink>
                            </div>
                            <div className={style.rideDriveItem}>
                                <a href="#">
                                    <NavLink to="/drive" activeClassName={style.active} className={style.rideDriveItem__a}><button className={style.bannerBtn + " " + style.driveBtn}>Drive</button></NavLink>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={style.sign_in}>
                        <div className={style.rideDriveItem + " " + style.sign_in__block}>
                            <a href="#">
                                <NavLink to="/sign-in" activeClassName={style.active} className={style.sign_in__block__a}><button className={style.bannerBtn + " " + style.driveBtn}>SIGN IN</button></NavLink>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          );
    }
}

export default Header;
