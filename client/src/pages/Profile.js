import React from 'react'
import axios from 'axios'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: '',
            genre: '',
            description: ''
        }
    }
    
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
       
        axios({
            url: '/api/books/search?title=' + this.state.title + '&genre' + this.state.genre + '&description=' + this.state.description,
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
                    <h3 class="story-title">{item.title}</h3>
                    <h6><i>{item.genre}</i></h6>
                    <p>{item.description}</p>
                    <br />
                </div>  
            )
        })
        console.log(bookList);
        
        return(
            <div>
                <div id="profile-stories-header">
                    <h2>My Stories</h2>
                </div>
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