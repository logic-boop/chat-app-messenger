import { getCookie, setCookie, deleteCookie } from "cookies-next";

const SESSION_COOKIE_NAME = "vesta_session_token";

export async function createSession(userId: string) {
  // Sets a secure cookie valid for 2 hours of inactivity
  setCookie(SESSION_COOKIE_NAME, userId, {
    maxAge: 60 * 120, // 2 Hours
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function getSessionUserId(): string | null {
  const session = getCookie(SESSION_COOKIE_NAME);
  return session ? (session as string) : null;
}

export function clearSession() {
  deleteCookie(SESSION_COOKIE_NAME);
}