import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import ProfileChange from '../components/ProfileChange.js'
import UserIcon from '../images/user.png'
import UpdateForm from '../components/Update.js'

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
            description: '',
            profileChange: false,
            updateBook: ''
        }
    }

    handleClick = () => {
        this.setState({
            profileChange: !(this.state.profileChange)
        })
    }

    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        let username = (this.props.match.params.username) ? this.props.match.params.username : JSON.parse(window.atob(loginToken.split('.')[1])).username;
        axios({
            url: '/api/profile/' + username,
            method: 'get',
            headers: { "Authorization": "Bearer " + loginToken }
        })
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
    deleteBook = (id) => {
        // alert("trying to delete book id " + id);
        if (window.confirm("Do you really want to delete this book? This is irreversible.")) {
            axios({
                url: '/api/books/delete/' + id,
                method: 'delete',
                headers: { "Authorization": "Bearer " + window.localStorage.getItem("token") }
            })
                .then((resp) => {
                    window.location.reload();
                }).catch((error) => {
                    console.error(error);
                })
        }
    }
    refreshPg = () => {
        this.setState({
            updateBook: ''
        }, () => this.props.history.push("/profile"))

    }
    showUpdForm = (book) => {
        // alert("trying to update this book \n" + book)
        // console.log(book)
        this.setState({
            updateBook: book
        })
    }

    render() {
        var username = this.state.username;
        if (this.state.books) {
            const self = this;
            var bookList = this.state.books.map(function (item, i) {
                console.log(item);
                return (
                    <div key={i}>
                        <div className="story-title-author">
                            <Link to={'/book/' + item.id} activeClassName="active">
                                <h3 className="story-title">{item.title}</h3>
                            </Link>
                            <h5 className="story-author">
                                <span>Author: </span>{username}
                                {!(self.props.match.params.username)
                                    ?
                                    <div style={{ marginLeft: "5px" }} className="btn-group" role="group">
                                        <button onClick={() => self.showUpdForm(item)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil"></span></button>
                                        <button onClick={() => self.deleteBook(item.id)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-remove"></span></button>
                                    </div>
                                    : null
                                }
                            </h5>
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
        const loginToken = window.localStorage.getItem("token");
        return (
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="text-center" id="my-profile">
                        <h2 id="my-profile-header">My Profile</h2>
                        <img alt='' style={{ width: 200, height: 200, margin: "0 auto" }} className="img-responsive text-center" src={"/assets/images/users/" + JSON.parse(window.atob(loginToken.split('.')[1])).id + "/user.png"} />
                        <h5><span>Username: </span>{this.state.username}
                            {!(this.props.match.params.username)
                                ? <img onClick={this.handleClick} alt="change-user" id="user-change" src={UserIcon} />
                                : null
                            }
                        </h5>
                        <h6><span>Books Published: </span>{this.state.bookCount}</h6>
                        {/* checking if profileChange is true and whether a url param username does not exist */}
                        {(this.state.profileChange) && !(this.props.match.params.username)
                            ? <ProfileChange />
                            : null
                        }

                    </div>
                    {
                        (this.state.updateBook)
                            ? <UpdateForm refreshPg={this.refreshPg} book={this.state.updateBook} />
                            : null
                    }
                    <div id="profile-stories">
                        <div id="profile-stories-header">
                            <h2>Published Books</h2>
                        </div>
                        <div className="story">
                            {bookList}
                        </div>
                        {!(this.props.match.params.username)
                            ?
                            <div className="text-center">
                                <button onClick={() => this.props.history.push("/upload")} className="btn btn-primary btn-sm">Upload a new book!</button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }

}


export default Profile;