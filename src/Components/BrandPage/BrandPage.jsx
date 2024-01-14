import "../../Css/BrandPage.css";
import Navbar from "../../Components/Header/Navbar";
import Footer from "../../Components/Footer/Footer";
import Brands from "../HomePage/Brands";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBrandsRequest } from "../../store/reducer/getAllBrandsSlice";

const BrandPage = () => {
  const dispatch = useDispatch();
  const { all_brands_data } = useSelector((state) => state.getAllBrandsSlice);

  useEffect(() => {
    dispatch(getAllBrandsRequest({}));
  }, [dispatch]);

  return (
    <section className="BrandPage__container">
      <Brands brands={all_brands_data?.brands} style={{ margin: 0 }} />
    </section>
  );
};

export default BrandPage;
