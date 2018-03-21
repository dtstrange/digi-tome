import React from 'react';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';
import axios from 'axios';

class Search extends React.Component {
    
    state = {
        results : []
    }
    searchBookDb = (searchParams) => {
        axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            url: "/api/books/search" + searchParams
        }).then((resp) => {
            this.setState({
                results: resp.data.response
            })
        }).catch((err) => {
            console.error(err)
        })
    }
    render() {
        return(
            <div>
                <SearchForm searchFunc={this.searchBookDb}/>
                { (this.state.results[0]) ? <Results data={this.state.results} /> : "" }
            </div>
        );
    }
}

export default Search;