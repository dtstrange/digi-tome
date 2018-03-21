
import React from 'react';
import Genre from './Genre';

class SearchForm extends React.Component {
    state = {
        title: "",
        author: "",
        genre1: "",
        genre2: "",
        genre3: ""
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitSearch = (event) => {
        event.preventDefault();
        let searchParams = "?";
        let genres = "";
        if (this.state.title) searchParams += "&title=" + this.state.title;
        if (this.state.author) searchParams += "&author=" + this.state.author;
        if (this.state.genre1) { genres = this.state.genre1; }
        if (this.state.genre2) genres += "," + this.state.genre2;
        if (this.state.genre3) genres += "," + this.state.genre3;
        if (genres) searchParams += "&genre=" + genres
        this.props.searchFunc(searchParams);
    }
    render() {
        return(

            <div>
                <form>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" onChange={this.onChangeHandler} />
                <br />
                <label htmlFor="author">Author: </label>
                <input type="text" name="author" onChange={this.onChangeHandler} />
                <br />
                <label>Genres: </label>
                <Genre name="genre1" onChangeHandler={this.onChangeHandler} />
                <Genre name="genre2" onChangeHandler={this.onChangeHandler} />
                <Genre name="genre3" onChangeHandler={this.onChangeHandler} />
                <input onClick={this.submitSearch} className="submit" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default SearchForm;