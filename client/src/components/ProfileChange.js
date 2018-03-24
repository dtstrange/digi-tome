import React from 'react'
import axios from 'axios'

class ProfileChange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
<<<<<<< HEAD:client/src/components/ProfileChange.js
            password: ''
=======
            password:''
>>>>>>> 4761202514d2039d008090e85d99645b2feac32d:client/src/components/ProfileChange.js
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

        axios({
            url: '/api/profile/' + JSON.parse(window.atob(loginToken.split('.')[1])).id,
            method: 'put',
<<<<<<< HEAD:client/src/components/ProfileChange.js
            headers: { "Authorization": "Bearer " + loginToken } ,
            data: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password}
            })
=======
            headers: { "Authorization": "Bearer " + loginToken },
            data: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.passsword
            }})
>>>>>>> 4761202514d2039d008090e85d99645b2feac32d:client/src/components/ProfileChange.js
            .then((resp) => {
                console.log(JSON.parse(window.atob(loginToken.split('.')[1])).id);
                console.log(resp);
                console.log(resp.data.response);
<<<<<<< HEAD:client/src/components/ProfileChange.js
=======
                
>>>>>>> 4761202514d2039d008090e85d99645b2feac32d:client/src/components/ProfileChange.js
                

            }).catch((error) => {
                console.error(error);
            })

    }

    render() {
        return(
            <div>
<<<<<<< HEAD:client/src/components/ProfileChange.js
                <form id="profile-change-form">
                        <label htmlFor="email">Change Email</label>
                        <input onChange={this.onChangeHandler} name="email" type="text" />
                        <label htmlFor="username">Change Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text" />
                        <label htmlFor="password">Change Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="text" />
=======
                <div id="user-change-form">
                    <form>
                        <label htmlFor="email">Change Email:</label>
                        <input name="email" onChange={this.onChangeHandler} type="text" />
                        <label htmlFor="username">Change Username:</label>
                        <input name="username" onChange={this.onChangeHandler} type="text" />
                        <label htmlFor="password">Change Password</label>
                        <input name="password" onChange={this.onChangeHandler} type="text" />
>>>>>>> 4761202514d2039d008090e85d99645b2feac32d:client/src/components/ProfileChange.js
                        <input onClick={this.submitUserChange} type="submit" type="submit" value="submit" />
                    </form>
                </div>
        )
    }
}

export default ProfileChange;