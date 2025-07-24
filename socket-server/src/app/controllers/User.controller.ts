import { Request, RequestHandler, Response } from "express";
import { success, z } from "zod";
import { User } from "../models/User";

import bcryptjs from "bcryptjs";

// ✅ Corrected schema
const UserZodValidation = z.object({
  userId: z.string(),
  name: z.string().min(2).max(60),
  email: z.string().email(),
  phone: z.string().min(10).max(15).optional(),
  password: z.string().min(6).max(20),
});

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body, "call ");
    const result = UserZodValidation.safeParse(req.body);

    console.log(result, " ------------------------------------");

    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.flatten() });
      return;
    }

    let { password, ...rest } = result.data;

    // email
    const isUserxits =await User.findOne({ email:rest?.email });
    if (isUserxits) {
      res.status(400).json({
        status: false,
        message: "Your are already Sign up",
      });
      return;
    }

    let hashPassword  =await bcryptjs.hash(password, 10);
    console.log("hash", password);

    const newUser = await User.create({...rest, password:hashPassword});

    res
      .status(201)
      .json({ success: true, message: "User created", data: newUser });
    return;
  } catch (error: any) {
    console.error("User creation failed:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    return;
  }
};

export const login_User = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isUserxits = await User.findOne({ email: email });

  if (!isUserxits) {
    res.status(404).json({
      status: false,
      message: "User not founded",
    });
    return;
  }

  const hashPassword = isUserxits.password;

  const isHashPassword =await  bcryptjs.compare(password, hashPassword);

  if (!isHashPassword) {
    res.status(404).json({
      status: false,
      message: "Password not match",
    });
    return;
  }
};
