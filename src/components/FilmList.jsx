//importerer verktøy
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

async function fetchFilms() {
  const result = await fetch("https://ghibliapi.vercel.app/films");
  if (!result.ok) {
    throw new Error("Kunne ikke hente filmer");
  }
  return await result.json();
}

//--------------------------------------------
export default function FilmList() {
  //usequery
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchFilms"],
    queryFn: fetchFilms,
  });
  // state for search
  const [search, setSearch] = useState("");
  // display, based on api result
  if (isLoading) return <p>Loading films ....</p>;
  if (error) return <p>Error! {error.message}</p>;

  // filter based on search input
  const filteredData = data.filter((film) =>
    film.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredData.map((film) => (
          <li key={film.id}>
            <Link to={`/film/${film.id}`}>
              <h3>
                {film.title} ({film.release_date})
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
