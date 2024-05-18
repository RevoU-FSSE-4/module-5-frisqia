import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export const FindPokemon = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    if (query.trim() !== "") {
      router.push(`/Dashboard/Pokemon/${query.toLowerCase()}`);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Find your pokemon"
        className="border-2 border-orange-500 rounded-l-lg p-2 w-1/3"
      />
      <button
        type="button"
        onClick={handleClick}
        className="bg-orange-500 text-white rounded-r-lg p-2 hover:bg-orange-700"
      >
        Search
      </button>
    </div>
  );
};

export default function PokemonIdPage({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Pokemon: {pokemon.name}</title>
        <meta property="pokemon-name" content={pokemon.name} key="title" />
      </Head>
      <div className="flex flex-col items-center bg-orange-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Pokemon ID {pokemon.id}: {pokemon.name}
        </h1>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 mb-4"
        />
        <p className="text-xl mb-2">Height: {pokemon.height}</p>
        <p className="text-xl mb-4">Weight: {pokemon.weight}</p>
        <h3 className="text-2xl font-semibold mb-2">Abilities:</h3>
        <ul className="list-disc list-inside">
          {pokemon.abilities.map((abilityInfo: any) => (
            <li key={abilityInfo.ability.name} className="text-lg">
              {abilityInfo.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pokemonId } = context.params as { pokemonId: string };
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const pokemon = await response.json();
  return { props: { pokemon } };
};
