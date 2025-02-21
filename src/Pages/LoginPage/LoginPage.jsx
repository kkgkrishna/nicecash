import React, { useState } from "react";
import CustomInput from "../CustomPage/CustomInput";
import Button from "../CustomPage/Button";
import CustomLoader from "../CustomPage/CustomLoader";
import { useNavigate } from "react-router-dom";
import { ApiConstant } from "../../ApiConstant/ApiConstant";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!formData?.user_name || !formData?.password) {
      setErrorMessage("All fields are required.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (formData?.user_name === "anup2002") {
        if (formData?.password === "Anup@2002") {
          console.log("Login successfull");
          localStorage.setItem("user_name", formData?.user_name);
          localStorage.setItem("token", ApiConstant?.anup_kumar_apiKey);
          navigate("/");
        } else {
          setErrorMessage("Wrong password.");
        }
      } else {
        setErrorMessage("User not found.");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white p-5">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-white">NiseCash</h2>
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-300">
          Sign in to your account
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-lg text-center">{errorMessage}</p>
        )}
        <div className="space-y-4">
          <CustomInput
            label="User Name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex justify-between text-sm text-gray-400">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
            <a href="#" className="hover:underline">
              Sign up
            </a>
          </div>
          <Button
            label="Login"
            className="w-full py-3 font-bold text-gray-100 bg-yellow-600 rounded-lg hover:bg-yellow-500 transition-all border-none !mt-10"
            onClick={handleLogin}
          ></Button>
          {loading && <CustomLoader />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
