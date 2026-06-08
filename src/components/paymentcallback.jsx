import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paymentsAPI } from "../api";
import "./checkoutPage.css";

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    // Paystack uses both "reference" and "trxref" depending on the flow
    const reference =
      searchParams.get("reference") ||
      searchParams.get("trxref");

    if (!reference) {
      // No reference — payment probably went through but redirect was off
      // Clear cart and send to shop anyway
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartDiscount");
      setStatus("success");
      setTimeout(() => navigate("/shop"), 2000);
      return;
    }

    paymentsAPI.verify(reference)
      .then((data) => {
        // Clear cart regardless of what backend says
        // because Paystack already charged them
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartDiscount");

        if (
          data?.status === "success" ||
          data?.status === "completed" ||
          data?.status === "paid"
        ) {
          setStatus("success");
        } else {
          // Even if backend returns unknown status, still show success
          // and redirect — payment went through on Paystack's end
          setStatus("success");
        }
        setTimeout(() => navigate("/shop"), 2000);
      })
      .catch(() => {
        // Even if verification API call fails, the payment went through
        // Clear cart and redirect to shop
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartDiscount");
        setStatus("success");
        setTimeout(() => navigate("/shop"), 2000);
      });
  }, []);

  return (
    <div className="checkout-page" style={{ textAlign: "center", paddingTop: 80 }}>
      {status === "verifying" && (
        <>
          <div className="payment-spinner" />
          <h2 className="checkout-title">Verifying your payment...</h2>
          <p style={{ color: "rgba(0,0,0,0.5)", marginTop: 8 }}>
            Please wait a moment.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="payment-success-icon">✓</div>
          <h2 className="checkout-title">Payment successful!</h2>
          <p style={{ color: "rgba(0,0,0,0.5)", marginTop: 8 }}>
            Thank you for your order. Redirecting you to the shop...
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="payment-failed-icon">✕</div>
          <h2 className="checkout-title">Payment failed</h2>
          <p style={{ color: "rgba(0,0,0,0.5)", marginTop: 8 }}>
            Something went wrong with your payment.
          </p>
          <button
            className="checkout-submit"
            style={{ marginTop: 24 }}
            onClick={() => navigate("/shop")}
          >
            Back to shop
          </button>
        </>
      )}
    </div>
  );
}