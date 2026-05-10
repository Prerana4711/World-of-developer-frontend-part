import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import base_url from "./config";
import validator from "validator";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const validateLoginForm = () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!validator.isEmail(email)) {
      setError("Please enter a valid email");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    return true;
  };
  const handleLogin = async () => {
    if (!validateLoginForm()) return;
    try {
      const res = await axios.post(
        base_url + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response?.status === 404) {
        setError("Invalid credential");
      }
    }
  };
  const validateSignupForm = () => {
    setError("");

    // Signup Validation
    if (!firstName.trim()) {
      setError("First Name is required");
      return false;
    }
    if (firstName.length < 3) {
      setError("First Name must be at least 3 characters");
      return false;
    }
    if (firstName.length > 50) {
      setError("First Name cannot exceed 50 characters");
      return false;
    }

    if (!lastName.trim()) {
      setError("Last Name is required");
      return false;
    }
    if (lastName.length < 3) {
      setError("Last Name must be at least 3 characters");
      return false;
    }
    if (lastName.length > 50) {
      setError("Last Name cannot exceed 50 characters");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!validator.isEmail(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (!validator.isStrongPassword(password)) {
      setError("Password is not strong");
      return false;
    }

    return true;
  };
  const handleSignup = async () => {
    if (!validateSignupForm()) return;
    try {
      const res = await axios.post(
        base_url + "/signup",
        { first_name: firstName, last_name: lastName, password, email },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/profile/view");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-128px)] ">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <p className="fieldset-legend flex justify-center text-3xl">
          {isLogin ? "Login" : "Signup"}
        </p>

        {!isLogin && (
          <>
            {" "}
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />{" "}
          </>
        )}

        <label className="label">Email</label>
        <input
          type="text"
          value={email}
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          className="btn btn-neutral mt-4"
          onClick={() => (isLogin ? handleLogin() : handleSignup())}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <button
          className="mt-2 text-blue-400 cursor-pointer hover:underline "
          onClick={() => setIsLogin((value) => !value)}
        >
          {isLogin
            ? "New user click to Sign In "
            : "Existing user click to Login "}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
