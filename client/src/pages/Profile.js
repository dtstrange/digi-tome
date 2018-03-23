import React from 'react'
import axios from 'axios'
import UserChange from '../components/UserChange.js'
import UserIcon from '../images/user.png';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: null,
            bookCount: 0,
            username: '',
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
                    books: resp.data.PublishedBooks,
                    bookCount: resp.data.PublishedBooks.length,
                    username: JSON.parse(window.atob(loginToken.split('.')[1])).username
                })
                

            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        console.log(this.state.books);
        var username = this.state.username;
        if(this.state.books) {
        var bookList = this.state.books.map(function(item) {
            console.log(item);
            return (
                <div>
                    <div className="story-title-author">
                        <h3 className="story-title">{item.title}</h3>
                        <h5 className="story-author"><span>Author: </span>{username}</h5>
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
                <div id="my-profile">
                    <h2 id="my-profile-header">My Profile</h2>
                    <h5><span>Username: </span>{this.state.username}  
                        <img id="user-change" src={UserIcon} />
                    </h5>
                    <h6><span>Books Published: </span>{this.state.bookCount}</h6>
                    <UserChange />
                </div>
                
                <div id="profile-stories">
                    <div id="profile-stories-header">
                        <h2>Published Books</h2>
                    </div>
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