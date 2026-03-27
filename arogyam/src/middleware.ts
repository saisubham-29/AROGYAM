import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "arogyam_jwt_secret_key_2024");

const careManagerOnly = ["/care-manager"];
const parentOnly = ["/parent-dashboard"];
const childOnly = ["/child-dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/", req.url));

  let role: string;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    role = payload.role as string;
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (careManagerOnly.some((r) => pathname.startsWith(r)) && role !== "care_manager")
    return NextResponse.redirect(new URL("/dashboard", req.url));

  if (parentOnly.some((r) => pathname.startsWith(r)) && role !== "parent")
    return NextResponse.redirect(new URL("/dashboard", req.url));

  if (childOnly.some((r) => pathname.startsWith(r)) && role !== "child")
    return NextResponse.redirect(new URL("/dashboard", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/(.*)",
    "/care-manager",
    "/care-manager/(.*)",
    "/parent-dashboard",
    "/parent-dashboard/(.*)",
    "/child-dashboard",
    "/child-dashboard/(.*)",
    "/health-records",
    "/health-records/(.*)",
    "/care-team",
    "/care-team/(.*)",
    "/care-timeline",
    "/care-timeline/(.*)",
    "/settings",
    "/settings/(.*)",
  ],
};
