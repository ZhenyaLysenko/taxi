import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../Header/Header';
import styleHome from '../Home/Home.css';
import style from './Drive.css';

class Drive extends Component {
    render() {
        return(
          <div>
            <Header></Header>
            <div className={style.background}>
                <div className={style.inner}>
                  <Link to="/sign-up-driver" className={style.signUpBigBtn}>
                      <div className={style.signUpBigBtnBlock}>
                          <div className={style.blockStart}><span className={styleHome.yellow_span}>Taxi</span>Coin needs partners like you</div>
                          <div className={style.blockEnd}>SIGN UP</div>
                      </div>
                  </Link>
                </div>
            </div>
          </div>
        );
    }
}

export default Drive;
