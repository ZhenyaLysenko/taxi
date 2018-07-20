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
                        <Link to="/home" className={style.headerLogo__a}><button className={style.homeBtn}>
                            <h1><span className={style.yellow_span}>Taxi</span><span className={style.toggle_span}>Coin</span></h1>
                        </button></Link>
                        <div className={style.rideDrive}>
                            <div className={style.rideDriveItem}>
                                <NavLink to="/ride" activeClassName={style.active} className={style.rideDriveItem__a}><button className={style.bannerBtn + " " + style.driveBtn}>Ride</button></NavLink>
                            </div>
                            <div className={style.rideDriveItem}>
                                <NavLink to="/drive" activeClassName={style.active} className={style.rideDriveItem__a}><button className={style.bannerBtn + " " + style.driveBtn}>Drive</button></NavLink>
                            </div>
                        </div>
                    </div>
                    <div className={style.sign_in}>
                        <div className={style.rideDriveItem + " " + style.sign_in__block}>
                            <NavLink to="/sign-in" activeClassName={style.active} className={style.sign_in__block__a}><button className={style.bannerBtn + " " + style.driveBtn}>SIGN IN</button></NavLink>
                        </div>
                        <div className={style.rideDriveItem}>
                            <NavLink to="/sign_up_driver"><button className={style.bannerBtn + " " + style.becomeDriverBtn}>BECOME A DRIVER</button></NavLink>
                        </div>
                          <div id="menuToggle">
                            <input type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>
                            <ul id="menu">
                              <NavLink to="/sign-in"><li>SIGN IN</li></NavLink>
                              <NavLink to="/ride"><li>RIDE</li></NavLink>
                              <NavLink to="/drive"><li>DRIVE</li></NavLink>
                              <h2 id="readMore__h2">Go in <span id="yellow_span">social</span></h2>
                              <div id="flexIcons">
                                  <div id="socialIcon">
                                      <a href="#">
                                          <img id="socialImg" src="../../public/Home/twitter.png" alt="twitter"/>
                                      </a>
                                  </div>
                                  <div id="socialIcon">
                                      <a href="#">
                                          <img id="socialImg" src="../../public/Home/facebook.png" alt="facebook"/>
                                      </a>
                                  </div>
                                  <div id="socialIcon">
                                      <a href="#">
                                          <img id="socialImg" src="../../public/Home/instagram.png" alt="instagram"/>
                                      </a>
                                  </div>
                                  <div id="socialIcon">
                                      <a href="#">
                                          <img id="socialImg" src="../../public/Home/linkedin.png" alt="linkedin"/>
                                      </a>
                                  </div>
                                  <div id="socialIcon">
                                      <a href="#">
                                          <img id="socialImg" src="../../public/Home/reddit.png" alt="reddit"/>
                                      </a>
                                  </div>
                                  <div id="socialIcon">
                                      <a href="#">
                                          <img id="socialImg" src="../../public/Home/telegram.png" alt="telegram"/>
                                      </a>
                                  </div>
                              </div>
                            </ul>
                          </div>
                    </div>
                </div>
            </div>
          </div>
          );
    }
}

export default Header;
