import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateContext } from "../Context/Context";
import { Link } from "react-router-dom";

function ProductsBy() {
  let { id } = useParams();
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [isPendingWishlist, setIsPendingWishlist] = useState(false);
  const headers = { token: localStorage.getItem("user") };
  const { setCountCartt } = useContext(CreateContext);

  let getProductsByCategory = async () => {
    try {
      let response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, [id]);

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
        // تحديث حالة isWishlisted للمنتج
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

  const ShowResults =
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
                        color: product.isWishlisted ? "#2eb92e" : "#b0b0b0",
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
          {loading ? <p>Loading...</p> : ShowResults}
        </div>
        <ToastContainer style={{ marginTop: "50px" }} />
      </div>
    </>
  );
}

export default ProductsBy;
