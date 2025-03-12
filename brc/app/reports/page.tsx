import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function ReportsPage() {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>ReportsPage</h1>
    </div>
  );
}
