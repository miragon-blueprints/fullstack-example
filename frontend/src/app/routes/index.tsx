import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[var(--container-page)] flex-col items-center justify-center gap-4 px-6">
      <h1 className="font-sans text-h1">MiraVelo</h1>
      <p className="text-lead text-schwarz/60">Bike-Leasing, neu gedacht.</p>
    </main>
  );
}
