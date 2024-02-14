import axios from "axios";
import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { config } from "../../App";
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
  let orderStages=[
    "new",
    "accepted",
    
    "out for service",
    "completed"
  ]
  const [currentStatus, setCurrentStatus] = useState(serviceForm.currentStatus);
  
  const handleClose = async (e) => {
    let finalData = { ...serviceForm, order_status:currentStatus };
    const token = localStorage.getItem("token");
  
  const url = `${config.endpoint}/orders`;
   
   let up= await axios.post(url+"/update",
    finalData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },)
    
    let x= await axios.get(url)
    console.log(x)
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
            <Form.Label>Current Order Status</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setCurrentStatus(e.target.value);
              }}
              defaultValue={serviceForm.currentStatus}
            >
              {orderStages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </Form.Control>
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
