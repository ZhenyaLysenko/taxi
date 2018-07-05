import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import style from './Home.css';

class Home extends Component {
    render() {
        return(
            <div className={style.banner}>
              <div className={style.inner}>
                <h1 className={style.banner_title}><span className={style.yellow_span}>TAXI</span> Token</h1>
                <h2 className={style.banner_sign}>Revolutionizing <span className={style.yellow_span}>taxi</span> with the blockchain</h2>
                <Link to="/ride"><button className={style.bannerBtn + " " + style.rideBtn}>RIDE</button></Link>
                <Link to="/drive"><button className={style.bannerBtn + " " + style.driveBtn}>DRIVE</button></Link>
              </div>
            </div>
        );
    }
}

export default Home;
