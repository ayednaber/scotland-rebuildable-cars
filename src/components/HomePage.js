import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import CarCard from "./CarCard";
import '../basic.css';
import '../basic-responsive.css';
import '../main.css';
import '../main-responsive.css';
import './HomePage.css';
import scotlandLogo from '../graphics/logo.png';
import API_BASE_URL from "../config"; // Base URL for API requests

const HomePage = () => {
    const navigate = useNavigate();

    // State for car data, search, sorting, and loading/error states
    const [cars, setCars] = useState([]); // Cars fetched from backend
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [searchTerm, setSearchTerm] = useState(""); // Search term
    const [sortOption, setSortOption] = useState("latest"); // Sorting option

    // Fetch car data from the backend
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cars`);
                setCars(response.data); // Update the cars state with API data
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Filter cars based on the search term
    const filteredCars = useMemo(() => {
        return cars.filter((car) =>
            car.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, cars]);

    // Sort cars based on the selected option
    const sortedCars = useMemo(() => {
        const carsCopy = [...filteredCars];
        if (sortOption === "price-high-to-low") {
            carsCopy.sort((a, b) => b.price - a.price);
        } else if (sortOption === "price-low-to-high") {
            carsCopy.sort((a, b) => a.price - b.price);
        } else if (sortOption === "latest") {
            carsCopy.sort((a, b) => b.year - a.year);
        }
        return carsCopy;
    }, [filteredCars, sortOption]);

    // Display a loading or error state if necessary
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
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
                <nav id="mainMenu" role="navigation" >
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
            <div className="home-page">
                <div className="rebuildable-cars-header">
                    <h1 className="rebuildable-cars-h1">Rebuildable Cars</h1>
                </div>
                {/* Search Bar */}
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                        }}
                    />
                </div>
                {/* Sorting Dropdown */}
                <div className="sort-by-container">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                        }}
                    >
                        <option value="latest">Sort by Latest</option>
                        <option value="price-high-to-low">Price High to Low</option>
                        <option value="price-low-to-high">Price Low to High</option>
                    </select>
                </div>
                {/* Car Grid */}
                <div className="car-grid">
                    {sortedCars.map((car) => (
                        <CarCard key={car._id} car={car} onNavigate={navigate} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
