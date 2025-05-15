import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

/// Fetches film data based on ID
async function fetchFilm(id) {
  const result = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!result.ok) {
    throw new Error("Kunne ikke laste film");
  }
  return await result.json();
}
//main function
export default function FilmDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchFilm", id],
    queryFn: () => fetchFilm(id),
  });

  if (isLoading) return <p>Loading film info</p>;
  if (error) return <p>Error: {error}</p>;

  const backgroundCSS = {
    backgroundImage: `url(${data.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    minWidth: "30rem",
    maxWidth: "40rem",
    minHeight: "40rem",
  };

  return (
    <div className="FilmDetail-container">
      <h1>{data.title}</h1>
      <div
        className="FilmDetail-banner"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      ></div>
      <h2>
        {data.producer} • {data.release_date}
      </h2>
      <p>{data.description}</p>
    </div>
  );
}
