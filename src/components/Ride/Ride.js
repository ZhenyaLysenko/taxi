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
            <div className={style.inner2}>
                <div>
                  <h1 className={styleHome.why__h1 + ' ' + style.payWithTitle}>Pay with <span className={styleHome.yellow_span}>tokens</span> for your ride</h1>
                  <h1 className={style.payWithTitle + ' ' + style.payWithTitle2}>The best way to make your ride cheaper</h1>
                  <p className={style.payWithP}>
                      With a unique currency, fair compensation, transparent contracts and no intermediaries.
                      Taxi Coin is revolutionizing the creation and distribution of value for taxi activity.
                      The Taxi Coin Blockchain provides each user paying for the trip by our tokens.
                  </p>
                </div>
            </div>
            <div className={style.rideBg}>
                <div className={style.inner2}>
                    <span className={style.signUpToRideSpan}>Go to your destination with <span className={styleHome.yellow_span}>Taxi</span>Coin</span>
                    <Link to="/sign-up-rider"><button className={style.signUpToRide}>SIGN UP TO RIDE</button></Link>
                </div>
            </div>
          </div>
        );
    }
}

export default Ride;
