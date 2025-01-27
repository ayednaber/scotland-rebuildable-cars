import React, {useState} from "react";
import scotlandLogo from '../graphics/logo.png';
import './ManageRebuildableCars.css';
import AddCarForm from "./AddCarForm";
import EditCarsPage from "./EditCarsPage";

const ManageRebuildableCars = () => {
    const [manageState, SetManageState] = useState("add");

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

            <div className="manage-rebuildable-cars">
                <div className="rebuildable-cars-header">
                    <h1 className="rebuildable-cars-h1">Manage Rebuildable Cars</h1>
                </div>
                <div className="manage-rebuildable-cars-buttons">
                    <button
                        className={manageState === "add" ? "manage-btn-active" : "manage-btn"}
                        onClick={() => SetManageState("add")}>Add Cars</button>
                    <button
                        className={manageState === "edit" ? "manage-btn-active" : "manage-btn"}
                        onClick={() => SetManageState("edit")}>Edit/Delete Cars</button>
                </div>

                {manageState === "add" && (
                    <AddCarForm />
                )}
                {manageState === "edit" && (
                    <EditCarsPage />
                )}
            </div>
        </div>
    );
}

export default ManageRebuildableCars;