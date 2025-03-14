"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CreateReportPage() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h3>Submit A Report Page</h3>
    </div>
  );
}
