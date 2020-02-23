import React from 'react';
import logo from '../logo.svg';

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import './Header.css'

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

const Header = (props) => {
  
  let suggestionListStyle = {
    backgroundColor: "white", 
    textAlign: 'left', 
    display: 'flex', 
    flexDirection: 'column', 
    fontWeight: 'bold', 
    position: 'absolute', 
    left: '0rem', 
    top: 40,
    border: '1px solid #ced4da',
    borderRadius: '.25rem',
  }
    
return(
  <header>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
    
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">
        
          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>
            
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">
                  <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                </NavLink>
              </NavItem>
              
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">Home</NavLink>
              </NavItem>
              
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">Profile</NavLink>
              </NavItem>
              
              <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                <DropdownToggle className="font-weight-bold" nav caret>Bookmarks</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Next Summer</DropdownItem>
                  <DropdownItem>Paris</DropdownItem>
                  <DropdownItem>NYC</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              
            </Nav>
          </Col>
          
          <Col className="d-flex justify-content-xs-start justify-content-lg-center">
            <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
              <img id="logo"src={logo} alt="logo" className="position-relative img-fluid" />
            </NavbarBrand>
          </Col>
          
          <Col style={{}} className="d-none d-lg-flex justify-content-end">
            <Input type="search" id='searchInput' className="form-control" placeholder="Search destination country" style={{ marginRight: 0, position: 'relative'}} onChange={props.suggestInputHandler}/>
            <button style={{position: 'absolute', right: 0}}className="btn btn-secondary" type="button" id="searchButton" onClick={props.searchInputHandler}>
                <i className="fa fa-search"></i>
            </button>
            <small style={suggestionListStyle}>
              {props.suggestion.length !== 0 ? 
              <span 
              style={{textAlign: 'center', color: '#ccc', borderBottom: '1px solid #ced4da'}}>Suggestions
              </span> 
              : null}

              {props.suggestion.map((sugg,index) => 
              <span id ='hooverBlue' key={index} style={{width: '380px'}}>
                <a onClick={props.searchSuggestHandler} style={{ margin: '5px 5px', cursor: 'pointer'}}>{sugg}
                </a>
              </span>)}
            </small>
          </Col>
          
        </Row>
      </Container>
      
    </Navbar>
  </header>
);
}

export default Header;

            /*<Button id='searchButton' color="info" outline>Search</Button> */  
