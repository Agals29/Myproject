import React from "react";
import { Carousel } from "react-bootstrap"; // Import Carousel from react-bootstrap

// Image imports (replace with your actual image paths)
import img1 from "./img/images/slider-01.jpg";
import img2 from "./img/images/slider-02.jpg";
import img3 from "./img/images/slider-03.jpg";

function CarouselComponent() {
  const prevIcon = (
    <span aria-hidden="true" className="carousel-control-prev-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L6.707 7l4.647 4.646a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </span>
  );
  const nextIcon = (
    <span aria-hidden="true" className="carousel-control-next-icon custom-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height=""
        fill="white"
        className="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 8 4.646 3.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>
  );
  return (
    <div className="container-fluid">
      <div className="carousel-container">
        <Carousel
          fade
          controls
          indicators
          prevIcon={prevIcon}
          nextIcon={nextIcon}
        >
          {/* Slide 1 */}
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img1}
              alt="Slide 1"
            />
            <Carousel.Caption>
              <h1 className="carousel-heading">
                Welcome to Yamifood Restaurant
              </h1>
              <p>Experience culinary delights with a unique atmosphere.</p>

              <button className="carousel-button">Reservation</button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 2 */}
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img2}
              alt="Slide 2"
            />
            <Carousel.Caption>
              <h1 className="carousel-heading">
                {" "}
                Welcome to Discover Our Menu
              </h1>
              <p>A variety of delicious dishes awaits you.</p>
              <button className="carousel-button">Reservation</button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 3 */}
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img3}
              alt="Slide 3"
            />
            <Carousel.Caption>
              <h1 className="carousel-heading">
                {" "}
                Welcome to live dinner restuarant
              </h1>
              <p>
                Reserve your spot and enjoy an unforgettable dining experience.
              </p>
              <button className="carousel-button">Reservation</button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
export default CarouselComponent;
