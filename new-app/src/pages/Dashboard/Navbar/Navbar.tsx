import React, { ReactNode } from "react";
import Link from "next/link";
export default function NavbarPage() {
  return (
    <div>
      <h1>Hello!!</h1>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Logo"
        className="w-80 h-14"
      />
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>About</Link>
        </li>
        <li>
          <Link href={"/"}>Contact</Link>
        </li>
      </ul>
    </div>
  );
}
