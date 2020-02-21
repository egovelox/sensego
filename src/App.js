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
      countries: [],
      resortsQuery: [],
      showedItems: 0,
      isLoading: false
    };

    window.onscroll = () => {
      const {
        loadResorts
      } = this;

      if(window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight){
          loadResorts();
        }
    };

    //this.getSearch = this.getSearch.bind(this);
  }

  componentDidMount(){
    axios.get('resorts.json')
    .then(response => {
      this.setState({ resorts: response.data.entities, resortsQuery: response.data.entities });
      this.searchByCountry();
      console.log(this.state.resorts, this.state.countries)
    })
    this.loadResorts();
    this.getSearch();
  }

  loadResorts = () => {
    this.setState({showedItems : this.state.showedItems + 24})
  }

  searchByCountry = () => {
    let countriesArray = this.state.resorts
    .map(resort => {
      return resort.Category_1;
    })
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item]
    }, []);
    this.setState({countries: countriesArray});
  }

  getSearch = () => {
    const searchInput = document.querySelector('#searchInput');
    //const searchButton = document.querySelector('#searchButton');
    /* searchInput.addEventListener('input', () => {
      let value = searchInput.value;
      console.log(this.state.countries);
      this.setState({countries : this.state.countries.filter(country => country.Category_1 === value)});
      console.log(this.state.countries);
    }) */

    searchInput.addEventListener('change', ()=> {
      let value = searchInput.value;
      console.log(value);
      const {resorts} = this.state;

      let resortsFiltered = [];
      resortsFiltered = resorts
      .filter((resort) => {
        return (value === "" || resort.Category_1 === value)}
        );
      this.setState({resortsQuery : resortsFiltered});

    }, true);
  }


  render(){
    const {resortsQuery, showedItems} = this.state; 
    return(
      <div className="App">
        <Header />
      <main className="my-5 py-5">
        <Container className="px-0">
        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
        {resortsQuery.slice(0, showedItems).map((resort, index) => (
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