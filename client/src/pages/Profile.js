import React from 'react'
import axios from 'axios'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: null,
            title: '',
            author: '',
            genre: '',
            description: ''
        }
    }
    
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        let genre = this.state.genre1;
        if (this.state.genre2) genre += ", " + this.state.genre2;
        if (this.state.genre3) genre += ", " + this.state.genre3;
        console.log(this.props);
       
        axios({
            url: '/api/profile/' + JSON.parse(window.atob(loginToken.split('.')[1])).username,
            method: 'get',
            headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp);
                console.log(resp.data.response);
                this.setState({
                    books: resp.data.PublishedBooks
                })
                console.log(this.state.books);
                

            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        console.log(this.state.books);
        if(this.state.books) {
        var bookList = this.state.books.map(function(item) {
            return (
                <div>
                    <div class="story-title-author">
                        <h3 class="story-title">{item.title}</h3>
                        <h5 class="story-author"><span>Author: </span></h5>
                    </div>
                    <h6><i>{item.genre.split(',').join(', ')}</i></h6>
                    <p>{item.description}</p>
                    <br />
                </div>  
            )
        
        })
    }
    else {
        return <div>
            <p>None found</p>
            </div>
    }
        console.log(bookList);
        
        return(
            <div>
                <div id="profile-stories-header">
                    <h2>My Stories</h2>
                </div>
                <div id="profile-stories">
                    <div className="story">
                            {bookList}                    
                        </div>
                        <div className="story-synopsis">
                           <p></p>
                        </div>
                    </div>
                </div>
        );
    }

}
    

export default Profile;