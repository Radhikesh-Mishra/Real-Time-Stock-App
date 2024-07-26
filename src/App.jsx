
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const API_KEY = 'API KEY'; // Replace with your Financial Modeling Prep API key

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);

  const fetchStockData = async (ticker) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`);
      const data = await response.json();
      if (data.length > 0) {
        const { name, open, high, low, price, volume } = data[0];
        setStockData({
          name,
          open,
          high,
          low,
          lastQuote: price,
          volume
        });
      } else {
        setStockData(null);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchStockData(symbol);
      const intervalId = setInterval(() => fetchStockData(symbol), 10000);
      return () => clearInterval(intervalId);
    }
  }, [symbol]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData(symbol);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <h1>Real-Time Stock App</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSymbol">
              <Form.Label>Enter Stock Symbol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stock symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      {stockData && (
        <Row className="justify-content-md-center mt-5">
          <Col md="auto">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Last Quote</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{stockData.name}</td>
                  <td>{stockData.open}</td>
                  <td>{stockData.high}</td>
                  <td>{stockData.low}</td>
                  <td>{stockData.lastQuote}</td>
                  <td>{stockData.volume}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
