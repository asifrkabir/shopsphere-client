import { Metadata } from "next";
import { RegisterForm } from "./components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
