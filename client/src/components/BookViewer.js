import React from 'react';
import { Document } from 'react-pdf';

class BookViewer extends React.Component {

  render() {
    return (
      <div>
          <Document 
            file={this.props.file}
          />
      </div>
    )
  }
}

export default BookViewer;

