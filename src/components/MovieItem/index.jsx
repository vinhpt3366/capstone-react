import { useState } from "react";
import { Play } from "lucide-react";
import TrailerModal from "./TrailerModal";
import { useNavigate } from "react-router-dom";

const MovieItem = (movie) => {
  const navigate = useNavigate();

  const { hinhAnh, tenPhim, danhGia, trailer, maPhim } = movie.movie || {};
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  const handleClick = () => {
    navigate(`/movie-details/${maPhim}`);
  };

  return (
    <>
      <div className="group relative w-full max-w-[300px] rounded-lg overflow-hidden">
        {/* Movie Poster */}
        <div className="relative aspect-[3/4]">
          <img src={hinhAnh} alt={tenPhim} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <div className="w-32 flex flex-col gap-3">
              <button className="w-full py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors" onClick={handleClick}>
                Mua vé
              </button>

              <button onClick={handleTrailerClick} className="w-full py-2 bg-white/20 text-white font-medium rounded hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <Play size={16} />
                Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-white font-medium mb-1">{tenPhim}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-white text-sm">{danhGia}</span>
            </div>
            <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded">T18</span>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} trailerUrl={trailer} />
    </>
  );
};

export default MovieItem;
