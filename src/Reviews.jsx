import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import "./Styles/Review.css"; // Assuming your custom styles are in this file

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Steve Fonsi",
      designation: "Web Designer",
      review:
        "Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante.",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Jessica Rose",
      designation: "UI/UX Designer",
      review:
        "Suspendisse varius nibh non aliquet. Donec sagittis orci eu eros cursus, a posuere velit vulputate. Cras at nunc viverra, aliquet massa quis, consectetur magna.",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Agalya",
      designation: "Product Manager",
      review:
        "Sed porttitor sapien massa, vel fermentum orci efficitur sit amet. Ut commodo malesuada ipsum, ac pellentesque turpis posuere eget.",
      image: "https://via.placeholder.com/100",
    },
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#fff", // Full container background set to white
        padding: "20px",
        width: "100%", // Full width
      }}
    >
      <div style={{ maxWidth: "700px", width: "100%", position: "relative" }}>
        <h2 className="mb-3">Customer Reviews</h2>
        <p
          className="text-muted mb-4"
          style={{ fontSize: "20px", fontWeight: "400", color: "#333" }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          indicators={false} // Disable default indicators
          controls={false} // Disable default controls
          interval={null} // Disable auto sliding
          slide={true} // Enable smooth sliding transition
        >
          {reviews.map((review, idx) => (
            <Carousel.Item key={idx}>
              <div className="d-flex flex-column align-items-center">
                <div className="carousel-quote-circle"></div>
                <h5
                  className="text-warning mb-0"
                  style={{ fontSize: "20px", color: "#333" }}
                >
                  {review.name}
                </h5>
                <p
                  className="text-muted"
                  style={{
                    fontSize: "30px",
                    color: "#555",
                    marginBottom: "20px",
                  }}
                >
                  {review.designation}
                </p>
                <p
                  className="carousel-review-container"
                  style={{
                    fontSize: "17px",
                    color: "#111",
                    marginBottom: "10px",
                  }}
                >
                  {review.review}
                </p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Custom Buttons */}
        <Button
          variant="warning"
          onClick={() =>
            setIndex((index - 1 + reviews.length) % reviews.length)
          }
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "-50px",
            backgroundColor: "#FF6F00",
            borderColor: "#FF6F00",
            color: "white",
            fontSize: "18px",
          }}
        >
          &#8592;
        </Button>
        <Button
          variant="warning"
          onClick={() => setIndex((index + 1) % reviews.length)}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-50px",
            backgroundColor: "#FF6F00",
            borderColor: "#FF6F00",
            color: "white",
            fontSize: "18px",
          }}
        >
          &#8594;
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;
