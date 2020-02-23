import React, { Component, Fragment } from "react";
import './Resort.css';

import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";

class Resort extends Component {

    defaultSrcImg(ev){
        ev.target.src = 'blue_sky.jpg'
    }

    render() {
    const { name, image, place, text, price, promo } = this.props;

    let trianglePromo = promo !== "0%" ? 
    <Fragment><p className="promotionTriangle"></p><span className='promotionRate'>{promo}</span></Fragment> : null

    return (
      <Card style={{ margin: ".5rem", height: "32rem", position: 'relative'}}>
      {trianglePromo}
        <CardImg top width="100%" height="190px" src={image} onError={this.defaultSrcImg} alt="Resort image" />
        <CardBody>
          <CardTitle 
            style={{height: "4.8rem", overflow: "hidden"}} 
            className="h3 mb-2 pt-2 font-weight-bold text-secondary">
            {name}
          </CardTitle>
          <CardSubtitle
            className="text-secondary mb-3 font-weight-light text-uppercase"
            style={{ fontSize: "0.8rem" }}>
            {place}
          </CardSubtitle>
          <CardText
            className="text-secondary mb-4"
            style={{ fontSize: "0.75rem", height: "3.6rem", overflow: "hidden" }}>
            {text}
          </CardText>
          <CardSubtitle
            className="text-secondary mb-3 font-weight-bold text-uppercase"
            style={{ fontSize: "0.8rem" }}>
            {price}
          </CardSubtitle>
          <Button 
            className="font-weight-bold"
            color="success"
            style={{position: "absolute", bottom: '1rem', right: "5rem", border: '1px solid #6c757d'}}>
            View Offer
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default Resort;
