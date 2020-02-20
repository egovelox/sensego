import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


import Header from './components/Header';
import Resort from './components/Resort';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {resorts: []};

    axios.get('resorts.json')
    .then(response => {
      console.log(response.data.entities);
      return response.data.entities
    })
    .then(response => {
      /* let resortsChunked = [];
      let chunkArray = []
      for (let i=0,j=response.length; i<j; i+=100) {
        chunkArray = response.slice(i,i+100);
        resortsChunked.push(chunkArray);
      } */
      this.setState({ resorts: response })

    })
  }
  
  render(){
    const {resorts} = this.state; 
    return(
      
      <div className="App">
        <Header />
      
      <main className="my-5 py-5">
        <Container className="px-0">
        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
        {resorts.slice(0,30).map((resort, index) => (
          <Col key={index} xs={{ order: 2 }} md={{ size: 3, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
          <Resort 
            name={resort.Offer_Name}
            image={resort.Image}
            text={resort.Text}
            place={resort.Category_1 + " - " + resort.Category_2 }
          />
        </Col>
        ))}
        </Row>
        </Container>
      </main>
      </div>
    );
  }
}

export default App;


/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button><a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a></Button>
      </header>
*/

/*
<Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
          
            <Col xs={{ order: 2 }} md={{ size: 3, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
              <Resort 
              />
            </Col>
            <Col xs={{ order: 2 }} md={{ size: 3, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
              <Resort />
            </Col>
            <Col xs={{ order: 2 }} md={{ size: 3, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
              <Resort />
            </Col>
            <Col xs={{ order: 2 }} md={{ size: 3, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
              <Resort />
            </Col>
          </Row>
*/