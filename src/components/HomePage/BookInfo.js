import React from "react";
import { useDispatch } from "react-redux";
import { addWishlist } from "../../redux/slices/wishlistSlice";

const BookInfo = ({ item }) => {
  const dispatch = useDispatch();

  const { authors, publisher, publishedDate, title, description } =
    item.volumeInfo;
  const thumbnail = item?.volumeInfo?.imageLinks?.thumbnail || "";
  return (
    <li
      className="book-cardView"
      onClick={() => {
        dispatch(addWishlist(item));
      }}
    >
      <div className="book-image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="bookinfo-container">
        <div className="bookinfo">
          <h2>{title}</h2>
        </div>
        <div className="bookinfo">
          <p>
            <b>Authors: </b>{" "}
            {authors !== undefined ? authors.join(", ") : "N/A"}
          </p>
        </div>
        <div className="bookinfo">
          <p>
            <b>Publisher: </b>
            {publisher !== undefined ? publisher : "N/A"}{" "}
          </p>
        </div>
        <div className="bookinfo">
          <p>
            <b> Published date: </b>{" "}
            {publishedDate !== undefined ? publishedDate : "N/A"}
          </p>
        </div>
        <div className="bookinfo description">
          <p>
            <b>Description: </b>{" "}
            {description !== undefined ? description : "N/A"}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BookInfo;
