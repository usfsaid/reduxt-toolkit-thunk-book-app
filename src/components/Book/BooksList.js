import React from "react";
import { useSelector } from "react-redux";

const BooksList = ({
  isLoadding,
  books,
  isLoggedIn,
  dispatch,
  deleteBook,
  readBook,
}) => {
  const { error } = useSelector((state) => state.books);
  const booklist =
    books.length > 0 ? (
      books.map((item) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={item.id}
        >
          <div>{item.title}</div>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isLoggedIn}
              onClick={() => dispatch(readBook(item))}
            >
              Read
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!isLoggedIn}
              onClick={() =>
                dispatch(deleteBook(item))
                  .unwrap()
                  .then((originalPromiseResult) => {
                    const message = document.createElement("div");
                    message.className = "alert alert-success";
                    message.role = "alert";
                    message.textContent = `${originalPromiseResult.title} is Deleted`;
                    document.body.appendChild(message);
                    setTimeout(() => {
                      document.body.removeChild(message);
                    }, 3000);
                  })
                  .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError);
                  })
              }
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <div className="alert alert-secondary" role="alert">
        There are no book, Please Add New Book
      </div>
    );
  return (
    <div>
      <h2>Books List</h2>
      {error ? (
        <div className="alert alert-secondary" role="alert">
          Server Faild get Books
        </div>
      ) : isLoadding ? (
        "Loadding..."
      ) : (
        <ul className="list-group">{booklist}</ul>
      )}
    </div>
  );
};

export default BooksList;
