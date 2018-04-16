
import React from 'react';

class Genre extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <select name="genre" size="5">
            //     <option value="action-adventure">Action/Adventure</option>
            //     <option value="drama">Drama</option>
            //     <option value="fiction">Fiction</option>
            //     <option value="horror">Horror</option>                   
            //     <option value="mystery">Mystery</option>
            //     <option value="romance">Romance</option>
            //     <option value="satire">Satire</option>
            //     <option value="sci-fi">Sci-Fi</option>                    
            // </select>
            <div>
                <label htmlFor={this.props.name}>Genre: </label>
                <select value={this.props.value} onChange={this.props.onChangeHandler} name={this.props.name}>
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