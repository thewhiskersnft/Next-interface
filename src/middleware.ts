import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSignedIn } from "./utils/auth/checkAuth";
import { errorToast } from "./component/common/toast";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if (!isSignedIn()) {
  //   errorToast({ message: "Please Login!" });
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  //   return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/rewards", "/token"],
};
