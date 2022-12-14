import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import Product from "./Product";
import Loading from "../components/Loading";

const FeaturedProducts = () => {
  const products = useSelector((state) => state.allProducts.products);
  const featuredProduct = products.slice(0, 6);
  const renderList = featuredProduct.map((product) => {
    return <Product detail={product} key={product._id} />;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(0, 6, "", "", ""));
  }, []);

  return (
    <>
      <section className="section featured">
        <div className="title">
          <span />
          <h2>Featured Materials</h2>
          <span />
        </div>
        {Object.keys(products).length === 0 ? (
          <Loading />
        ) : (
          <div className="section-center featured-center">{renderList}</div>
        )}

        <Link to="/products" className="btn">
          {" "}
          all materials{" "}
        </Link>
      </section>
    </>
  );
};

export default FeaturedProducts;
