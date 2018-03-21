
import React from 'react';

class Results extends React.Component {
    render() {
        return(
            <div id="main">
                <table style={{
                    border: "1px solid white",
                    width: "100%"
                }}>
                    <thead>
                    <tr style={{border: "1px solid white"}}>
                        <td>Title</td>
                        <td>Genres</td>
                        <td>Synopsis</td>
                        <td>Author</td>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((elem) => {
                            return <tr style={{border: "1px solid white"}} key={elem.id}>
                                <td>{elem.title}</td>
                                <td>{elem.genre.split(',').join(', ')}</td>
                                <td>{elem.description}</td>
                                <td>{elem.User.username}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Results;