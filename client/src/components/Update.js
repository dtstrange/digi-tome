import React from 'react';
import Genre from '../components/Genre.js';
import axios from 'axios'

class Update extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        title: '',
        description: '',
        genre1: '',
        genre2: '',
        genre3: '',
        bookFile: ''
    }
    componentDidMount() {
        console.log(this.props.book, this.state);
        let stateObj = {
            title: this.props.book.title,
            description: this.props.book.description
        }
        const genreList = this.props.book.genre.split(',');
        if (genreList[0]) { stateObj.genre1 = genreList[0]; }
        if (genreList[1]) { stateObj.genre2 = genreList[1]; }
        if (genreList[2]) { stateObj.genre3 = genreList[2]; }
        this.setState(stateObj, (resp) => console.log(this.state))
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitBook = (event) => {
        event.preventDefault();
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        let genre = this.state.genre1;
        if (this.state.genre2) genre += "," + this.state.genre2;
        if (this.state.genre3) genre += "," + this.state.genre3;
        if (this.state.bookFile) { 
            data.append("bookFile", document.getElementById("pdf-file").files[0])
        }
        
        axios
            .put('/api/books/update/' + this.props.book.id +'?title=' + this.state.title + "&genre=" + genre + "&description=" + this.state.description, data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push("/profile");
            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        return (
            
                <form style={{display: "flex", flexDirection: "column"}} className="text-center" id="update-form" encType="multipart/form-data">
                    <h3>Update Book</h3>
                    <label htmlFor="title">Title:</label>
                    <input value={this.state.title} onChange={this.onChangeHandler} name="title" id="upload-title" type="text" />
                    <Genre value={this.state.genre1} name="genre1" onChangeHandler={this.onChangeHandler} />
                    <Genre value={this.state.genre2} name="genre2" onChangeHandler={this.onChangeHandler} />
                    <Genre value={this.state.genre3} name="genre3" onChangeHandler={this.onChangeHandler} />
                    <label htmlFor="description">Synopsis:</label>
                    <input value={this.state.description} onChange={this.onChangeHandler} name="description" id="upload-synopsis" type="text" />
                    <label htmlFor="bookFile">Select PDF:</label>
                    <input name="bookFile" onChange={this.onChangeHandler} accept=".pdf" id="pdf-file" type="file" />
                    <input onClick={this.submitBook} className="submit btn btn-default" type="submit" value="Submit" />                    
                </form>
            
        );
    }
}

export default Update;