import { NextResponse, type NextRequest } from "next/server";
import { composeCommercialPresence } from "./composition/commercial-presence/compose-commercial-presence";

export function proxy(request: NextRequest): NextResponse {
  if (composeCommercialPresence().document(request.nextUrl.pathname))
    return NextResponse.next();

  // Resolve unknown commercial params through the static root 404, including HTML without scripts.
  return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = {
  matcher: [
    "/productos/:path*",
    "/servicios/:path*",
    "/trabajos/:path*",
    "/proyectos/:path*",
  ],
};
