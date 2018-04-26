import React from 'react';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';
import axios from 'axios';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            title: '',
            genre: '',
            description: ''
        }
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

    componentDidMount() {
        console.log(this.props);
        if (this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search)
            this.searchBookDb("?title=" + urlParams.get("title"))
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <SearchForm searchFunc={this.searchBookDb} />
                    {(this.state.results[0]) ? <Results data={this.state.results} /> : ""}
                </div>
            </div>
        );
    }
}

export default Search;