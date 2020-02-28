import React, { useState } from 'react';
import { CardImg, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ResortDetails = (props) => {
  const {
      name,
      fullText,
      image
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const defaultSrcImg = (ev) =>{
    ev.target.src = 'blue_sky.jpg'
}

  return (
    <div>
      <Button 
      onClick={toggle}
      className="font-weight-bold"
      color="success"
      style={{position: "absolute", bottom: '1rem', right: "5rem", border: '1px solid #6c757d'}}>
      View Offer</Button>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>{name}</ModalHeader>
        <CardImg top width="100%" height="390px" src={image} onError={defaultSrcImg} alt="Resort image" />
        <ModalBody>
            {fullText}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Book this resort</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ResortDetails;