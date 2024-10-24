import React from "react";
import "./About.css";
import aboutImg from "../../assets/homemadeaboutpg.webp";

function About() {
  return (
    <div className="about-main">
      <div className="about-p">
        <p>
          At Granix, we are driven by a simple yet profound belief:
          the furniture in your home should be as unique as you are. Founded
          with a passion for craftsmanship and a dedication to high-quality
          materials, we specialize in creating bespoke furniture that marries
          form and function. Our skilled artisans handcraft every piece with the
          utmost care, ensuring that each item not only meets but exceeds our
          clients' expectations.
        </p>
        <p>
          {" "}
          What sets us apart is our attention to detail and our commitment to
          sustainable practices. We source premium, responsibly harvested
          materials, and every design is thoughtfully created with durability
          and aesthetics in mind. From custom-made tables to one-of-a-kind
          chairs, we aim to bring timeless beauty and lasting comfort to homes
          around the world. Join us in celebrating the art of handmade
          furniture, where every piece tells a story and is made to stand the
          test of time.
        </p>
      </div>
      <img src={aboutImg} alt="about-img" className="about-img" />
    </div>
  );
}

export default About;
