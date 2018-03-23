import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Button from './Button'
import ProfileChange from '../components/ProfileChange.js'
import UserIcon from '../images/user.png';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            books: null,
            bookCount: 0,
            username: '',
            title: '',
            author: '',
            genre: '',
            description: '',
            profileChange: false
        };

        
    }
    
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        let username = (this.props.match.params.username) ? this.props.match.params.username : JSON.parse(window.atob(loginToken.split('.')[1])).username;
        axios({
            url: '/api/profile/' + username,
            method: 'get',
            headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp);
                this.setState({
                    books: resp.data.PublishedBooks,
                    bookCount: resp.data.PublishedBooks.length,
                    username: resp.data.username
                })
                

            }).catch((error) => {
                console.error(error);
            })
    }

    handleClick() {
        this.setState({
            profileChange: true
        })
    }

    render() {
        const profileChange = this.state.profileChange;

        const button = profileChange ? (
            <Button onClick={this.handleClick} />
        ) : (
            <ProfileChange onClick={this.handleClick} />
        )

        var username = this.state.username;
        if(this.state.books) {
        var bookList = this.state.books.map(function(item, i) {
            return (
                <div key={i}>
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
        
        return(
            <div>
                <div id="my-profile">
                    <h2 id="my-profile-header">My Profile</h2>
                    <h5><span>Username: </span>{this.state.username}  
                        <img alt="change-user" id="user-change" src={UserIcon} />
                    </h5>
                    <h6><span>Books Published: </span>{this.state.bookCount}</h6>
                    {button}
                  
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