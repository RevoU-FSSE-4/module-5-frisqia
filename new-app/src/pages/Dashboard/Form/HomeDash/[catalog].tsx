import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

interface PokemonResult {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  url: string;
  imageUrl: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pokemonId } = context.params as { pokemonId: string };
  // Fetch data from external API
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data: Pokemon = await res.json();

  const imageUrlArray = data.results.map((pokemon: PokemonResult) => ({
    name: pokemon.name,
    url: pokemon.url,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemon.url.split("/")[6]
    }.png`,

  // Pass data to the page via props
  return { props: { data: data } };

};

export default function PokemonIndex({ data }: { data: Pokemon[] }) {
  return (
    <>
      {data.map((pokemon) => {
        return <h1 key={pokemon.name}>{pokemon.name}</h1>;
      })}{" "}
    </>
  );
}
