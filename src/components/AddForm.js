import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertBooks } from "../store/bookSlice";

const Addform = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  // refs
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
    };
    dispatch(insertBooks(bookData));
    titleRef.current.value = null;
    priceRef.current.value = null;
    descriptionRef.current.value = null;
  };
  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              ref={titleRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              ref={priceRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="Description"
              rows="3"
              required
              ref={descriptionRef}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
