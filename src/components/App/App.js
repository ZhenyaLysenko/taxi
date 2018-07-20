import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Ride from '../Ride/Ride';
import Drive from '../Drive/Drive';
import SignIn from '../Sign_in/Sign_in';
import SignInRider from '../Sign_in/Sign_in_rider/Sign_in_rider';
import SignInDriver from '../Sign_in/Sign_in_driver/Sign_in_driver';
import SignUpRider from '../Sign_up/Sign_up_rider/Sign_up_rider';

class App extends Component {
  render() {
    return (<BrowserRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/home" component={Home} />
        <Route path="/ride" component={Ride} />
        <Route path="/drive" component={Drive} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-in-rider" component={SignInRider} />
        <Route path="/sign-in-driver" component={SignInDriver} />
        <Route path="/sign-up-rider" component={SignUpRider} />
      </div>
    </BrowserRouter>);
  }
}

export default App;
