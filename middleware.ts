import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes (no authentication required)
const isPublicRoute = createRouteMatcher([
  "/api/checkout",  // Stripe checkout API
  "/success",        // Stripe success page
  "/cancel"          // Stripe cancel page
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return; // ✅ Skip auth for public routes
  }

  // ✅ Implicitly protect all other routes
  auth(); // this alone ensures the user is authenticated — or Clerk will handle redirect/403
});

export const config = {
  matcher: [
    // Skip static assets and Next.js internals
    "/((?!_next|.*\\.(?:js|css|png|jpg|jpeg|svg|ico|woff2?|ttf|eot|json|txt|csv|pdf|zip)).*)",
    // Always match API and TRPC routes
    "/(api|trpc)(.*)"
  ]
};
