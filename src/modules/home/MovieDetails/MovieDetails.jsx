import MovieDetail from "../../../components/MovieDetail";
import Loading from "../../../components/Loading";
import Navbar from "../../../components/Navbar/Navbar";

export default function MovieDetails() {
  return (
    <>
      <Loading />
      <Navbar />
      <MovieDetail />
    </>
  );
}
