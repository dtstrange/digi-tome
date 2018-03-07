import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Email and password are submitted. ' + this.state.value);
        event.preventDefault();
      }

    render() {
        return(
            <form class="login-form" onSubmit={this.handleSubmit}>
            <h3>Digi-tome Login</h3>
                <label>
                    Email:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.value} onchange={this.handleChange} />
                </label><br />
                <input class="submit" type="submit" value="Submit" />
            </form>
            );
    }
}

export default Login;