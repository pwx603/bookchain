import React, { Component } from 'react';
// import samplePDF from '../asset/test.pdf';
import { Document, Page } from 'react-pdf';
import Button from '@material-ui/core/Button';
class PDFDocument extends Component {
  state = {
    numPages: 10,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  
  handlePreviousPage = () => {
      const currPage = this.state.pageNumber;
      this.setState({pageNumber: currPage -1 });
  }

  handleNextPage = () => {
    const currPage = this.state.pageNumber;
    console.log('curpage', currPage)
    this.setState({pageNumber: currPage +1 });
}

  render() {
    // const document = this.props.pdfDocument;
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file="../asset/test.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div >
            <Button variant="contained" color="primary" onClick={this.handlePreviousPage}>
            Previous 
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleNextPage} style={{marginLeft: '400px'}}>
            Next
            </Button>
        </div>
      </div>
    );
  }
}

export default PDFDocument;