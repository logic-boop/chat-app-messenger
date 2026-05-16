"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "All profile registration fields are required." };
  }

  try {
    // Look up if employee email instance is taken
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // Encrypt the credentials securely
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save directly to MongoDB Atlas instance container
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: false,
      },
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("SIGNUP_SERVER_ACTION_ERROR:", error);
    return { error: "An engineering exception occurred. Try again." };
  }
}