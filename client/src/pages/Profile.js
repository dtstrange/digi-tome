import React from 'react'
import axios from 'axios'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: '',
            description: ''
        }
    }
    
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        let genre = this.state.genre1;
        if (this.state.genre2) genre += "," + this.state.genre2;
        if (this.state.genre3) genre += "," + this.state.genre3;
       
        axios({
            url: '/api/books/search?title=' + this.state.title + '&description=' + this.state.description,
            method: 'get',
            headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp);
                console.log(resp.data.response);
                this.setState({
                    books: resp.data.response
                })
                console.log(this.state.books);
                

            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        console.log(this.state.books);
        var bookList = this.state.books.map(function(item) {
            return (
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            )
        })
        console.log(bookList);
        
        return(
            <div id="main">
                <h2>My Stories</h2>
                <div id="profile-stories">
                    <div className="story">
                        <div className="story-title">
                            {bookList}                    
                        </div>
                        <div className="story-synopsis">
                           <p></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
    

export default Profile;