import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../Header/Header';

class Drive extends Component {
    render() {
        return(
          <div>
            <Header></Header>
            <h2>DRIVE</h2>
          </div>
        );
    }
}

export default Drive;
