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
      suggestion: []
    };

    // Infinite Scrolling Handler
    window.onscroll = () => {

      const {loadResorts} = this;

      if(window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight){
          loadResorts();
        }
    };
  }

  componentDidMount(){

    axios.get('resorts.json')
    .then(response => {
      this.setState({ resorts: response.data.entities, resortsQuery: response.data.entities });
      
      // Store list of country
      this.searchByCountry();
    });

    // Initial loading
    this.loadResorts();
  }

// Incrementing the displayed items on event 'scroll'
// Here we pass prevState for async purpose (this.setState is async)
  loadResorts = () => {
    this.setState((prevState) => {
      return {showedItems : prevState.showedItems + 24}
    })
  }

// Building an array of countries
  searchByCountry = () => {

    let countriesArray = this.state.resorts
    .map(resort => resort.Category_1)
    .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

    //remove the #31 which is undefined and causes error...
    countriesArray.splice(31, 1);

    this.setState({countries: countriesArray});
  }

// Displaying suggestions when user is filling input
   suggestInputHandler = (event) => {
      let inputValue = event.target.value;
      let countries = this.state.countries.slice();
      countries = countries.filter(country => country.toLowerCase().includes(inputValue.trim().toLowerCase()));
      console.log(countries);
      if(inputValue.length>0) 
      {
        
        this.setState({suggestion: countries.slice(0, 20)});
        
      }
      else
      { this.setState({suggestion: []})}
  }

// Loading resorts of a user-input, if clicked on search icon
  searchInputHandler = () => {
    const {resorts} = this.state;
    const value = document.getElementById('searchInput').value;
    let resortsSafe = resorts;
    for(let i=0; i < resortsSafe.length; i++ ){
      if (resortsSafe[i].Category_1 === undefined){
        resortsSafe[i].Category_1 = ''
      }
    }    
    let resortsFiltered = resortsSafe.filter((resort) => {
        return (value === "" || resort.Category_1.toLowerCase() === value.toLowerCase())}
        );  
    this.setState({resortsQuery : resortsFiltered});
    this.setState({suggestion: []});
  }

// Loading resorts of a suggestion, if clicked on suggestion
  searchSuggestHandler = (event) => {
    const {resorts} = this.state;
    let resortsSafe = resorts;
    for(let i=0; i < resortsSafe.length; i++ ){
      if (resortsSafe[i].Category_1 === undefined){
        resortsSafe[i].Category_1 = ''
      }
    }    
    let resortsFiltered = resortsSafe.filter((resort) => {
        return (resort.Category_1 === event.target.innerHTML)}
        );  

    this.setState({resortsQuery : resortsFiltered});
    // replacing the input with the clicked suggestion
    document.getElementById('searchInput').value = event.target.innerHTML
    this.setState({suggestion: []});
  }

  render(){
    
    const {resortsQuery, showedItems} = this.state; 
    return(
      <div className="App">
        <Header 
        searchInputHandler = {() => this.searchInputHandler()}
        suggestInputHandler = {(event) => this.suggestInputHandler(event)}
        suggestion = {this.state.suggestion}
        searchSuggestHandler = {(event) => this.searchSuggestHandler(event)}
        />
      <main className="my-5 py-5">
        <Container className="px-0">
        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
        {/* Only displaying a slice of the resorts array, 
        infinite scrolling doing the rest*/}
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