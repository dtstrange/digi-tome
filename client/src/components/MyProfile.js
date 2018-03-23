import React from 'react'
import Profile from '../pages/Profile'
import UserIcon from '../images/user.png';

class MyProfile extends React.Component {

    render() {
        return(
            <div id="my-profile">
                <h2 id="my-profile-header">My Profile</h2>
                <h5><span>Username: </span>{this.state.username}  
                    <img alt="change-user" id="user-change" src={UserIcon} />
                </h5>
                <h6><span>Books Published: </span>{this.state.bookCount}</h6>
                <button onClick={this.props.changeProfile}>Change Info</button>
            </div>
        )
    }
}

export default MyProfile;