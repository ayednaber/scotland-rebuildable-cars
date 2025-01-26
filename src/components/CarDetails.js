import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import carsData from "../data/carsData";
import scotlandLogo from '../graphics/logo.png';
import './CarDetails.css';

const CarDetails = () => {
    const { id } = useParams();
    const car = carsData.find((c) => c.id === parseInt(id));

    // State to manage the currently displayed image
    const [currentImage, setCurrentImage] = useState(car.images[0]);

    if (!car) {
        return <h1>Car Not Found</h1>;
    }

    return (
        <div>
            <header id="pgHeader">
                <div id="logoBlock">
                    <div className="container">
                        <a href="http://ScotlandAutoParts.ca">
                            <div className="logo"><img src={scotlandLogo} alt="Scotland Auto Parts" /></div>
                        </a>
                        <a href="http://ScotlandAutoParts.ca"><h1>Scotland Auto Parts</h1></a>
                    </div>
                </div>
                <nav id="mainMenu" role="navigation">
                    <input id="navCheck" type="checkbox" />
                    <div id="menuBtn">
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                    </div>
                    <ul className="nav">
                        <a href="http://ScotlandAutoParts.ca/inventory/retail.htm"><li>Search Inventory</li></a>
                        <a href="http://ScotlandAutoParts.ca/inventory/selector/outside/multi2.htm"><li>Search by Image</li></a>
                        <a href="http://ScotlandAutoParts.ca/inventory/shop.htm"><li>Multi-Part Search</li></a>
                        <a href="rebuildable-cars.html"><li>Rebuildable Cars</li></a>
                        <a href="map.html"><li>Map</li></a> 
                        <a href="mailto:scotlandautoparts@gmail.com"><li>Email Us</li></a>
                    </ul>
                </nav>
            </header>

            <div className="rebuildable-cars-header">
		        <h1 className="rebuildable-cars-h1">{car.name}</h1>
	        </div>

            <div className="back-to-listings">
                <Link className="back-link" to="/">←  Back to Listings</Link>
            </div>

            <div className="car-info">
                {/* Image Gallery Section */}
                <div className="car-images">
                    <div className="enlarged-image">
                        <img src={currentImage} alt={car.name} />
                    </div>
                    <div className="thumbnail-gallery">
                        {car.images.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt={`${car.name} thumbnail ${index + 1}`} 
                                onClick={() => setCurrentImage(img)} 
                                className={currentImage === img ? "active-thumbnail" : ""}
                            />
                        ))}
                    </div>
                </div>

                {/* Car Details Section */}
                <div className="car-information">
                    <h1 className="car-info-name">{car.name}</h1>
                    <h2 className="car-info-price">${car.price.toLocaleString()}</h2>
                    <p><span>Mileage:</span> {car.mileage}</p>
                    <p><span>Brand:</span> {car.brand}</p>
                    <p><span>Year:</span> {car.year}</p>
                    <br />
                    <p>Hello this is a sample description.</p>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
