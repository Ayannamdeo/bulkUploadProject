import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { MainLayout } from "../../components";
import { signup } from "../../services/user";
// import { useEffect } from "react";

export function RegisterPage() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      console.log(data);
      // localStorage.setItem("")
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    }
  });

  // useEffect(()=>{ // condition rather than useEffect
  //   //if user already logged in than redirect to home page

  // })

  const submitHandler = (data) => {
    console.log(data);
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-bold text-center text-gray-600 mb-8">
            Sign up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 4,
                    message: "Name length must be at least 4 characters",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter Name"
                className={`placeholder:text-[#959ead]  mt-3 rounded-lg p-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"
                  } `}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1 ">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //!!!!!!!!!!!!!!!!!!!!!!
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "email is required",
                  },
                })}
                placeholder="Enter Email "
                className={`placeholder:text-[#959ead]  mt-3 rounded-lg p-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"
                  } `}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1 ">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "password length must be 8 characters",
                  },
                  required: {
                    value: true,
                    message: "password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      "Password must contain at least one alphabetic character, one numeric character, and one special character",
                  },
                })}
                placeholder="Enter Password "
                className={`placeholder:text-[#959ead]  mt-3 rounded-lg p-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                  } `}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1 ">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="disabled:opacity-70 disabled:cursor-not-allowed bg-blue-500 text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6"
            >
              Register
            </button>

            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link to="/login" className="text-blue-600">
                {" "}
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
