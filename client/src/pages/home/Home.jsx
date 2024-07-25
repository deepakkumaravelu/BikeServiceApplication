import React from 'react';
import { Nav, Container, Carousel, Button } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';

import Navbar from '../../components/navbar/Navbar';
import './Home.css'; 

const Home = () => {
  return (
    <>
      <Navbar/>
      
      <main className="mt-3 pt-3">
        <Container>
          <Carousel className="mb-5 carousel-custom"> 
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="image1.jpg"
                alt="Professional Bike Service"
              />
              <Carousel.Caption>
                <h3>Professional Bike Service</h3>
                <p>We provide top-notch bike servicing to ensure your ride is smooth and safe.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="image2.jpg"
                alt="Experienced Mechanics"
              />
              <Carousel.Caption>
                <h3>Experienced Mechanics</h3>
                <p>Our team of experienced mechanics is here to help with all your bike needs.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="image3.jpg"
                alt="Quality Parts and Service"
              />
              <Carousel.Caption>
                <h3>Quality Parts and Service</h3>
                <p>We use only the best parts and provide exceptional service to keep your bike in top condition.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div className="row">
            <div className="col-lg-4 text-center">
              <img
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                src="tuneup.jpg"
                alt="Service 1"
              />
              <h2 className="fw-normal">Bike Tune-Up</h2>
              <p>Ensure your bike is in perfect condition with our comprehensive tune-up services.</p>
            </div>
            <div className="col-lg-4 text-center">
              <img
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                src="image1.jpg"
                alt="Service 2"
              />
              <h2 className="fw-normal">Brake Repair</h2>
              <p>We offer expert brake repair services to ensure your safety on the road.</p>
            </div>
            <div className="col-lg-4 text-center">
              <img
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                src="tire.jpg"
                alt="Service 3"
              />
              <h2 className="fw-normal">Tire Replacement</h2>
              <p>Get the best tires for your bike with our tire replacement services.</p>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">Comprehensive Bike Checkups <span className="text-muted">for peace of mind.</span></h2>
              <p className="lead">Our comprehensive bike checkups ensure every part of your bike is in top condition.</p>
            </div>
            <div className="col-md-5">
              <img
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                src="image3.jpg"
                alt="Featurette 1"
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">Expert Repairs <span className="text-muted">that last.</span></h2>
              <p className="lead">Our expert repairs ensure your bike runs smoothly and reliably.</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                src="tire.jpg"
                alt="Featurette 2"
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">Custom Upgrades <span className="text-muted">to enhance your ride.</span></h2>
              <p className="lead">Enhance your bike with our custom upgrade services tailored to your needs.</p>
            </div>
            <div className="col-md-5">
              <img
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                src="image2.jpg"
                alt="Featurette 3"
              />
            </div>
          </div>

          <hr className="featurette-divider" />

        </Container>
      </main>
      
      <Footer />
    </>
  );
}

export default Home;
