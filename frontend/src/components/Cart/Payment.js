import React, { useRef, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import CheckOutSteps from "./CheckOutSteps";
import { useDispatch } from "react-redux";
import { clearAlert, showAlert } from "../../features/Alert/alertSlice";
import Loader from "../Loader";
import { clearErrors } from "../../features/Order/orderSlice";

function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (elements == null) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setLoading(false);
        // Show error to your customer
        dispatch(
          showAlert({
            message: "There was some error while processing payment",
            type: "error",
          })
        );
        setTimeout(() => {
          dispatch(clearAlert());
        }, 100);
        return;
      }

      const response = await fetch(
        `/api/v1/payment/process`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(paymentData),
        }
      );
      const data = await response.json();

      const client_secret = data?.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `http://localhost:3000/payment/success`,
        },
      });

      setLoading(false);
      if (result.error) {
        setLoading(false);
        dispatch(showAlert({ message: result.error.message, type: "error" }));
        dispatch(clearErrors());
        setTimeout(() => {
          dispatch(clearAlert());
        }, 100);
      } else {
        setLoading(false);

        dispatch(showAlert({ message: "Some error occured", type: "error" }));
        dispatch(clearErrors());
        setTimeout(() => {
          dispatch(clearAlert());
        }, 100);
      }
    } catch (error) {
      setLoading(false);
      dispatch(showAlert({ message: error.message, type: "error" }));
      dispatch(clearErrors());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 100);
    }
  }

  return (
    <>
      <CheckOutSteps activeStep={2} />
      <div className="container min-h-screen">
        <h2 className="w-36 mx-auto text-2xl text-medium text-center border-b-2 border-gray-400 my-4 opacity-90">
          Card Info
        </h2>
        <form className="bg-white md:w-1/2 mx-auto p-4" onSubmit={handleSubmit}>
          <PaymentElement />
          {!loading && (
            <button
              className="w-full py-3 rounded mt-4 mb-11 outline-none text-white text-xl bg-red-600 hover:bg-red-500"
              type="submit"
            >
              Pay {orderInfo.total}
            </button>
          )}
          {loading && (
            <button className="w-full py-3 rounded mt-4 mb-11 outline-none text-white text-xl bg-red-600 hover:bg-red-500">
              Processing...
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Payment;
