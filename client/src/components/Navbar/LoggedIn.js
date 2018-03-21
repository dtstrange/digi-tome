import React from 'react'

class LoggedIn extends React.Component {
    render() {
        return (
            <li className="dropdown">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Profile<span className="caret"></span></a>
                <ul className="dropdown-menu">
                    <li><a href="/profile">My Profile</a></li>
                    <li><a href="/upload">Upload Book...</a></li>
                </ul>
            </li>
        );
    }
}

export default LoggedIn;