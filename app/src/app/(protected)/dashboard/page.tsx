//src/app/dashboard/page.tsx
"use client";

import { useAuth } from "../../../hooks/useAuth";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
    </div>
  );
}
