import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Container = ({ children }) => {
  const { error } = useSelector((state) => state.books);
  return (
    <Fragment>
      <div className="container">
        {error && (
          <div class="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
        {children}
      </div>
    </Fragment>
  );
};

export default Container;
