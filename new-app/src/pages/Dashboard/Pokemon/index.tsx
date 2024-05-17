import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Home = () => {
  const [text, setText] = useState(""); // State to store input text
  const router = useRouter();

  const handleSearch = () => {
    if (text !== "") {
      router.push(`/pokemon/${text.toLowerCase()}`); // Navigate to the Pokémon details page
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value); // Update text state with input value
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-orange-100 rounded-lg shadow-xl border border-orange-300">
      <Head>
        <title>Find your Pokemon</title>
      </Head>
      <div className="text-center mb-4">
        <h1 className="text-3xl text-orange-400 text-shadow-lg font-semibold">
          Find your Pokemon
        </h1>
      </div>
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={text}
          onChange={handleInputChange}
          className="p-2 mr-2 border border-orange-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
