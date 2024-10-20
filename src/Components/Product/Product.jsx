import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./Product.css";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateContext } from "../Context/Context";
import { Link } from "react-router-dom";

function Products() {
  const inputRef = useRef();
  const [allProducts, setProducts] = useState([]);
  const [isPendingWishlist, setIsPendingWishlist] = useState(false); // Add this state for loading
  const headers = { token: localStorage.getItem("user") };
  const { setCountCartt } = useContext(CreateContext);

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Error fetching products");
    }
  }

  async function AddProduct(productId) {
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      setCountCartt(response.data.numOfCartItems);
      if (response.status) {
        toast.success(`Added successfully to cart`, {
          autoClose: 2000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(`Wait To the Last Added Done`, {
        autoClose: 2000,
        position: "top-right",
      });
    }
  }
async function AddProductToFav(productId) {
  setIsPendingWishlist(true); // بدء التحميل
  try {
    let response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      { headers }
    );
    if (response.status) {
      // افترض هنا إننا عايزين نعرف إذا كان المنتج تم إضافته للـ wishlist أو لا
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, isWishlisted: true } // أضف خاصية isWishlisted
            : product
        )
      );
      toast.success(`Added successfully to wishlist`, {
        autoClose: 2000,
        position: "top-right",
      });
    }
  } catch (error) {
    toast.error(`Wait To the Last Added Done`, {
      autoClose: 2000,
      position: "top-right",
    });
  } finally {
    setIsPendingWishlist(false); // انتهاء التحميل
  }
}


  useEffect(() => {
    getProducts();
  }, []);

  const ShowResults =
    allProducts && allProducts.length > 0 ? (
      allProducts.map((product) => (
        <div
          className="product-item col-xl-3 col-lg-4 col-sm-6"
          key={product._id}
        >
          <div className="position-relative z-0">
            <div className="inner h-100 d-flex flex-column justify-content-between p-2 rounded">
              <div className="header mb-3">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/productDetails/${product._id}`}
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
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/productDetails/${product._id}`}
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
                    onClick={() => AddProduct(product._id)}
                  >
                    <p className="m-0">
                      Add to cart
                      <i className="fa-solid fa-cart-shopping ms-2" />
                    </p>
                  </button>
                  {isPendingWishlist ? (
                    <i
                      className={`fa-solid fa-spinner fa-spin-pulse ms-auto`}
                    />
                  ) : (
                    <i
                      className={`fa-solid fa-heart ms-auto`}
                      style={{
                        color: product.isWishlisted ? "#2eb92e" : "#b0b0b0", // Use isWishlisted state
                        cursor: "pointer",
                      }}
                      title="add to wishlist"
                      onClick={() => AddProductToFav(product._id)}
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
          {ShowResults}
        </div>
        <ToastContainer style={{ marginTop: "50px" }} />
      </div>
    </>
  );
}

export default Products;
