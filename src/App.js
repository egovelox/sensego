import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import Header from './components/Header';
import Resort from './components/Resort';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      resorts: [],
      showedItems: 0,
      isLoading: false
    };

    axios.get('resorts.json')
    .then(response => {
      console.log(response.data.entities);
      this.setState({ resorts: response.data.entities })
    })

    window.onscroll = () => {
      const {
        loadResorts
      } = this;

      if(window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight){
          loadResorts();
        }
    };
  }

  componentWillMount(){
    this.loadResorts();
  }

  loadResorts = () => {
    this.setState({showedItems : this.state.showedItems + 24})
  }

  render(){
    const {resorts, showedItems} = this.state; 
    return(
      <div className="App">
        <Header />
      <main className="my-5 py-5">
        <Container className="px-0">
        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
        {resorts.slice(0, showedItems).map((resort, index) => (
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