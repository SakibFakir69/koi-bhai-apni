import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
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

export default MyForm;
