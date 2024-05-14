"use client";

import Link from "next/link";

export default function HomeSite() {
  return (
    <>
      <h1>
        <Link href={"./HomeDash/FindPokemon"}>Search Pokemon</Link>
      </h1>
      <h1>
        <Link href={"./HomeDash/Catalog"}>Catalog Pokemon</Link>
      </h1>
    </>
  );
}
