import logo from "../../assets/logo.png";
import instagram from "../../assets/instagram logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CreateContext } from "../Context/Context";
function NavBar() {
  let [navColor, setNavColor] = useState("#fff");
  let navRef = useRef("");
  let { CountCartt } = useContext(CreateContext);

  let navigate = useNavigate();

  function scrollNav() {
    if (window.scrollY > 60) setNavColor("#eefff1");
    else if (window.scrollY <= 60) setNavColor("#fff");
  }
  function HandleLogout() {
    window.localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollNav);
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg  fixed-top`}
        ref={navRef}
        style={{ backgroundColor: navColor, transition: "0.3s" }}
      >
        <div className="container flex-wrap">
          <a className={`navbar-brand `} href="/">
            <img src={logo} alt="" />
            <h1 className="h3 fw-bold m-0 d-inline-block align-middle">
              FreshCart
            </h1>
          </a>

          {window.localStorage.getItem("user") && (
            <button
              id="humburger-toggler"
              className="navbar-toggler collapsed p-2 rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div
                id="humburger-bar"
                className="d-flex flex-column justify-content-center position-relative"
              >
                <span className="bar-top position-absolute rounded" />
                <span className="bar-middle rounded" />
                <span className="bar-bottom position-absolute rounded" />
              </div>
            </button>
          )}

          <div className="sign ms-4 order-lg-3">
            <div className="w-fit mx-auto">
              {!localStorage.getItem("user") && (
                <>
                  <Link to="/login" className="button-link btn mx-2 text-white">
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="button-link btn btn-outline-dark "
                  >
                    register
                  </Link>
                </>
              )}

              {localStorage.getItem("user") && (
                <>
                  <Link
                    className="logout btn btn-outline-dark button-link"
                    onClick={HandleLogout}
                  >
                    Log out
                  </Link>
                  <span
                    className=" ms-2 fw-bold"
                    style={{
                      color: "#25ad25",
                    }}
                  >
                    Hi {window.localStorage.getItem("userName")}
                  </span>
                </>
              )}
            </div>
          </div>

          {localStorage.getItem("user") && (
            <div
              className="collapse navbar-collapse order-lg-2"
              id="navbarSupportedContent"
            >
              <div className=" py-lg-0 py-3  d-lg-flex align-items-center flex-grow-1">
                <ul className="navbar-nav me-auto mb-4 mb-lg-0  text-capitalize ">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/cart">
                      Cart
                      <span
                        className="no-cart position-absolute xy-center top-0 end-0 rounded-circle"
                        style={{ width: 18, height: 18 }}
                      >
                        {CountCartt || 0} {/* استخدم 0 كقيمة افتراضية */}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favs">
                      Favs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      brands
                    </Link>
                  </li>
                </ul>
                <div className="links">
                  <h5 className=" text-capitalize fst-italic fw-bold d-lg-none">
                    social
                  </h5>
                  <ul className=" list-unstyled d-flex mb-0">
                    <li className=" me-2 fs-5 " title="Instagram">
                      <a
                        href="https://www.instagram.com/muhammed_el.sayed/"
                        className="xy-center"
                        target="_blank"
                      >
                        <img src={instagram} className=" w-100" alt="" />
                      </a>
                    </li>
                    <li className=" mx-1 fs-5 xy-center" title="Facebook">
                      <a
                        href="https://www.facebook.com/"
                        className="xy-center"
                        style={{ color: "#1877F2" }}
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path
                            fill="#125bd9"
                            d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                          />
                        </svg>{" "}
                      </a>
                    </li>
                    <li className=" mx-2 fs-5 xy-center" title="Linkedin">
                      <a
                        href="https://www.linkedin.com/in/mohammad-eid-el-sayed-7270a2287/"
                        className="xy-center"
                        style={{ color: "#0077B5" }}
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "20px", height: "20px" }}
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#105ada"
                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                          />
                        </svg>{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { CreateContext } from "../Context/Context";

// function NavBar() {
//   const { CountCartt } = useContext(CreateContext); // استخدام CountCartt من الـ Context

//   return (
//     <nav>
//       <Link className="nav-link position-relative" to="/cart">
//         cart
//         <span
//           className="no-cart position-absolute xy-center top-0 end-0 rounded-circle"
//           style={{ width: 18, height: 18 }}
//         >
//           {CountCartt} {/* عرض قيمة CountCartt هنا */}
//         </span>
//       </Link>
//     </nav>
//   );
// }

// export default NavBar;
