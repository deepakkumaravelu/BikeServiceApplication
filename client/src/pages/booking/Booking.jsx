import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const Booking = () => {
  // Hook to access cookies for authentication
  const [cookies] = useCookies(["token"]);
  
  // State hooks to manage bookings and modal state
  const [bookings, setBookings] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userBookings, setUserBookings] = useState([]);

  // Fetching all bookings and user-specific bookings on component mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/booking/get-all-bookings`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings);
      })
      .catch((error) => console.log(error));

    fetch(
      `${import.meta.env.VITE_API_URL}/booking/get-bookings/${cookies.userId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.bookings);
        setUserBookings(data.bookings);
      })
      .catch((error) => console.log(error));
  }, [cookies.token, cookies.userId]);

  // Handler to open the modal for updating booking status
  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsCompleted(booking.isCompleted);
    setShowModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  // Function to handle form submission for updating booking status
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedBooking) {
      await fetch(
        `${import.meta.env.VITE_API_URL}/booking/update-booking/${
          selectedBooking._id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({
            isCompleted,
          }),
        }
      )
        .then(() => {
          // Updating the bookings state with the new status
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === selectedBooking._id
                ? { ...booking, isCompleted }
                : booking
            )
          );
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container className="mt-5">
      {cookies.role ? (
        bookings.length > 0 ? (
          <Row>
            {bookings.map((booking) => (
              <Col key={booking._id} sm={12} md={6} lg={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Booking Details</Card.Title>
                    <Card.Text>
                      Service:{" "}
                      {booking.serviceId ? booking.serviceId.title : "N/A"}
                    </Card.Text>
                    <Card.Text>
                      User name:{" "}
                      {booking.userId ? booking.userId.username : "N/A"}
                    </Card.Text>
                    <Card.Text>
                      Email: {booking.userId ? booking.userId.email : "N/A"}
                    </Card.Text>
                    <Card.Text>
                      Phone: {booking.userId ? booking.userId.phone : "N/A"}
                    </Card.Text>
                    <Card.Text>
                      Location:{" "}
                      {booking.userId ? booking.userId.location : "N/A"}
                    </Card.Text>
                    <Card.Text>
                      Cost:{" "}
                      {booking.serviceId ? booking.serviceId.price : "N/A"} ₹
                    </Card.Text>
                    <Card.Text>
                      Status: {booking.isCompleted ? "Completed" : "Pending"}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleOpenModal(booking)}
                    >
                      Update Status
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info">No bookings available.</Alert>
        )
      ) : userBookings.length > 0 ? (
        <Row>
          {userBookings.map((booking) => (
            <Col key={booking._id} sm={12} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Booking Details</Card.Title>
                  <Card.Text>
                    Service:{" "}
                    {booking.serviceId ? booking.serviceId.title : "N/A"}
                  </Card.Text>
                  <Card.Text>
                    User name:{" "}
                    {booking.userId ? booking.userId.username : "N/A"}
                  </Card.Text>
                  <Card.Text>
                    Email: {booking.userId ? booking.userId.email : "N/A"}
                  </Card.Text>
                  <Card.Text>
                    Phone: {booking.userId ? booking.userId.phone : "N/A"}
                  </Card.Text>
                  <Card.Text>
                    Location: {booking.userId ? booking.userId.location : "N/A"}
                  </Card.Text>
                  <Card.Text>
                    Cost: {booking.serviceId ? booking.serviceId.price : "N/A"}{" "}
                    ₹
                  </Card.Text>
                  <Card.Text>
                    Status: {booking.isCompleted ? "Completed" : "Pending"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No bookings have been made yet.</Alert>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="isCompleted">
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="checkbox"
                label="Completed"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Booking;
