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
        console.log("hi");

        // axios({
        //     url: '/api/profile/' + JSON.parse(window.atob(loginToken.split('.')[1])).id,
        //     method: 'put',
        //     headers: { "Authorization": "Bearer " + loginToken } ,
        //     data: {
        //         email: this.state.email,
        //         username: this.state.username,
        //         password: this.state.password,
        //         picFile: document.getElementById("pic-file").files[0]
        //     }
        //     })
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

    }

    render() {
        return(
            <div>
                <form id="profile-change-form" encType="multipart/form-data">
                        <label htmlFor="email">Change Email</label>
                        <input onChange={this.onChangeHandler} name="email" type="text" />
                        <label htmlFor="username">Change Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text" />
                        <label htmlFor="password">Change Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="text" />
                        <input name="userPic" onChange={this.onChangeHandler} accept=".png" id="pic-file" type="file" />
                        <input onClick={this.submitUserChange} type="submit" type="submit" value="submit" />
                    </form>
                </div>
        )
    }
}

export default ProfileChange;