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
                    
                </div>
            </div>
          </div>
        );
    }
}

export default Drive;
