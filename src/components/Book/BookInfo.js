import React, { Fragment } from "react";

const BookInfo = ({ bookInfo }) => {
  return (
    <Fragment>
      {Object.values(bookInfo).length > 0 ? (
        <div>
          <h2>Book Details</h2>
          <p className="fw-bold">Title: {bookInfo.title}</p>
          <p className="fw-light">Description: {bookInfo.description}</p>
          <p className="fst-italic">Price: ${bookInfo.price}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
