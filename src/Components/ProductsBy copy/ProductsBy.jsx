import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateContext } from "../Context/Context";

function ProductsByBrand() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPendingWishlist, setIsPendingWishlist] = useState(false);
  const headers = { token: localStorage.getItem("user") };
  const { setCountCartt } = useContext(CreateContext);

  const getProductsByBrand = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${id}`
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsByBrand();
  }, [id]);

  const addProductToCart = async (productId) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      setCountCartt(response.data.numOfCartItems);
      toast.success("Added successfully to cart", {
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      toast.error("Error adding to cart", {
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  const addProductToWishlist = async (productId) => {
    setIsPendingWishlist(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      if (response.status) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, isWishlisted: true }
              : product
          )
        );
        toast.success("Added successfully to wishlist", {
          autoClose: 2000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error adding to wishlist", {
        autoClose: 2000,
        position: "top-right",
      });
    } finally {
      setIsPendingWishlist(false);
    }
  };

  const showResults =
    products && products.length > 0 ? (
      products.map((product) => (
        <div
          className="product-item col-xl-3 col-lg-4 col-sm-6"
          key={product._id}
        >
          <div className="position-relative z-0">
            <div className="inner h-100 d-flex flex-column justify-content-between p-2 rounded">
              <div className="header mb-3">
                <Link
                  to={`/productDetails/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={product.imageCover}
                    className="w-100 rounded mb-2"
                    alt={product.title}
                  />
                </Link>
                <h2 className="category h6 text-capitalize">
                  {product.category.name}
                </h2>
                <Link
                  to={`/productDetails/${product._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h3 className="title h5 text-nowrap overflow-hidden">
                    {product.title}
                  </h3>
                </Link>
              </div>
              <div className="footer">
                <div className="d-flex justify-content-between">
                  <p className="price">{product.price} EGP</p>
                  <span>
                    <i
                      className="fa-solid fa-star me-1"
                      style={{ color: "gold" }}
                    ></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn position-relative z-0"
                    onClick={() => addProductToCart(product._id)}
                  >
                    <p className="m-0">
                      Add to cart{" "}
                      <i className="fa-solid fa-cart-shopping ms-2" />
                    </p>
                  </button>
                  {isPendingWishlist ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse ms-auto" />
                  ) : (
                    <i
                      className="fa-solid fa-heart ms-auto"
                      style={{
                        color: product.isWishlisted ? "#2eb92e" : "#b0b0b0",
                        cursor: "pointer",
                      }}
                      title="Add to wishlist"
                      onClick={() => addProductToWishlist(product._id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products found.</p>
    );

  return (
    <>
      <div className="container">
        <div
          className="row g-5 justify-content-center"
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          {loading ? <p>Loading...</p> : showResults}
        </div>
        <ToastContainer style={{ marginTop: "50px" }} />
      </div>
    </>
  );
}

export default ProductsByBrand;
