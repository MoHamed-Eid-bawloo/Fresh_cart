import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./productsDetails.css";
import { toast, ToastContainer } from "react-toastify";
import { CreateContext } from "../Context/Context";
import ProductsBy from "../ProductsBy/ProductsBy";
import ProductsCat from "../productscat/ProductCat";
function ProductsDetails() {
  const [product, setProduct] = useState();
  let { id } = useParams();
  const headers = { token: localStorage.getItem("user") };
  const { setCountCartt } = useContext(CreateContext);

  let getProductDetails = async () => {
    try {
      let response = axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct((await response).data.data);
    } catch (error) {
      console.log(error);
    }
  };
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
    getProductDetails();
  }, [id]);
  if (product) {
    return (
      <section className="product-details overflow-hidden px-sm-0 px-3">
        <div className="container py-5 ">
          <div className="row g-4 pb-5 border border-2 border-black border-top-0 border-start-0 border-end-0">
            <div className=" col-lg-5">
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
              >
                <div
                  className={`carousel-indicators rounded w-fit m-0 mx-auto px-2 py-1 mb-2 flex-wrap`}
                >
                  <button
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide-to={0}
                    className={`active w-fit`}
                    aria-current="true"
                    aria-label={`Slide 1`}
                    style={{ height: "fit-content", textIndent: "0" }}
                  >
                    <img
                      src={product.imageCover}
                      alt=""
                      className={``}
                      style={{ width: "40px" }}
                    />
                  </button>
                  {product.images.map((elem, i) => {
                    return (
                      <button
                        key={i}
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide-to={i + 1}
                        className={`w-fit`}
                        aria-label={`Slide ${i + 2}`}
                        style={{ height: "fit-content", textIndent: "0" }}
                      >
                        <img
                          src={elem}
                          alt=""
                          className={``}
                          style={{ width: "40px" }}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active position-relative">
                    <img
                      src={product.imageCover}
                      className="d-block w-100"
                      alt={product.title}
                      style={{ objectFit: "cover", maxHeight: "500px" }} // Adjust height as needed
                    />
                  </div>

                  {product.images.map((elem, i) => (
                    <div key={i} className="carousel-item position-relative">
                      <img
                        src={elem}
                        className="d-block w-100"
                        alt={`Slide ${i + 1}`}
                        style={{ objectFit: "cover", maxHeight: "500px" }} // Adjust height as needed
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className=" col-lg-7 pt-5">
              <h2 className="title fw-bold h4">{product.title}</h2>
              <p className=" text-muted">{product.description}.</p>
              <p className={`category mb-2 h5`}>{product.category.name}</p>
              <div className="">
                <p className="brand">Brand : {product.brand.name}</p>
                <p className="quantity">Quantity : {product.quantity}</p>
                <div className="d-flex justify-content-between">
                  <p className="price">{product.price} EGP</p>
                  <span>
                    <i
                      className={`fa-solid fa-star me-1`}
                      style={{ color: "gold" }}
                    ></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
              <button
                className={`btn w-100 mt-4 position-relative z-0`}
                style={{ padding: "10px" }}
                onClick={() => AddProduct(product._id)}
              >
                Add to cart
                <i className="fa-solid fa-cart-shopping ms-2" />
              </button>
            </div>
          </div>
          <div className="related-products py-5 ">
            <h2
              className={` text-capitalize fw-bold mb-4 w-fit pb-3 position-relative`}
            >
              - related products ({product.category.name})
            </h2>
                    <div className="row g-5">
                        <ProductsCat id={product.category._id} />
            </div>
          </div>
        </div>
        <ToastContainer style={{ marginTop: "50px" }} />
      </section>
    );
  }
}

export default ProductsDetails;
