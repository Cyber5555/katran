/* eslint-disable react-hooks/exhaustive-deps */
import ProductsInMainPage from "../Others/ProductsInMainPage";
import "../../Css/Favorites.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import ProductsInMainPageFavorite from "../Others/ProductsInMainPageFavorite.jsx";
import useWindowSize from "../useWindowSize.js";
import { removeFavoriteRequest } from "../../store/authReducer/removeFavoriteSlice.js";

const Favorites = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const [favoriteData, setFavoriteData] = useState([]);
  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );
  const { favorites_count } = useSelector((state) => state.updateCountsSlice);

  const userToken = localStorage.getItem("userToken");
  let storedFavorites = [];

  useEffect(() => {
    try {
      storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
    }
    let fav = userToken ? auth_favorites_data : storedFavorites;
    setFavoriteData(fav);
  }, [localStorage.getItem("favorites"), auth_favorites_data, favorites_count]);

  useEffect(() => {
    if (userToken) {
      dispatch(getFavoriteRequest({}));
    }
  }, [dispatch, userToken]);

  const handleRemoveFavorite = (event, removedItemId) => {
    event.stopPropagation();
    if (userToken) {
      dispatch(removeFavoriteRequest({ item_id: removedItemId }));
      dispatch(getFavoriteRequest({}));
    } else {
      const updatedFavorites = favoriteData.filter(
        (item) => item.id !== removedItemId
      );
      setFavoriteData(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <>
      {windowSize.width > 1024 && userToken ? (
        <ProductsInMainPageFavorite
          products={favoriteData}
          onRemoveFavorite={handleRemoveFavorite}
        />
      ) : (
        <ProductsInMainPage
          products={favoriteData}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </>
  );
};

export default Favorites;
