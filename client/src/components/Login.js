
import React from 'react'
import axios from 'axios'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("/api/user/login",
                   {
                       email: this.state.email,
                       password: this.state.password
                   })
             .then((resp) => {
                window.localStorage.setItem("token", resp.data.token);
                //placeholder code
                alert("You are now logged in! Nice!");
             })
             .catch((err) => {
                 console.error(err);
             })
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <h3>Digi-tome Login</h3>
                <label>
                    Email:
                    <input name="email" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input name="password" type="password" value={this.state.value} onChange={this.handleChange} />
                </label><br />
                <input className="submit" type="submit" value="Submit" />
                <button className="btn btn-primary" onClick={this.props.changeForm}>Sign Up!</button>
            </form>
        );
    }
}

export default Login;