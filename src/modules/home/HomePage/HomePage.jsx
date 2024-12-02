import MovieAppDownload from "../../../components/MovieAppDownload";
import BlogTabs from "../../../components/BlogTabs";
import Carousel from "../../../components/Carousel";
import CinemaManagement from "../../../components/CinemaManagement";
import MovieBookingBar from "../../../components/MovieBookingBar";
import MovieList from "../../../components/MovieList";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer";
import Loading from "../../../components/Loading";

export default function HomePage() {
  return (
    <div className="grow shrink-0">
      <Navbar />
      <Carousel />
      <MovieBookingBar />
      <MovieList />
      <CinemaManagement />
      <BlogTabs />
      <MovieAppDownload />
      <Footer />
      <Loading />
    </div>
  );
}
