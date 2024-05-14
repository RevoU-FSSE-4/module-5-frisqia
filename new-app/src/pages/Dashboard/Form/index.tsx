"use client";

import Link from "next/link";

export default function HomeSite() {
  return (
    <>
      <h1>
        <Link href={"./RegisterForm"}>Sign Up</Link>
      </h1>
      <h1>
        <Link href={"./LoginForm"}>Sign In</Link>
      </h1>
    </>
  );
}
