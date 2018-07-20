import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../Header/Header';
import styleHome from '../Home/Home.css';
import style from './Ride.css';

class Ride extends Component {
    render() {
        return(
          <div>
            <Header></Header>
            <div className={style.background}>
                <div className={style.inner}>
                    <Link to="/sign-up-rider" className={style.signUpBigBtn}>
                        <div className={style.signUpBigBtnBlock}>
                            <div className={style.blockStart}>Start riding with <span className={styleHome.yellow_span}>Taxi</span>Coin</div>
                            <div className={style.blockEnd}>SIGN UP</div>
                        </div>
                    </Link>
                </div>
            </div>
          </div>
        );
    }
}

export default Ride;
