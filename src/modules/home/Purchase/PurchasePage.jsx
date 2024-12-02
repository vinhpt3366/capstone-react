import CinemaBooking from "../../../components/CinemaBooking";
import Loading from "../../../components/Loading";
import Navbar from "../../../components/Navbar/Navbar";

export default function MovieDetails() {
  return (
    <>
      <Loading />
      <Navbar />

      <div className="w-full max-w-[1200px] mx-auto p-4 mt-14">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-screen">
          <CinemaBooking />
        </div>
      </div>
    </>
  );
}
