import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/shared/ui";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
