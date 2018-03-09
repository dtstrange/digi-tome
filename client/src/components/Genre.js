
import React from 'react';

class Genre extends React.Component {
    render() {
        return(
                <select name="genre" size="5">
                    <option value="action-adventure">Action/Adventure</option>
                    <option value="drama">Drama</option>
                    <option value="fiction">Fiction</option>
                    <option value="horror">Horror</option>                   
                    <option value="mystery">Mystery</option>
                    <option value="romance">Romance</option>
                    <option value="satire">Satire</option>
                    <option value="sci-fi">Sci-Fi</option>                    
                </select>
        )
    }
}

export default Genre;