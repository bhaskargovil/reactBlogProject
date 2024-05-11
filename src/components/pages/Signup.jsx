import React, { useState } from "react";
import Logo from "../elements/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { login } from "../../store/authSlice";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signupHandler = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="py-8">
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          {/* putting logo on the page */}
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>

          <h2 className="text-center text-2xl font-bold leading-tight">
            {" "}
            Sign up
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* displaying error  */}
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          {/* details form */}
          <form onSubmit={handleSubmit(signupHandler)}>
            <div className="space-y-5">
              {/* name input box */}
              <Input
                label="Enter name: "
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {/* email input box */}
              <Input
                label="Enter email: "
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {/* password input box */}
              <Input
                label="Enter password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />

              {/* sign up button */}
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
