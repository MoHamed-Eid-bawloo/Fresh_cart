import "./Footer.css";
import amazonPay from "../../assets/Amazon_Pay_logo.svg.png";
import masterCard from "../../assets/master-card.png";
import payPal from "../../assets/PayPal-Logo.jpg";
import appStore from "../../assets/app-store.jpg";
import playStore from "../../assets/play-store.png";
import { memo } from "react";

function Footer() {
  return (
    <footer className=" py-5  position-relative">
      <div className="container">
        <h2 className="h4 text-capitalize fw-medium">get the freshCart app</h2>
        <p>
          we will send you a link to open it on your phone to download the app
        </p>
        <div className=" d-flex mail gap-3 mb-4">
          <input
            type="text"
            className={`mail-input form-control w-fit flex-grow-1`}
            placeholder="Email.."
          />
          <button>Share app link</button>
        </div>
        <div className="row m-0 border border-1 border-start-0 border-end-0 py-2 align-items-center">
          <ul className=" col-lg-6 list-unstyled  d-flex align-items-center mb-3 mb-lg-0">
            <h3 className=" h6 text-capitalize mb-0">payment parteners</h3>
            <li className={` mx-2 `}>
              <img src={amazonPay} alt="" style={{ width: "60px" }} />
            </li>
            <li className={` mx-2 `}>
              <img src={masterCard} alt="" style={{ width: "30px" }} />
            </li>
            <li className={` mx-2`}>
              <img src={payPal} alt="" style={{ width: "50px" }} />
            </li>
          </ul>
          <ul className="col-lg-6 list-unstyled d-flex align-items-center justify-content-lg-end mb-0 ">
            <h3 className="h6 text-capitalize mb-0 me-2 ">
              get deliveries with FreshCart
            </h3>
            <li className=" mx-1">
              <img src={appStore} alt="" style={{ width: "70px" }} />
            </li>
            <li className={` mx-1`}>
              <img src={playStore} alt="" style={{ width: "95px" }} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
