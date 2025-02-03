import { Metadata } from "next";
import { LoginForm } from "../components/login-form";

export const metadata: Metadata = {
  title: "Aвторизация",
  description: "Форма авторизации",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative h-screen grid items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <LoginForm/>
      </div>
    </>
  );
}