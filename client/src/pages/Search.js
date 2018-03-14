import React from 'react';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';

class Search extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            formState: "searchForm"
        };

        this.changeFormState = this.changeFormState.bind(this);
    }

    changeFormState(event) {
        event.preventDefault()
        if (this.state.formState === "searchForm") {
            this.setState({
                formState: "results"
            })
        } else {
            this.setState({
                formState: "searchForm"
            })
        }
    }
    
    render() {
        return(
            <div>
                {
                (this.state.formState === "searchForm")
                ? <SearchForm changeSearch={this.changeFormState} /> 
                : <Results changeSearch={this.changeFormState} />
                }
       
            </div>
        );
    }
}

export default Search;