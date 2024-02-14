import axios from "axios";
import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { config } from "../../../App";
const ServiceInfoAdmin = ({
  serviceForm,
  show,
  setShow,
  carData,
  setCarData,
  fetchData,
  startDate,
  endDate
}) => {
 
  const [currentStatus, setCurrentStatus] = useState('');
  
  const handleClose = async (e) => {
    let finalData = { ...serviceForm, cost:currentStatus };
    const token = localStorage.getItem("token");
  
  const url = `${config.endpoint}/products`;
   
   let up= await axios.post(url+'/updateCost',
    finalData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },)
    
    let x= await axios.get(url+'?category=undefined')
    setCurrentStatus('')
    setCarData(x.data)
    setShow(false);
  };
  return (
    <Modal className = "model-content"show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Order Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => {}}>
          <Form.Group controlId="currentStatus">
            <Form.Label>Cost </Form.Label>
            <input type={"number"} value={currentStatus} onChange={(e)=>{setCurrentStatus(e.target.value)}} required/>
            
          </Form.Group>
                   
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceInfoAdmin;
