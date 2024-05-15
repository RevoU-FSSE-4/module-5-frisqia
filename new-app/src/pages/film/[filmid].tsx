import { GetServerSideProps } from "next";
import React from "react";

interface IFilm {
  id: number;
  name: string;
}

interface FilmProps {
  film: IFilm;
}

function Index({ film }: FilmProps) {
  console.log("dalam component", film);
  return (
    <div>
      <h1>film Page</h1>
      <h1>{film.name}</h1>
    </div>
  );
}

// dia kan berjalan dari sisi server
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const response = await fetch(`http://localhost:9000/film/${params?.filmId}`);
  const film = await response.json();
  console.log("server", film);
  if (!film.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      film,
    },
  };
};

export default Index;
