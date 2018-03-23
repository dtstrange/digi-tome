import React from 'react'
import axios from 'axios'

class UserChange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
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
            headers: { "Authorization": "Bearer " + loginToken } ,
            data: {username: this.state.user}})
            .then((resp) => {
                console.log("hey");
                console.log(resp);
                console.log(resp.data.response);
                this.setState({
                    books: resp.data.PublishedBooks
                })
                

            }).catch((error) => {
                console.error(error);
            })

    }

    render() {
        return(
            <div>
                <div id="user-change-form">
                    <form>
                        <h3>Change Username</h3>
                        <input onChange={this.onChangeHandler} type="text" />
                        <input onClick={this.submitUserChange} type="submit" type="submit" value="submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default UserChange;