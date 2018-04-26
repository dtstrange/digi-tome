import React from 'react'
import axios from 'axios'

class ProfileChange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitUserChange = (event) => {
        event.preventDefault();
        const loginToken = window.localStorage.getItem("token");
        let updatePath = "/api/profile/" + JSON.parse(window.atob(loginToken.split('.')[1])).id + "?";
        let data = new FormData()
        if (this.state.email !== "") {
            updatePath += "&email=" + this.state.email
        }
        if (this.state.username !== "") {
            updatePath += "&username=" + this.state.username
        }
        if (this.state.password !== "") {
            updatePath += "&password=" + this.state.password
        }
        if (document.getElementById("pic-file").files[0]) {
            data.append("picFile", document.getElementById("pic-file").files[0])
        }
        axios.put(updatePath, data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(JSON.parse(window.atob(loginToken.split('.')[1])).id);
                console.log(resp);
                console.log(resp.data.response);


            }).catch((error) => {
                console.error(error);
            })
        window.location = '/profile';
    }

    render() {
        return (
            <div>
                <form style={{"display": "flex","flex-direction": "column", "justify-content": "center", "align=items": "center"}} id="profile-change-form" encType="multipart/form-data">
                    <label htmlFor="email">Change Email</label>
                    <input onChange={this.onChangeHandler} name="email" type="text" />
                    <label htmlFor="username">Change Username</label>
                    <input onChange={this.onChangeHandler} name="username" type="text" />
                    <label htmlFor="password">Change Password</label>
                    <input onChange={this.onChangeHandler} name="password" type="text" />
                    <label htmlFor="userPic">Change Profile Picture</label>
                    <input onChange={this.onChangeHandler} name="userPic" accept=".png" id="pic-file" type="file" />
                    <input className="btn btn-default" onClick={this.submitUserChange} type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default ProfileChange;