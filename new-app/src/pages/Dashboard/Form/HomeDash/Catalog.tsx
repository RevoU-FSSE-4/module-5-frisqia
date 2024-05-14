import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PokemonDashboardProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonResultWithImage extends PokemonResult {
  imageUrl: string;
}

const CatalogPokemon: React.FC<PokemonDashboardProps> = () => {
  const [pokemonResults, setPokemonResults] = useState<
    PokemonResultWithImage[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const url = "https://pokeapi.co/api/v2/pokemon";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch pokemon data!");
        }
        const data = await response.json();

        const imageUrlArray = data.results.map((pokemon: PokemonResult) => ({
          name: pokemon.name,
          url: pokemon.url,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split("/")[6]
          }.png`,
        }));

        setPokemonResults(imageUrlArray);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchPokemons();
  }, []);

  const handleNavigate = (pokemon: PokemonResultWithImage) => {
    router.push({
      pathname: `/${pokemon.name}`,
      query: { url: pokemon.url, imageUrl: pokemon.imageUrl },
    });
  };

  const handleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/logout",
        options
      );

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("token");
      router.push("/Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const startIndex = (currentPage - 1) * 9;
  const endIndex = Math.min(startIndex + 9, pokemonResults.length);
  const currentPokemonSubset = pokemonResults.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(pokemonResults.length / 9))
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <br />
      <br />
      <div className="flex justify-center mb-4">
        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {currentPokemonSubset.map((result) => (
          <div
            key={result.name}
            onClick={() => handleNavigate(result)}
            className="rounded-lg bg-orange-500 shadow-md p-4 text-center relative"
          >
            <img src={result.imageUrl} alt={result.name} className="mx-auto" />
            <h1 className="text-white font-bold text-lg mt-2">{result.name}</h1>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-l focus:outline-none focus:shadow-outline"
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(pokemonResults.length / 9)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CatalogPokemon;
