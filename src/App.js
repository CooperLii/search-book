import "./App.css";
import Searchbox from "../src/components/HomePage/Searchbox";
import HomePage from "./components/HomePage/HomePage";
import Wishlist from "./components/Wishlist/Wishlist";
import { loadWishlist } from "./redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

function App() {
  const [toggle, setToggle] = React.useState(false);
  const onClickShow = () => setToggle(true);
  const onClickHide = () => setToggle(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWishlist());
  }, []);

  return (
    <div className="App">
      <header className="homePageHeader-section">
        <nav>
          <button className="btn-header" onClick={onClickHide}>
            Home
          </button>
          <button className="btn-header" onClick={onClickShow}>
            Show Wishlist
          </button>
        </nav>
        <Searchbox></Searchbox>
      </header>
      {toggle === false ? (
        <div className="homePage-section">
          <HomePage></HomePage>
          <Wishlist></Wishlist>
        </div>
      ) : (
        <div className="homePage-section">
          <Wishlist></Wishlist>
        </div>
      )}
    </div>
  );
}

export default App;
