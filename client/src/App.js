import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/ProtectedRoute';
import Particles from 'react-particles-js';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Book from './pages/Book';


import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Particles canvasClassName="particles" 
          params={
            {"particles":{"number":{"value":6,"density":{"enable":true,"value_area":800}},
            "color":{"value":"#1b1e34"},"shape":{"type":"polygon","stroke":{"width":0,"color":"#000"},"polygon":{"nb_sides":6},
            "image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.07,"random":true,
            "anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":160,"random":false,"anim":{"enable":true,"speed":10,"size_min":40,"sync":false}},
            "line_linked":{"enable":false,"distance":200,"color":"#ffffff","opacity":1,"width":2},"move":{"enable":true,"speed":8,"direction":"none","random":false,
            "straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},
            "interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},
            "resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},
            "repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},
            "retina_detect":true}
          } />
          <Navbar />
             
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/:username" component={Profile} />
            <PrivateRoute exact path="/upload" component={Upload} />
            <PrivateRoute exact path="/book/:id" component={Book} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
