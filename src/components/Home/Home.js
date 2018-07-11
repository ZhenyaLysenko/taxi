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

            <div className={style.howItWorks}>
                <h1 className={style.why__h1}>How <span className={style.yellow_span}>it</span> works ?</h1>
                <div className={style.flex}>
                    <div>
                        <h2>For riders</h2>
                    </div>
                    <div>
                        <h2>For drivers</h2>
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

            <div className={style.readMore}>
                <h1 className={style.readMore__h1}>Try more in our <span className={style.yellow_span}>app</span></h1>
                <div className={style.yellow_border}></div>
                <div className={style.flex}>
                    <div>
                        <a href="#">
                            <img className={style.getItOnImg} src="../../public/Home/get-it-on-google-play.png" alt="get-it-on-google-play"/>
                        </a>
                    </div>
                    <div>
                        <a href="#">
                            <img className={style.getItOnImg} src="../../public/Home/app-store-button.png" alt="get-it-on-google-play"/>
                        </a>
                    </div>
                </div>
                <h2 className={style.readMore__h2}>Go in<span className={style.yellow_span}> social</span></h2>
                <div className={style.flexIcons}>
                    <div className={style.socialIcon}>
                        <a href="#">
                            <img className={style.socialImg} src="../../public/Home/twitter.png" alt="twitter"/>
                        </a>
                    </div>
                    <div className={style.socialIcon}>
                        <a href="#">
                            <img className={style.socialImg} src="../../public/Home/facebook.png" alt="facebook"/>
                        </a>
                    </div>
                    <div className={style.socialIcon}>
                        <a href="#">
                            <img className={style.socialImg} src="../../public/Home/instagram.png" alt="instagram"/>
                        </a>
                    </div>
                    <div className={style.socialIcon}>
                        <a href="#">
                            <img className={style.socialImg} src="../../public/Home/linkedin.png" alt="linkedin"/>
                        </a>
                    </div>
                    <div className={style.socialIcon}>
                        <a href="#">
                            <img className={style.socialImg} src="../../public/Home/reddit.png" alt="reddit"/>
                        </a>
                    </div>
                    <div className={style.socialIcon}>
                        <a href="#">
                            <img className={style.socialImg} src="../../public/Home/telegram.png" alt="telegram"/>
                        </a>
                    </div>
                </div>
            </div>

            <div className={style.review}>
                <h1 className={style.why__h1}>Read our drivers review</h1>
                <div className={style.yellow_border}></div>
                <div className={style.slide_numberDisplayBlock}>
                    <p className={style.slider__p}>
                        "I started driving with Uber because I
                        liked the idea that my own car could
                        make me money."
                    </p>
                    <span className={style.slider__sign}>
                        <span className={style.slider__sign_name}>Brandon</span>, Coach and Chicago partner
                    </span>
                </div>
                <div className={style.slideshow}>
                  <div className={style.slide_wrapper}>
                    <div className={style.slide}>
                        <div className={style.slide_number}>
                            <p className={style.slider__p}>
                                "I started driving with Uber because I
                                liked the idea that my own car could
                                make me money."
                            </p>
                            <span className={style.slider__sign}>
                                <span className={style.slider__sign_name}>Brandon</span>, Coach and Chicago partner
                            </span>
                        </div>
                    </div>
                    <div className={style.slide}>
                        <div className={style.slide_number}>
                            <p className={style.slider__p}>
                                "I wanted something where I could
                                meet new people and get out of the house.
                                Uber has helped with both of those things, plus
                                I’m seeing new parts of the city I’ve never seen before!"
                            </p>
                            <span className={style.slider__sign}>
                                <span className={style.slider__sign_name}>Katrina</span>, Mother and Seattle partner
                            </span>
                        </div>
                    </div>
                    <div className={style.slide}>
                        <div className={style.slide_number}>
                            <p className={style.slider__p}>
                                "Uber enables me to have the creative freedom for baking
                                my cakes and also driving on the side so I can make more
                                money and also have my dream job."
                            </p>
                            <span className={style.slider__sign}>
                                <span className={style.slider__sign_name}>Jenny</span>, Business owner and Los Angeles partner
                            </span>
                        </div>
                    </div>
                    <div className={style.slide}>
                        <div className={style.slide_number}>
                            <p className={style.slider__p}>
                                "With Uber, I’m able to realize my goals. I’m able to pursue
                                my dreams. I’m able to stay focused on sharing amazing musical
                                experiences with the world."
                            </p>
                            <span className={style.slider__sign}>
                                <span className={style.slider__sign_name}>Sean</span>, Musician and LA partner
                            </span>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          );
    }
}

export default Home;
