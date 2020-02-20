import React, { Component } from "react";

import {
  Button,
  UncontrolledAlert,
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
    //const BANNER = "";
    const { name, image, place, text } = this.props;
    return (
      <Card style={{ margin: ".5rem", height: "30rem"}}>
        <CardImg top width="100%" height="190px" src={image} onError={this.defaultSrcImg} alt="Resort image" />
        <CardBody>
          <CardTitle style={{height: "5rem", overflow: "hidden"}} className="h3 mb-2 pt-2 font-weight-bold text-secondary">
            {name}
          </CardTitle>
          <CardSubtitle
            className="text-secondary mb-3 font-weight-light text-uppercase"
            style={{ fontSize: "0.8rem" }}
          >
            {place}
          </CardSubtitle>
          <CardText
            className="text-secondary mb-4"
            style={{ fontSize: "0.75rem", height: "3.6rem", overflow: "hidden" }}
          >
            {text}
          </CardText>
          <Button color="success" className="font-weight-bold">
            View Offer
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default Resort;
