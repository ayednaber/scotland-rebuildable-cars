import React from "react";

const CarCard = ({ car, onNavigate }) => {
    return (
        <div className="car-card" onClick={() => onNavigate(`/car/${car.id}`)}>
            <img src={car.images[0]} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Price: ${car.price.toLocaleString()}</p>
            <p>Mileage: {car.mileage}</p>
            <p>Brand: {car.brand}</p>
            <p>Year: {car.year}</p>
        </div>
    );
};

export default CarCard;
