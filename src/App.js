import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Wishlist from "./components/Wishlist/Wishlist";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const wishlist = useSelector((state) => state.wishlistSlice.wishlist);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="App">
      <HomePage></HomePage>
      <Wishlist></Wishlist>
    </div>
  );
}

export default App;
