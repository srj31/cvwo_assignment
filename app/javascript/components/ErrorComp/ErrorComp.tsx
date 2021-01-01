import React from "react";
import "./ErrorComp.css";
import {Error} from '../types'

interface ErrorCompProps {
  errors?: Array<Error>
}

const ErrorComp: React.FC<ErrorCompProps> = ({errors}) => {
  return (
    <div className="errorComp">
      {errors &&
        errors.map((error, id) => {
          return (
            <div className="errorComp__body" key={id}>
              {" "}
              {error}
            </div>
          );
        })}
    </div>
  );
};

export default ErrorComp;
