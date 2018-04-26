
import React from 'react';

class Genre extends React.Component {
    state = {
        [this.props.name]: ''
    }
    stateHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.props.onChangeHandler(event)
        
    }

    componentDidMount() {
        console.log("test", this.props)
        this.setState({
            [this.props.name]: (this.props.value) ? this.props.value : ''
        })
    }
    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>Genre: </label>
                <select value={this.state[this.props.name]} onChange={this.stateHandler} name={this.props.name}>
                    <option></option>
                    <option value="Action/Adventure">Action/Adventure</option>
                    <option value="Drama">Drama</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Satire">Satire</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                </select>
            </div>
        )
    }
}

export default Genre;