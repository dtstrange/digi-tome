
import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
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
                user: this.state.user,
                password: this.state.password
            })
            .then((resp) => {
                window.localStorage.setItem("token", resp.data.token);
                window.location = '/profile';
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <h3>Digi-tome Login</h3>
                    <label>
                        Username/Email:
                    <input name="user" type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                    <input name="password" type="password" value={this.state.value} onChange={this.handleChange} />
                    </label><br />
                </div>
                <div className="row">
                    <input className="submit btn btn-default" type="submit" value="Submit" />
                    <button className="btn btn-primary" onClick={this.props.changeForm}>Sign Up!</button>
                </div>
            </form>
        );
    }
}

export default Login;