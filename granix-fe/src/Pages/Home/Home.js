import React from "react";
import "./Home.css";
import img1 from "../../assets/home-card-1.jpeg";
import img3 from "../../assets/home-card-2.png";
import img2 from "../../assets/Home-sec1.jpeg";
import { Link } from "react-router-dom";

import sofaCard from "../../assets/sofa-card.jpg";
import lshapeCard from "../../assets/lshape-card.jpg";
import coffeTabelCard from "../../assets/coffeetabel.jpeg";
import chairsCard from "../../assets/chairs-card.jpeg";
import bedCard from "../../assets/bed-card.jpeg";
import accessoriesCard from "../../assets/accessories-card.jpg";
import furnitureCard from "../../assets/furniture-card.jpg";
import natureCard from "../../assets/fromNature-card.jpg";
import aboutSec from "../../assets/handmadeabout.jpg";

function Home() {
  return (
    <main className="main">
      <section className="sec-1 bg-1">
        <div className="sec1-title">
          <h1 className="title">Granix</h1>
          <h3 className="subtitle-sec1">Nature’s Essence in Every Piece</h3>
        </div>
        <div className="sec1-card">
          <div className="card">
            <h5 className="card-head">
              Experience the Sublime: Handcrafted Pieces That Speak to Your
              Unique Taste.
            </h5>
            <Link to="/products" className="btn-card">
              Shop now
            </Link>
          </div>
          <div className="card-pics">
            <img src={img2} alt="img-1" className="card-img-2 ci" />
            <img src={img1} alt="img-1" className="card-img-1 ci" />
            <img src={img3} alt="img-1" className="card-img-1 ci" />
          </div>
        </div>
      </section>
      <section className="sec-2">
        <div className="sec2-title">
          <h2>shop by product</h2>
        </div>
        <div className="catigory">
          <div className="wood cat-card">
            <h4>Shop All</h4>
            <Link to="/products">
              <img
                src={furnitureCard}
                alt="img-card"
                className="product-card"
              />
            </Link>
          </div>
          <div className="wood cat-card">
            <h4>Coffee Tabels</h4>
            <Link to="/coffee-table">
              <img
                src={coffeTabelCard}
                alt="img-card"
                className="product-card"
              />
            </Link>
          </div>
          <div className="wood cat-card">
            <h4>Corner Lshape</h4>
            <Link to="/lshape">
              <img src={lshapeCard} alt="img-card" className="product-card" />
            </Link>
          </div>
          <div className="wood cat-card">
            <h4>Sofas</h4>
            <Link to="sofa">
              <img src={sofaCard} alt="img-card" className="product-card" />
            </Link>
          </div>
          <div className="wood cat-card">
            <h4>Chairs</h4>
            <Link to="chairs">
              <img src={chairsCard} alt="img-card" className="product-card" />
            </Link>
          </div>
          <div className="rock cat-card">
            <h4>Beds</h4>
            <Link to="bed">
              <img src={bedCard} alt="img-card" className="product-card" />
            </Link>
          </div>
          <div className="accessories cat-card">
            <h4>Accressories</h4>
            <Link to="accessories">
              <img
                src={accessoriesCard}
                alt="img-card"
                className="product-card"
              />
            </Link>
          </div>
          <div className="accessories cat-card">
            <h4>From Nature</h4>
            <Link to="nature">
              <img src={natureCard} alt="img-card" className="product-card" />
            </Link>
          </div>
        </div>
      </section>
      <section className="sec-3">
        <hr className="hr" />
        <div className="sec3-title">
          <h2>Designed for Your Lifestyle</h2>
        </div>
        <div className="sec3-body">
          <div className="sec3-img">
            <img src={aboutSec} alt="img-1" className="sec3-img-1" />
          </div>
          <div className="sec3-p">
            <p className="sec3-p1 p">
              At Granix, we believe that quality and craftsmanship go hand in
              hand. Each piece of furniture we create is meticulously designed
              and handcrafted by skilled artisans who are passionate about
              bringing your vision to life. Using only the finest materials, we
              ensure that every item is not just beautiful but also built to
              last. 
            </p>
            <p className="sec3-p2 p">
              We take pride in our commitment to sustainability and attention to
              detail. From selecting the perfect wood to the final polish, every
              step of the process is carried out with care and precision. Our
              handmade furniture is designed to be timeless, combining
              functionality with elegance. 
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
