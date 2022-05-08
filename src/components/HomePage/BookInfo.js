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
      onClick={() => {
        dispatch(addWishlist(item));
      }}
    >
      <div>
        <img src={thumbnail} alt={title} />
      </div>
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <p>
            <b>Authors: </b>{" "}
            {authors !== undefined ? authors.join(", ") : "N/A"}
          </p>
        </div>
        <div>
          <p>
            <b>Publisher: </b>
            {publisher !== undefined ? publisher : "N/A"}{" "}
          </p>
        </div>
        <div>
          <p>
            <b> Published date: </b>{" "}
            {publishedDate !== undefined ? publishedDate : "N/A"}
          </p>
        </div>
        <div>
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
