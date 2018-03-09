import React from 'react';
import Genre from '../components/Genre.js';

class Upload extends React.Component {
    render() {
        return(
            <div id="main">
                <h5>Upload your stories here</h5>
                <form enctype="multipart/form-data" action="/upload/image" method="post">
                    <label>
                        Title:
                        <input id="upload-title" type="text" />
                    </label><br />
                    <label>
                        Genre:
                        <div class="genre-box">
                            <Genre />
                        </div>
                        <div class="genre-box">
                            <Genre />
                        </div>
                        <div class="genre-box">
                            <Genre />
                        </div>
                    </label>
                    <br />
                    <label>
                        Synopsis:
                        <input id="upload-synopsis" type="text" />
                    </label>
                    <label>
                        <input id="image-file" type="file" />
                    </label><br />
                    <input class="submit" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Upload;