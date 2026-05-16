"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export type LoginState = {
  error: string | null;
  success: boolean;
  hasConflict: boolean;
  userId: string | null;
  deviceId: string;
};

export async function loginUser(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const deviceId = (formData.get("deviceId") as string) || "unknown-browser";

  if (!email || !password) {
    return { 
      error: "Please enter both email and password credentials.", 
      success: false, 
      hasConflict: false, 
      userId: null, 
      deviceId 
    };
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
      include: { sessions: true }
    });

    if (!user) {
      return { 
        error: "Invalid email or password credentials provided.", 
        success: false, 
        hasConflict: false, 
        userId: null, 
        deviceId 
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { 
        error: "Invalid email or password credentials provided.", 
        success: false, 
        hasConflict: false, 
        userId: null, 
        deviceId 
      };
    }

    if (user.sessions.length > 0 && !prevState?.hasConflict) {
      return { 
        error: null,
        success: false, 
        hasConflict: true, 
        userId: user.id, 
        deviceId 
      };
    }

    // Clear old records and save current session footprint
    await db.activeSession.deleteMany({ where: { userId: user.id } });
    await db.activeSession.create({
      data: { userId: user.id, deviceId }
    });

    await db.user.update({
      where: { id: user.id },
      data: { isActive: true }
    });

    // Plant secure server-side session tracking cookie
    const cookieStore = await cookies();
    cookieStore.set("vesta_uid", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 30, // 30 Minutes base window
      path: "/"
    });

    return { 
      success: true, 
      error: null, 
      hasConflict: false, 
      userId: user.id, 
      deviceId 
    };
  } catch (error) {
    console.error("LOGIN_SERVER_ACTION_EXCEPTION:", error);
    return { 
      error: "A transmission infrastructure error occurred.", 
      success: false, 
      hasConflict: false, 
      userId: null, 
      deviceId 
    };
  }
}

export async function logoutUserAction() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("vesta_uid")?.value;

    if (userId) {
      await db.activeSession.deleteMany({ where: { userId } });
      await db.user.update({
        where: { id: userId },
        data: { isActive: false }
      });
    }

    cookieStore.delete("vesta_uid");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}