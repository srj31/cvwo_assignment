import React from 'react';
import "./IntroPage.css"

function IntroPage(props) {
    return (
        <div className="introPage container">
            <h1 style={{color: "#FFE400"}}> Welcome to DoTO </h1>
            <div className="introPage__body">
                This is a CRUD application using Rails on the Backend and React as the Frontend
            </div>
        </div>
    );
}

export default IntroPage;