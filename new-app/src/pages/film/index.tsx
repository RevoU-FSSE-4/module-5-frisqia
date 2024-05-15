// Component SSR

import { GetServerSideProps } from "next";
import React from "react";

interface Ifilm {
  id: number;
  name: string;
}

interface filmProps {
  film: Ifilm[];
}

// Berjalan sisi client
function Index({ film }: filmProps) {
  console.log("component", film);
  return (
    <div>
      <h1>film Page</h1>
      {film.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
}

// getServerSideProps kan berjalan dari sisi server
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:9000/film");
  const film = await response.json();
  console.log("server", film);
  return {
    props: {
      film,
    },
  };
};

export default Index;
