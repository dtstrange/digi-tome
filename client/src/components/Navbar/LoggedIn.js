import React from 'react'

class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ "padding-top": "7.5px" }}>
                {/* <ul className="dropdown-menu">
                    <li><a href="/profile">My Profile</a></li>
                    <li><a href="/upload">Upload Book...</a></li>
                </ul> */}
                {/* <div onClick={this.search} class="btn btn-default"><span class="glyphicon glyphicon-search"></span></div>
                <div onClick={this.upload} class="btn btn-default"><span class="glyphicon glyphicon-upload"></span></div>
                <div onClick={this.user} class="btn btn-default"><span class="glyphicon glyphicon-user"></span></div> */}

                <div className="btn-group" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <a href="/search" onClick={this.search} type="button" className="btn btn-default"><span class="glyphicon glyphicon-search"></span></a>
                    </div>
                    <div className="btn-group" role="group">
                        <a  href="/upload" onClick={this.upload}type="button" className="btn btn-default"><span class="glyphicon glyphicon-upload"></span></a>
                    </div>
                    <div className="btn-group" role="group">
                        <a  href="/profile" onClick={this.profile} type="button" className="btn btn-default"><span class="glyphicon glyphicon-user"></span></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoggedIn;