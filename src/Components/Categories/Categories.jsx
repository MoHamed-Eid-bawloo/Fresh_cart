import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./categories.css";

function Categories() {
  let [categories, setCategories] = useState(null);
  let [loading, setLoading] = useState(true);

  let getCategories = async () => {
    try {
      let response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let catRef = useRef([]);

  function showScroll() {
    for (let i = 0; i < catRef.current.length; i++) {
      if (
        window.scrollY >
        catRef.current[i].offsetTop - window.innerHeight + 100
      ) {
        catRef.current[
          i
        ].style.cssText = `opacity : 1;transform : translateY(0px);`;
      }
    }
  }

  useEffect(() => {
    if (categories) {
      showScroll();
      window.addEventListener("scroll", showScroll);

      return () => {
        window.removeEventListener("scroll", showScroll);
      };
    }
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="categories py-5 px-2 px-sm-0 overflow-hidden">
          <div className="container">
            <h2 className="h1 text-center text-capitalize mb-5">categories</h2>
            <div className="row g-5">
              {categories.data.map((elem, i) => (
                  <div key={elem._id} className=" col-lg-4 col-sm-6">
                  <Link
                    to={`/productsBy/categories/${elem._id}`}
                    style={{ color: "black",textDecoration:"none" }}
                  >
                    <div
                      className="inner shadow rounded overflow-hidden"
                      ref={(l) => (catRef.current[i] = l)}
                      style={{ opacity: "0", transform: "translateY(40px)" }}
                    >
                      <img
                        src={elem.image}
                        className={` w-100 object-fit-cover`}
                        alt={elem.name}
                      />
                              <h2 className=" text-center p-2">{elem.name}</h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Categories;
