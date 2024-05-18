import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FindPokemon } from "./[pokemonId]";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface PokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10"); // Mengambil 10 Pokemon pertama
  const data: PokemonResponse = await response.json();

  // Mengambil data detail untuk setiap Pokemon
  const pokemons = await Promise.all(
    data.results.map(async (pokemonSummary) => {
      const res = await fetch(pokemonSummary.url);
      const pokemon: Pokemon = await res.json();
      return pokemon;
    })
  );

  return { props: { pokemons } };
};

export default function PokemonPage({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <>
      <Head>
        <title>Daftar Pokemon</title>
      </Head>
      <div>
        <FindPokemon />

        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            // style={{
            //   border: "1px solid #ccc",
            //   margin: "10px",
            //   padding: "10px",
            // }}
          >
            <h1>{pokemon.name}</h1>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <p>Tinggi: {pokemon.height}</p>
            <p>Berat: {pokemon.weight}</p>
            <h3>Kemampuan:</h3>
            <ul>
              {pokemon.abilities.map((abilityInfo) => (
                <li key={abilityInfo.ability.name}>
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
