
import React from 'react';
import Genre from '../components/Genre';
import axios from 'axios';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: '',
            genre: '',
            description: '',
            formState: 'Search'
        }
    }

    changeFormState(event) {
        event.preventDefault()
        if (this.state.formState === "Search") {
            this.setState({
                formState: "Results"
            })
        } else {
            this.setState({
                formState: "Search"
            })
        }
    }

    searchBooks = (event) => {
        event.preventDefault();
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        
        let genre = this.state.genre1;
        if (this.state.genre2) genre += "," + this.state.genre2;
        if (this.state.genre3) genre += "," + this.state.genre3;
        //:title/:genre/:description/:userId/:price
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
            <div id="main">
                <form className="navbar-form" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" />
                        <button type="submit" className="btn btn-default" onClick={this.searchBooks}>Submit</button>
                    </div><br />
                    <label>
                    Genre:
                    <Genre name="genre1" onChangeHandler={this.onChangeHandler} />
                    <Genre name="genre2" onChangeHandler={this.onChangeHandler} />
                    <Genre name="genre3" onChangeHandler={this.onChangeHandler} />
                    <br />
                </label>
                </form>
                <div>
                    <div id="results-header">
                        <h2>Results</h2>
                    </div>
                    <div id="results">
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
            </div>
        )
    }
}
    
export default Search;