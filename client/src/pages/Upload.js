import React from 'react';
import Genre from '../components/Genre.js';
import axios from 'axios'
class Upload extends React.Component {
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitBook = (event) => {
        event.preventDefault();
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        if (!this.state.genre1) {
            return false;
        }
        let genre = this.state.genre1;
        if (this.state.genre2) genre += "," + this.state.genre2;
        if (this.state.genre3) genre += "," + this.state.genre3;
        data.append("bookFile", document.getElementById("pdf-file").files[0])
        //:title/:genre/:description/:userId/:price
        axios.post('/api/books/upload?title=' + this.state.title + "&genre=" + genre + "&description=" + this.state.description + "&price=" + this.state.bookPrice, data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
            console.log(data)
        }).catch((error) => {
            console.error(error);
        })
    }
    render() {
        return(
            <div id="main">
                <h5>Upload your stories here</h5>
                <form encType="multipart/form-data">
                    <label htmlFor="title">Title:</label>
                    <input onChange={this.onChangeHandler} name="title" id="upload-title" type="text" />
                    <br />
                    <Genre name="genre1" onChangeHandler={this.onChangeHandler} />
                    <Genre name="genre2" onChangeHandler={this.onChangeHandler} />
                    <Genre name="genre3" onChangeHandler={this.onChangeHandler} />
                    <br />
                    <label htmlFor="description">Synopsis:</label>
                    <input onChange={this.onChangeHandler} name="description" id="upload-synopsis" type="text" />
                    <br />
                    <label htmlFor="bookPrice">Price: </label>
                    <input onChange={this.onChangeHandler} name="bookPrice" type="number" min="0" step="0.01" />
                    <br />
                    <label htmlFor="bookFile">Select PDF:</label>
                    <input name="bookFile" onChange={this.onChangeHandler} id="pdf-file" type="file" />
                    <br />
                    <input onClick={this.submitBook} className="submit" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Upload;