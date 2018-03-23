import React from 'react';
import SignIn from './SignIn'
import LoggedIn from './LoggedIn'
import Searchbar from './Searchbar'
import Logo from '../../images/digi-tome.jpg'

console.log(SignIn, LoggedIn);

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar">Test</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div>
                                <a className="navbar-brand" href="/">Digi-tome</a>
                                <img id="logo" src={Logo} />
                            </div>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {(window.localStorage.getItem("token") !== null)? <Searchbar /> : "" }
<<<<<<< HEAD
                            <ul className="nav navbar-nav navbar-right">
=======
                            <ul className="nav navbar-nav navbar-right">                                
>>>>>>> c1e5ac34e5af0ea903ec50dce39e073cf423b739
                                { (window.localStorage.getItem("token") !== null) ? <LoggedIn /> : <SignIn />}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;