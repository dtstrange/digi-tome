import React from 'react';
import BookWindow from '../components/BookWindow';
import Disqus from '../components/Disqus';
import axios from 'axios';


class Book extends React.Component {

    state = {
        file: "",
        book: ''
    }
    componentDidMount() {
        if (this.props.match.params.bookId) {
            axios({
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                url: "/api/books/search?bookId=" + this.props.match.params.bookId
            }).then((resp) => {
                this.setState({
                    file: resp.data.response[0].link,
                    book: resp.data.response[0]
                }, () => console.log(this.state))

            }).catch((err) => {
                console.error(err)
            })
        }

    }



    render() {
        return (
            <div>
                <div className="row">
                    {
                        <div className="col-xs-10 col-xs-offset-1">
                            {this.state.file ?
                                <BookWindow
                                    file={this.state.file}
                                /> :
                                <img alt='' src="/assets/images/cantfindbook.jpg" />}
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Disqus shortname="digi-tome" title={this.state.book.title} url={window.location.href} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Book;