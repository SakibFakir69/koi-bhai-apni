import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/features/auth/authSlice";
import { Auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const dispatch = useDispatch();

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
      dispatch(signUp({
        name,
        email: user.email || " ",
        password:password
      }));

      if(user.email){
        alert("Sign up")
      }
      console.log(user)


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <input
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
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
      />
      {errors.email && <span>{errors.email.message}</span>}

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
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;
