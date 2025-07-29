import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/features/auth/authSlice";
import { Auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // ✅ updated import

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const goHome = useNavigate();
  const dispatch = useDispatch();
  const genrateId = uuidv4();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: any) => {
    try {
      const { name, email, password } = data;

      const userCredintial = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
      );
      const user = userCredintial.user;

      console.log("Form Data:", data);
      dispatch(
        signUp({
          name,
          email: user.email || " ",
          password: password,
          userId: genrateId,
        })
      );

      // sign up api here ->>>

      const userData = {
        ...data,
        userId: genrateId,
      };

      axios
        .post("http://localhost:5000/api/create-user", userData)
        .then((res) => {
          console.log(res.data, " ");

          const userId = res?.data?.data?.userId;

          if (userId) {
            localStorage.setItem("token-userId", userId);
            console.log("User ID stored:", userId);
          } else {
            console.error("User ID missing in response:", res);
          }
        })

        .catch((err) => {
          console.log(err.message);
        });

      if (user.email) {
        alert("Sign up");
        goHome("/");
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-[#F9FAFB] min-h-screen md:p-2 p-10 flex justify-center items-center rounded w-full">
      <section className="flex flex-col bg-[#FFFFFF] md:w-1/2 w-full  border   border-black/10 p-8 h-[580px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4  "
        >
          <h1 className="text-4xl text-center font-semibold">Koi Bhai Apni</h1>
          <h3 className="text-3xl font-bold text-center text-green-500 mb-10">
            Welcome
          </h3>
          {/* Name */}
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="py-2 border border-stone-400/20 rounded px-3 "
          />
          {errors.name && <span>{errors.name.message}</span>}
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className="py-2 border border-stone-400/20 rounded px-3 "
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="py-2 border border-stone-400/20 rounded px-3"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <input
            type="submit"
            value="Submit"
            className="py-2 bg-[#3758F9] text-white rounded cursor-pointer"
          />
        </form>

        <div className="flex justify-center flex-col items-center gap-y-4 mt-8">
          <h1 className="text-2xl font-semibold text-stone-600">
            Connect With
          </h1>

          <div>
            <button className="cursor-pointer">
              <FcGoogle size={30} />
            </button>
          </div>

          <p>
            You have't account{" "}
            <Link className="text-blue-500" to={"/auth/signin"}>
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
