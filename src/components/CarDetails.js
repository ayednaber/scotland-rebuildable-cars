import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import scotlandLogo from '../graphics/logo.png';
import './CarDetails.css';
import API_BASE_URL from "../config"; // Import your base API URL

const CarDetails = () => {
    const { id } = useParams(); // Get the car ID from the URL
    const [car, setCar] = useState(null); // State to hold car data
    const [currentImage, setCurrentImage] = useState(""); // State for the current image
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    // Fetch car details from the backend
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cars/${id}`); // Fetch car by ID
                setCar(response.data); // Set car data
                setCurrentImage(response.data.images[0]); // Set the first image as default
                setLoading(false);
            } catch (err) {
                setError("Failed to load car details. Please try again later.");
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    // Show loading or error states
    if (loading) {
        return <p>Loading car details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // If the car is not found (null), display a message
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
                <Link className="back-link" to="/">← Back to Listings</Link>
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
                    <p>{car.description || "No description available."}</p>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
