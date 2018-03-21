import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/ProtectedRoute';
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
