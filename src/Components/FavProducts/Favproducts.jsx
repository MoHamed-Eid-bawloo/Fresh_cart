import React, { useState, useEffect, useRef, useContext } from "react";
import axios, { Axios } from "axios";
import "./favProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateContext } from "../Context/Context";
import { Link } from "react-router-dom";
function Favproducts() {
  const inputRef = useRef();
  const [allProducts, setProducts] = useState([]);
  const headers = { token: localStorage.getItem("user") };
  const { setCountCartt } = useContext(CreateContext);
  async function getProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: headers }
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
  useEffect(() => {
    getProducts();
  }, []);

  async function RemoveProduct(id) {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: headers }
      );
      getProducts();
      console.log(response.data);
      toast.success(`Product deleted successfully`);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete the product.");
    }
  }

  const ShowResults =
    allProducts && allProducts.length > 0 ? (
      allProducts.map((product) => (
        <div
          className="product-item  col-xl-3 col-lg-4 col-sm-6"
          key={product._id}
        >
          <div className="position-relative z-0">
            <div className="inner h-100 d-flex flex-column justify-content-between p-2 rounded">
              <div className="header mb-3">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="btn btn-add position-relative z-0"
                    onClick={() => AddProduct(product._id)}
                    style={{
                      padding: "10px 15px",
                      borderRadius: "5px",
                    }}
                  >
                    <p className="m-0">
                      Add to cart
                      <i className="fa-solid fa-cart-shopping ms-2" />
                    </p>
                  </button>

                  <button
                    className="btn btn-remove position-relative z-0"
                    style={{
                      marginTop: "10px",
                      padding: "10px 15px",
                      background:
                        "rgb(182, 12, 12)" /* Red background for 'Remove' */,
                      color: "white",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                    onClick={() => RemoveProduct(product._id)}
                  >
                    <p className="m-0">
                      Remove
                      <i className="fa-solid fa-trash ms-2" />
                    </p>
                  </button>
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
          <h2 style={{ color: "green", fontSize: "35px", fontStyle: "italic" }}>
            Your favourite products:
          </h2>
          {ShowResults}
        </div>
        <ToastContainer style={{ marginTop: "50px" }} />
      </div>
    </>
  );
}

export default Favproducts;
