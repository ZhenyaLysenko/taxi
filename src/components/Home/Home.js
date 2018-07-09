import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import style from './Home.css';

class Home extends Component {
    render() {
        return(
          <div>
            <div className={style.banner}>
              <div className={style.inner}>
                <h1 className={style.banner_title}><span className={style.yellow_span}>TAXI</span> Coin</h1>
                <h2 className={style.banner_sign}>Revolutionizing <span className={style.yellow_span}>taxi</span> with the blockchain</h2>
                <Link to="/ride"><button className={style.bannerBtn + " " + style.rideBtn}>RIDE</button></Link>
                <Link to="/drive"><button className={style.bannerBtn + " " + style.driveBtn}>DRIVE</button></Link>
              </div>
            </div>
            <div className={style.why}>
              <h1 className={style.why__h1}>Why this <span className={style.yellow_span}>TAXI</span> ?</h1>
              <div className={style.yellow_border}></div>
              <div className={style.flex}>
                <div className={style.why__item}>
                  <img className={style.why__img} src="../../public/Home/blockchain.jpg" alt="blockchain"/>
                  <h2 className={style.why__h2}>BLOCKCHAIN IS SECURE</h2>
                  <p className={style.why__p}>
                    The records on a blockchain are secured through cryptography.
                    Network participants have their own private keys that are assigned
                    to the transactions they make and act as a personal digital signature.
                    All trips will be recorded.
                  </p>
                </div>
                <div className={style.why__item}>
                  <img className={style.why__img} src="../../public/Home/bitcoin.jpg" alt="blockchain"/>
                  <h2 className={style.why__h2}>PAY CRYPTO</h2>
                  <p className={style.why__p}>
                    With a unique currency, fair compensation, transparent contracts and no intermediaries.
                    Taxi Coin is revolutionizing the creation and distribution of value for taxi activity.
                    The Taxi Coin Blockchain provides each user paying for the trip by our tokens.
                  </p>
                </div>
                <div className={style.why__item}>
                  <img className={style.why__img} src="../../public/Home/taxi.jpg" alt="blockchain"/>
                  <h2 className={style.why__h2}>TAXI OF THE FUTURE</h2>
                  <p className={style.why__p}>
                    Blockchain could have a similarly disruptive effect to the internet, or it could be the next Y2K.
                    It’ll be up to innovators, disruptors, and visionaries to accept, or address the “status quo” and
                    ultimately, create a better financial system for all people.
                  </p>
                </div>
              </div>
            </div>
            <div className={style.becomeDriver}>
              <div className={style.inner}>
                <h2 className={style.becomeDriver__h2}>
                  <span className={style.whiteSpan}>Drive when you want</span> <br/>
                  Make what you need
                </h2>
                <Link to="/drive"><button className={style.bannerBtn + " " + style.driveBtn}>BECOME A DRIVER</button></Link>
              </div>
            </div>
          </div>
          );
    }
}

export default Home;
