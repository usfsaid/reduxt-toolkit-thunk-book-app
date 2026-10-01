import React, { Fragment, useEffect } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import "./book.css";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook, readBook } from "../../store/bookSlice";

const PostContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoadding, books, bookInfo } = useSelector((state) => {
    return state.books;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoadding={isLoadding}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            readBook={readBook}
            dispatch={dispatch}
          />
        </div>
        <div className="col side-line">
          <BookInfo bookInfo={bookInfo} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
