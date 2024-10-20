import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateContext } from "../Context/Context";
import { Link } from "react-router-dom";
export let countOfCart = 0;

function Cart() {
  let headers = { token: localStorage.getItem("user") };

  const [loading, setLoading] = useState(false);
  const [userCart, setUserCart] = useState({ products: [] }); // Initialize with an empty array
  const [countCart, setCountCart] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  let { setCountCartt, CountCartt } = useContext(CreateContext);

  const notifyError = (message) => {
    toast.error(message, {
      autoClose: 2000,
      position: "top-right",
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      autoClose: 2000,
      position: "top-right",
    });
  };

  const getUserCart = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: headers }
      );
      setCountCartt(response.data.numOfCartItems); // تحديث القيمة في الـ context
      setCountCart(response.data.numOfCartItems);
      setUserCart(response.data.data);
      setTotalCartPrice(response.data.data.totalCartPrice);
    } catch (error) {
      console.error("Error fetching cart data", error);
      notifyError("Failed to fetch cart data. Please try again.");
      setUserCart({ products: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  async function DeleteProduct(id) {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: headers }
      );

      if (response.status === 200 && response.data.status === "success") {
        let updatedProducts = userCart.products.filter(
          (ele) => ele.product._id !== id
        );
        setCountCartt(response.data.numOfCartItems); // تحديث القيمة في الـ context
        console.log("CountCartt after update:", response.data.numOfCartItems);
        setUserCart({ ...userCart, products: updatedProducts });
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCountCart(response.data.numOfCartItems);
        notifySuccess(`Product deleted successfully`);
      } else {
        notifyError("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      notifyError("Failed to delete the product.");
    }
  }

  async function updateProductQuantity(id, count) {
    try {
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      );
      if (response.status === 200) {
        setUserCart(response.data.data);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCountCart(response.data.numOfCartItems);
        setCountCartt(response.data.numOfCartItems); // تحديث القيمة في الـ context
        console.log("CountCartt after update:", response.data.numOfCartItems);
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
      notifyError("Failed to update the quantity.");
    }
  }

  async function ClearCart() {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      if (response.status === 200) {
        getUserCart();
        notifySuccess(`Your Cart is cleared now`);
      } else {
        notifyError("Failed to clear your cart.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      notifyError("Failed to clear your cart.");
    }
  }

  async function Payment(cartId) {
    if (!cartId) {
      notifyError("No cart available for payment.");
      return;
    }

    try {
      let ShippingAddress = {
        details: "okay",
        phone: "000",
        city: "bns",
      };

      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: ShippingAddress },
        { headers: headers }
      );

      if (response?.data?.status === "success") {
        window.location.href = response.data.session.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        notifyError("Failed to proceed to payment. Please check your cart.");
      } else {
        notifyError("An error occurred. Please try again.");
      }
    }
  }

  if (loading) {
    return <div>Loading cart...</div>;
  }

  let ShowResultsOfCart =
    userCart.products && userCart.products.length > 0 ? (
      userCart.products.map((elem) => {
        return (
          elem.product && (
            <tr key={elem._id} className="prod border-bottom border-secondary">
              <td className="py-3 px-2 text-start align-middle">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/productDetails/${elem.product._id}`}
                >
                  <img
                    src={elem.product.imageCover}
                    className="rounded"
                    alt={elem.product.name}
                  />
                </Link>
              </td>
              <td className="py-3 px-2 fs-5 align-middle text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <span
                    className="plus bg-light rounded-circle d-inline-flex justify-content-center align-items-center ms-2"
                    onClick={() =>
                      updateProductQuantity(elem.product._id, elem.count + 1)
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </span>
                  <span>{elem.count}</span>
                  <span
                    className="minus bg-light rounded-circle d-inline-flex justify-content-center align-items-center me-2"
                    onClick={() =>
                      updateProductQuantity(elem.product._id, elem.count - 1)
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </div>
              </td>
              <td
                style={{ color: "green" }}
                className="py-3 px-2 fs-5 align-middle text-center"
              >
                {elem.price} EGP
              </td>
              <td className="py-3 px-2 text-center align-middle">
                <button
                  className="btn btn-danger text-capitalize"
                  onClick={() => DeleteProduct(elem.product._id)}
                >
                  Remove
                  <i className="fa-solid fa-trash ms-2" />
                </button>
              </td>
            </tr>
          )
        );
      })
    ) : (
      <tr>
        <td colSpan="4" className="text-center">
          No items in cart
        </td>
      </tr>
    );

  return (
    <div
      className="cart container"
      style={{ marginTop: "70px", marginBottom: "40px" }}
    >
      <h2 style={{ fontSize: "30px", color: "green" }}>Your Cart</h2>
      {userCart.products.length > 0 ? (
        <div>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            Number of items: <span style={{ color: "green" }}>{countCart}</span>
          </p>
          <div className="fs-5 mb-4">
            Total price:
            <span className="text-green fw-bold ms-3">
              {totalCartPrice} EGP
            </span>
          </div>
          <div className="fs-5 mb-4">
            <button
              className="btn btn-danger text-capitalize"
              onClick={ClearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped mt-4">
              <thead className="text-center">
                <tr>
                  <th className="py-3">Product</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>{ShowResultsOfCart}</tbody>
            </table>
          </div>
          <div className="d-flex justify-content-right">
            <button
              onClick={() => Payment(userCart._id)}
              className="btn btn-primary text-capitalize"
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
      <ToastContainer style={{ paddingTop: "50px" }} />
    </div>
  );
}

export default Cart;
