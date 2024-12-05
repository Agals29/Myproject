import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Styles/Photos.css"; // Assuming your CSS is saved in this file

// Import your images
import image1 from "./img/images/gallery-img-01.jpg";
import image2 from "./img/images/gallery-img-02.jpg";
import image3 from "./img/images/gallery-img-03.jpg";
import image4 from "./img/images/gallery-img-04.jpg";
import image5 from "./img/images/gallery-img-05.jpg";
import image6 from "./img/images/gallery-img-06.jpg";

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(null);

  // Array of images
  const images = [image1, image2, image3, image4, image5, image6];

  // Handle image click to set active state
  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  return (
    <Container className="gallery-container">
      {/* Heading and Paragraph */}
      <div className="text-section">
        <h2 className="gallery-heading">Gallery</h2>
        <p className="gallery-paragraph">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Grid Layout for Images */}
      <Row className="g-4 justify-content-center images-section mt-4">
        {images.map((image, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <div className="image-wrapper">
              <Image
                src={image}
                fluid
                className={`gallery-image ${
                  activeImage === index ? "active" : ""
                }`}
                onClick={() => handleImageClick(index)}
                alt={`Gallery Image ${index + 1}`}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
