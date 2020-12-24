import React from "react";
import './ErrorComp.css'

function ErrorComp({ errors }) {
  return (
    <div className="errorComp">
      {console.log(errors)}
      {errors && errors.map((error,id) => {
        return <div className="errorComp__body" key = {id}> {error}</div>;
      })}
    </div>
  );
}

export default ErrorComp;
