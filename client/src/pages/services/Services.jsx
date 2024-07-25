import React, { useState, useEffect } from "react";
import "./Services.css";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [cookies] = useCookies(["token"]);
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleClose = () => setShow(false);
  const handleConfirmClose = () => setConfirmShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmShow = () => setConfirmShow(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const navigate = useNavigate();

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleDeliveryTimeChange(e) {
    setDeliveryTime(e.target.value);
  }

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/service/get-service/${cookies.userId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setServices(res);
      })
      .catch((error) => console.log(error));

    fetch(`${import.meta.env.VITE_API_URL}/service/get-all-service`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllServices(res);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const deleteService = (serviceId) => {
    setId(serviceId);
    fetch(
      `${import.meta.env.VITE_API_URL}/service/delete-service/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          setId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBook = async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/booking/new-booking/${cookies.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({ serviceId: selectedServiceId }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        handleConfirmClose();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(
      `${import.meta.env.VITE_API_URL}/service/update-service/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          title,
          desc: description,
          category,
          price,
          deliveryTime,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          setId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-5">
      {cookies.role ? (
        <>
          <Container>
            <main>
              <Row className="row-cols-1 row-cols-md-3 mb-3 text-center">
                {services.map((service) => (
                  <Col key={service._id}>
                    <Card className="mb-4 rounded-3 shadow-sm">
                      <Card.Header className="py-3">
                        <h4 className="my-0 fw-normal">{service.title}</h4>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title className="pricing-card-title">
                          {service.price}
                          <small className="text-muted fw-light">/mo</small>
                        </Card.Title>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>{service.desc}</li>
                          <li>{service.deliveryTime}</li>
                        </ul>
                        <Button
                          variant="outline-primary"
                          size="lg"
                          className="w-100"
                          onClick={() => deleteService(service._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="lg"
                          className="w-100  mt-2"
                          onClick={() => {
                            handleShow();
                            setTitle(service.title);
                            setDescription(service.desc);
                            setCategory(service.category);
                            setPrice(service.price);
                            setDeliveryTime(service.deliveryTime);
                            setId(service._id);
                          }}
                        >
                          Update
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </main>
          </Container>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="p-5 row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="inputTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTitle"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="inputDescription"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCategory" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCategory"
                    value={category}
                    onChange={handleCategoryChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPrice" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPrice"
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputDeliveryTime" className="form-label">
                    Delivery Time (days)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputDeliveryTime"
                    value={deliveryTime}
                    onChange={handleDeliveryTimeChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClose}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Container>
            <main>
              <Row className="row-cols-1 row-cols-md-3 mb-3 text-center">
                {allServices.map((service) => (
                  <Col key={service._id}>
                    <Card className="mb-4 rounded-3 shadow-sm">
                      <Card.Header className="py-3">
                        <h4 className="my-0 fw-normal">{service.title}</h4>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title className="pricing-card-title">
                          {service.price}
                          <small className="text-muted fw-light">/mo</small>
                        </Card.Title>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>{service.desc}</li>
                          <li>{service.deliveryTime}</li>
                        </ul>
                        <Button
                          variant="outline-primary"
                          size="lg"
                          className="w-100"
                          onClick={() => {
                            setSelectedServiceId(service._id);
                            handleConfirmShow();
                          }}
                        >
                          Book Service
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </main>
          </Container>

          <Modal show={confirmShow} onHide={handleConfirmClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to book this service?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleConfirmClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleBook}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Service;
