import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config"; // Replace with your API base URL
import "./EditCarsPage.css";

const EditCarsPage = () => {
    const [cars, setCars] = useState([]); // State to store cars
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [notification, setNotification] = useState(null); // Notification message

    useEffect(() => {
        // Fetch all cars from the database
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cars`);
                setCars(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch cars. Please try again later.");
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this car?");
        if (!confirm) return;

        try {
            await axios.delete(`${API_BASE_URL}/cars/${id}`);
            setCars(cars.filter((car) => car._id !== id)); // Remove deleted car from state
            setNotification({ type: "success", message: "Car deleted successfully!" });
        } catch (err) {
            setNotification({ type: "error", message: "Failed to delete the car. Please try again." });
        }
    };

    // Handle Edit
    const handleEdit = async (id, updatedCar) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/cars/${id}`, updatedCar);
            setCars(cars.map((car) => (car._id === id ? response.data : car))); // Update car in state
            setNotification({ type: "success", message: "Car updated successfully!" });
        } catch (err) {
            setNotification({ type: "error", message: "Failed to update the car. Please try again." });
        }
    };

    // Clear Notification after 5 seconds
    useEffect(() => {
        if (notification) {
            const timeout = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [notification]);

    if (loading) {
        return <p>Loading cars...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="edit-cars-page">
            <div className="page-header">
                <h1>Your Current Available Cars</h1>
            </div>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            {cars.map((car) => (
                <CarEditForm key={car._id} car={car} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
};

const CarEditForm = ({ car, onEdit, onDelete }) => {
    const [formData, setFormData] = useState({ ...car });
    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(car._id, formData); // Call the parent onEdit function
        setEditing(false);
    };

    return (
        <div className="car-edit-form">
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div className="car-details-not-editing">
                    <img src={car.images[0]} alt={car.name} className="edit-car-img" />
                    <h3 className="car-name">{car.name}</h3>
                    <p>Price: ${car.price}</p>
                    <p>Mileage: {car.mileage}</p>
                    <p>Brand: {car.brand}</p>
                    <p>Year: {car.year}</p>
                    <p>{car.description}</p>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(car._id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default EditCarsPage;
