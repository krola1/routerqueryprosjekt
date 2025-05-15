import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header>
        <h2>Movie List</h2>
        <p>Click on the titles to see information about each movie</p>
        <Link to="/">Home</Link>
      </header>
    </>
  );
}
