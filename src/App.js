import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import TableComponent from './components/TableComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <TableComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
