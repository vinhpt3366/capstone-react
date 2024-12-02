import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieItem from "../MovieItem";
import { fetchDsPhim } from "../../store/slices/dsPhim.slice";
import { useDispatch, useSelector } from "react-redux";
import { MA_NHOM } from "../../constants";

const ITEMS_PER_PAGE = 8;

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const { dsPhim: MOVIES_DATA } = useSelector((state) => state.dsPhim);

  const totalPages = Math.ceil(MOVIES_DATA.length / ITEMS_PER_PAGE);
  const currentMovies = MOVIES_DATA.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  useEffect(() => {
    dispatch(fetchDsPhim(MA_NHOM));
  }, []);

  return (
    <div className="w-full max-w-[1200px] px-4 mx-auto py-8" id="movie-list">
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {currentMovies.map((movie) => (
          <div key={movie.maPhim} className="flex justify-center">
            <MovieItem movie={movie} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button onClick={handlePrevPage} disabled={currentPage === 0} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === index ? "bg-orange-500 w-6" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
