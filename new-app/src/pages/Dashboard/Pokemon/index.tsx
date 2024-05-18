import React, { useState } from "react";
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
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20"); // Mengambil 20 Pokemon pertama
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
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 9;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = Math.min(startIndex + pokemonsPerPage, pokemons.length);
  const currentPokemonSubset = pokemons.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <Head>
        <title>Daftar Pokemon</title>
      </Head>
      <div className="text-center">
        <FindPokemon />

        <div className="grid grid-cols-3 gap-6 p-6">
          {currentPokemonSubset.map((pokemon) => (
            <div
              key={pokemon.name}
              className="bg-orange-500 rounded-lg p-4 text-white"
            >
              <h1 className="text-xl font-bold">{pokemon.name}</h1>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto my-4"
                width={96}
                height={96}
              />
              {/* Uncomment these lines if you want to display more details */}
              {/* <p>Tinggi: {pokemon.height}</p>
              <p>Berat: {pokemon.weight}</p>
              <h3>Kemampuan:</h3>
              <ul>
                {pokemon.abilities.map((abilityInfo) => (
                  <li key={abilityInfo.ability.name}>
                    {abilityInfo.ability.name}
                  </li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1} // Tombol sebelumnya dinonaktifkan jika halaman slide saat ini adalah halaman pertama
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-l focus:outline-none focus:shadow-outline"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages} // Tombol berikutnya dinonaktifkan jika halaman slide saat ini adalah halaman terakhir
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
