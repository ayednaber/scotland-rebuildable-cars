import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CarDetails from "./components/CarDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/car/:id" element={<CarDetails />} />
            </Routes>
        </Router>
    );
}

export default App;