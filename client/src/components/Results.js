
import React from 'react';
import {Link} from 'react-router-dom'

class Results extends React.Component {
    render() {
        return(
            <div id="results">
                {this.props.data.map((item) => {
                    return <div>
                    <div class="story-title-author">
                    <Link to={'./book/' + item.id}  activeClassName="active">
                        <h3 class="story-title">{item.title}</h3>
                    </Link>
                        <h5 class="story-author"><span>Author: </span>{item.User.username}</h5>
                    </div>
                    <h6><i>{item.genre.split(',').join(', ')}</i></h6>
                    <p>{item.description}</p>
                    <br />
                </div>  
                })}
            </div>
        )
    }
}

export default Results;