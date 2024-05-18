import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export const FindPokemon = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };
  const handleClick = () => {
    router.push(`/Dashboard/Pokemon/${query.toLowerCase()}`);
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handelChange}
        placeholder="Find your pokemon"
      />
      <button type="button" onClick={handleClick}>
        search
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pokemonId } = context.params as { pokemonId: string };
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit/${pokemonId} `
  );
  if (!response.ok) {
    return {
      notFound: true,
    };
  }
  const pokemon = await response.json();
  return { props: { pokemon } };
};
