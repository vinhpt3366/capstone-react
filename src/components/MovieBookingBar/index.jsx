import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLichChieuPhim } from "../../store/slices/lichChieuPhim.slice";
import { useNavigate } from "react-router-dom";

const MovieBookingBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dsPhim } = useSelector((state) => state.dsPhim);
  const { lichChieuPhim } = useSelector((state) => state.lichChieuPhim);
  const { heThongRapChieu } = lichChieuPhim;
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");

  useEffect(() => {
    if (selectedMovie) dispatch(fetchLichChieuPhim(selectedMovie));
  }, [selectedMovie]);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ~ ${hours}:${minutes}`;
  };

  const selectStyles = "h-10 px-3 rounded border border-gray-300 focus:outline-none focus:border-gray-400";

  return (
    <div className="relative lg:-mt-8 mt-2 px-4">
      <div className="h-16 m-2 block md:hidden"></div>
      <div className="max-w-3xl mx-auto">
        {/* Search bar cho màn hình nhỏ */}
        <div className="lg:hidden mb-4">
          <div className="relative">
            <input type="text" placeholder="Tìm kiếm phim" className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Booking bar */}
        <div className="hidden lg:grid lg:grid-cols-[1.8fr_1.8fr_1.75fr_1fr] lg:items-center gap-2 bg-white p-4 rounded-lg shadow-lg">
          {/* Phim */}
          <select
            className={`${selectStyles} w-full`}
            value={selectedMovie}
            onChange={(e) => {
              setSelectedMovie(e.target.value);
              setSelectedTheater("");
            }}
          >
            <option value="">Chọn Phim</option>
            {dsPhim.map((movie) => (
              <option key={movie.maPhim} value={movie.maPhim}>
                {movie.tenPhim.length > 30 ? `${movie.tenPhim.slice(0, 30)}...` : movie.tenPhim}
              </option>
            ))}
          </select>

          {/* Rạp */}
          <select
            className={`${selectStyles} w-full ${!selectedMovie ? "cursor-not-allowed bg-gray-100" : ""}`}
            disabled={!selectedMovie}
            value={selectedTheater}
            onChange={(e) => {
              setSelectedTheater(e.target.value);
              setSelectedShowtime("");
            }}
          >
            <option value="">Chọn Rạp</option>
            {selectedMovie &&
              heThongRapChieu.map((theater) => (
                <option key={theater.tenCumRap} value={JSON.stringify(theater)}>
                  {theater.tenCumRap}
                </option>
              ))}
          </select>

          {/* Ngày giờ chiếu */}
          <select
            className={`${selectStyles} w-full ${!selectedTheater ? "cursor-not-allowed bg-gray-100" : ""}`}
            disabled={!selectedTheater}
            value={selectedShowtime}
            onChange={(e) => setSelectedShowtime(e.target.value)}
          >
            <option value="">Ngày Giờ Chiếu</option>
            {selectedTheater &&
              JSON.parse(selectedTheater).lichChieuPhim.map((lichChieu) => (
                <option key={lichChieu.maLichChieu} value={lichChieu.maLichChieu}>
                  {formatDateTime(lichChieu.ngayChieuGioChieu)}
                </option>
              ))}
          </select>

          <button
            className={`whitespace-nowrap h-10 px-6 rounded font-medium transition-colors w-full text-center flex items-center justify-center ${
              !selectedShowtime ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            disabled={!selectedShowtime}
            onClick={() => {
              navigate(`/purchase/${selectedShowtime}`);
            }}
          >
            MUA VÉ
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingBar;
