import React from "react";
import Routes from "../routes/Index";
import Navbar from "./Navbar/Navbar";

export default props => {

    return (
        <div className="app">
            <Navbar />
            <>{Routes}</>
        </div>
    );
}
