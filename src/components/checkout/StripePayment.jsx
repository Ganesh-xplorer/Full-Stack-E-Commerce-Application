import { Skeleton } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { createStripePaymentSecret } from "../../store/actions";

// ✅ Load Stripe publishable key from .env
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.error(
    "❌ STRIPE_KEY is missing! Please define it in your .env file."
  );
}

const stripePromise = loadStripe(stripeKey);

const StripePayment = () => {
  const dispatch = useDispatch();

  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading } = useSelector((state) => state.errors);

  // ✅ Fetch Stripe client secret if not already available
  useEffect(() => {
    if (!clientSecret && totalPrice > 0) {
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret, totalPrice, dispatch]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton height={200} />
      </div>
    );
  }

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
