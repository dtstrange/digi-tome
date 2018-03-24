import React from 'react';
import BookWindow from '../components/BookWindow';
import axios from 'axios';


class Book extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        file: ""
    }
    componentDidMount() {
        if(this.props.match.params.bookId){
            axios({
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                url: "/api/books/search?bookId=" + this.props.match.params.bookId
            }).then((resp) => {
                this.setState({
                    file: resp.data.response[0].link
                })
                
            }).catch((err) => {
                console.error(err)
            })
        }
        
    }
    
    
    
    render() {
        return(
            this.state.file ? 
            <BookWindow 
            file={this.state.file} 
            /> : 
            <img src="/assets/images/cantfindbook.jpg"/>

        );
    }
}

export default Book;