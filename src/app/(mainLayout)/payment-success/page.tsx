import { Suspense } from "react";
import PaymentSuccess from "./components/PaymentSuccess";

const PaymentSuccessPage = () => {
  return (
    <Suspense>
      <PaymentSuccess />
    </Suspense>
  );
};

export default PaymentSuccessPage;
