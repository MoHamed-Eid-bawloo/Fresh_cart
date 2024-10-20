import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "./Home.css"
import axios from "axios";
import Products from "../Product/Product";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Home() {
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
    useEffect(() => {
      getCategories();
    }, []);
 const settings = {
   dots: true,
   infinite: true,
   slidesToShow: 4,
   slidesToScroll: 2,
   autoplay: true,
   autoplaySpeed: 2000,
   responsive: [
     {
       breakpoint: 992,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 2,
         infinite: true,
         dots: true,
       },
     },
     {
       breakpoint: 768,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 2,
         infinite: true,
         dots: true,
       },
     },
     {
       breakpoint: 576,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
         infinite: true,
         dots: true,
       },
     },
   ],
 };

  return (
    <>
      <section className="home px-sm-0 px-3 overflow-hidden">
        <div className="container py-5 ">
          <div className=" py-4 mb-5">
            <div className="slider-container">
              <h2 className=" text-capitalize mb-4 ps-3" style={{color:"green"}}>
                shop popular categories
              </h2>
              {loading!==true ? (
                <Slider {...settings}>
                  {categories.data.map((elem) => (
                    <div key={elem._id} style={{ width: 300 }}>
                      <Link
                        to={`/productsBy/categories/${elem._id}`}
                        style={{ color: "black" }}
                      >
                        <div className=" p-2">
                          <img
                            src={elem.image}
                            className={`w-100 rounded`}
                            alt=""
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              ) : (
                ""
              )}
            </div>
          </div>
          <Products />
        </div>
      </section>
    </>
  );
}

export default Home;
