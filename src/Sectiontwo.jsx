import React from "react";
// Assuming we have external CSS for styles
 // Replace with your actual image path
import Img from "./img/images/about-img.jpg"; // Replace with your actual image path

const RestaurantWelcome = () => {
  return (
    <div className="container-fluid">
      <div className="restaurant-section">
        <div className="content-left">
          <h1>
            Welcome To <span className="highlight">Live Dinner Restaurant</span>
          </h1>
          <h3>Little Story</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque auctor suscipit feugiat. Ut at pellentesque ante, sed
            convallis arcu. Nullam facilisis, eros in eleifend luctus, odio ante
            sodales augue, eget lacinia lectus erat et sem.
          </p>
          <p>
            Sed semper orci sit amet porta placerat. Etiam quis finibus eros.
            Sed aliquam metus lorem, a pellentesque tellus pretium a. Nulla
            placerat elit in justo vestibulum, et maximus sem pulvinar.
          </p>
          <button className="reservation-btn">RESERVATION</button>
        </div>
        <div
          className="content-right"
          style={{
            width: "100px",
            height: "400px",
            backgroundColor: "#ff6600",
          }}
        >
          <img src={Img} alt="Pizza" className="pizza-image" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantWelcome;
