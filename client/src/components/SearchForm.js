
import React from 'react';
import Genre from './Genre';

class SearchForm extends React.Component {

    render() {
        return(
            <div id="main">
                <form className="navbar-form" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" />
                        <button type="submit" className="btn btn-default" onClick={this.props.changeSearch}>Submit</button>
                    </div><br />
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
                </form>
            </div>
        )
    }
}

export default SearchForm;