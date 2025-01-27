import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./AddCarForm.css";

const AddCarForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        mileage: "",
        brand: "",
        year: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [message, setMessage] = useState("");

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload images
            const imageData = new FormData();
            images.forEach((image) => imageData.append("images", image));

            const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, imageData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const imageUrls = uploadResponse.data.imageUrls;

            // Submit car details with image URLs
            const response = await axios.post(`${API_BASE_URL}/cars`, {
                ...formData,
                images: imageUrls,
            });

            setMessage("Car added successfully!");
            setFormData({ name: "", price: "", mileage: "", brand: "", year: "", description: "" });
            setImages([]);
            setImagePreviews([]);
        } catch (err) {
            setMessage("Error adding car. Please try again.");
        }
    };

    return (
        <div className="add-car-form">
            <h1>Add a New Car</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Car Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="mileage"
                    placeholder="Mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <input type="file" multiple onChange={handleImageChange} />
                <div className="image-previews">
                    {imagePreviews.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index}`} />
                    ))}
                </div>
                <button type="submit" className="add-car-btn">Add Car</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCarForm;
