"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="flex justify-between p-4">
      <Link className="hover:text-blue-700" href="/">
        Home
      </Link>
      <Link className="hover:text-blue-700" href="/reports">
        View All Reports
      </Link>
      <Link className="hover:text-blue-700" href="/reports/addreport">
        Submit A Report
      </Link>
      {session ? (
        <button className="hover:text-blue-700" onClick={() => signOut()}>
          Sign Out {session.user?.name}{" "}
        </button>
      ) : (
        <button className="hover:text-blue-700" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </nav>
  );
}
