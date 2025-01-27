import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CarDetails from "./components/CarDetails";
import ManageRebuildableCars from "./components/ManageRebuildableCars";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/car/:id" element={<CarDetails />} />
                <Route path="/manageRebuildableCars" element={<ManageRebuildableCars />} />
            </Routes>
        </Router>
    );
}

export default App;