import ProductsInMainPage from "../Others/ProductsInMainPage";
import "../../Css/NewGoods.css";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../useWindowSize.js";
import ProductsInMainPageFavorite from "../Others/ProductsInMainPageFavorite.jsx";
import { useEffect } from "react";
import { getHomeDataRequest } from "../../store/reducer/getHomeDataSlice.js";

const NewGoods = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const { home_data } = useSelector((state) => state.getHomeDataSlice);

  useEffect(() => {
    dispatch(getHomeDataRequest({}));
  }, [dispatch]);

  const data = home_data?.items_best_seller?.filter(
    (item) => item.new == 1 && item,
  );
  return (
    <div className="NewGoods">
      {windowSize.width > 1024 ? (
        <ProductsInMainPageFavorite style={{ margin: 0 }} products={data} />
      ) : (
        <ProductsInMainPage style={{ margin: 0 }} products={data} />
      )}
    </div>
  );
};

export default NewGoods;
