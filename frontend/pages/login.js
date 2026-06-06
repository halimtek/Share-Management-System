import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { UserAuth } from "../context/AuthContext";
import Heator from "../components/Landing_page/Heator";

export default function Login() {
  const router = useRouter();
  const { Userlogin } = UserAuth();

  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // ✅ FIXED SUBMIT LOGIC
  const submitHandler = async (data) => {
    const { email, password } = data;

    try {
      await Userlogin(email, password);

      const user = JSON.parse(sessionStorage.getItem("user"));

      if (user?.roll === 2) {
        router.push("/admin1/dashboard");
      } else if (user?.roll === 0) {
        router.push("/shareholder/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Heator>
      <div
        className="flex justify-center h-screen xl:justify-around gap-2"
        style={{ backgroundColor: "#49696c" }}
      >
        <div
          className="mt-16 w-1/2 h-3/5 p-8 rounded-3xl"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div>
            <h2 className="flex justify-center font-bold items-center">
              Log in to your account
            </h2>

            <form onSubmit={handleSubmit(submitHandler)}>
              {/* EMAIL */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="my-4 font-bold">
                  <label>Email address</label>
                </div>

                <input
                  className="appearance-none relative block w-full px-3 py-4 border border-gray-300 rounded-md"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Please enter email",
                  })}
                />

                {errors.email && (
                  <div className="text-red-600">{errors.email.message}</div>
                )}
              </div>

              {/* PASSWORD */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="my-4 font-bold">
                  <label>Password</label>
                </div>

                <input
                  className="appearance-none relative block w-full px-3 py-4 border border-gray-300 rounded-md"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                {errors.password && (
                  <div className="text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <div className="mb-2 mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  log in
                </button>
              </div>
            </form>

            {/* ERROR */}
            {error && (
              <div className="text-red-600 flex justify-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </Heator>
  );
}