import React, { ReactNode } from "react";
import Link from "next/link";
export default function NavbarPage() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Logo"
        className="w-80 h-14"
      />
      <div className="flex justify-between">
        <ul className="flex space-x-8 text-orange-600">
          <li className="hover:text-orange-800">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="hover:text-orange-800">
            <Link href={"/"}>About</Link>
          </li>
          <li className="hover:text-orange-800">
            <Link href={"/"}>Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
