import React from 'react';
import BookWindow from '../components/BookWindow';

class Book extends React.Component {
    state = {
        file: ""
    }

    render() {
        return(
            <BookWindow file="/books/1/Desert's Wrath Ch1.pdf"/>

        );
    }
}

export default Book;