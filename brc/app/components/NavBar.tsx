"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="flex justify-between p-4">
      <Link href="/">Home</Link>
      <Link href="/reports">View All Reports</Link>
      <Link href="/reports/addreport">Submit A Report</Link>
      {session ? (
        <button onClick={() => signOut()}>
          Sign Out {session.user?.name}{" "}
        </button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </nav>
  );
}
