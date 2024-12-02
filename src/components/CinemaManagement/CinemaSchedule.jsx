import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react"; // Thêm ChevronDown
import { useNavigate } from "react-router-dom";

const MovieSchedule = ({ selectedBranch }) => {
  const [expandedMovies, setExpandedMovies] = useState({});
  const navigate = useNavigate();

  const toggleExpand = (movieId) => {
    setExpandedMovies((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const ngayChieu = date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const gioChieu = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { ngayChieu, gioChieu };
  };

  return (
    <div className="flex-1 bg-white overflow-hidden">
      {selectedBranch ? (
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="font-bold mb-4 pb-2 border-b text-gray-800">Lịch Chiếu {selectedBranch.name}</h2>
          <div className="space-y-6">
            {selectedBranch.danhSachPhim.map((movie) => (
              <div key={movie.maPhim} className="border-b pb-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                    <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-gray-800">
                      <button onClick={() => toggleExpand(movie.maPhim)} className="hover:bg-gray-300 bg-gray-100 text-gray-800 rounded-full p-1 transition-colors">
                        {expandedMovies[movie.maPhim] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded">T18</span>
                      {movie.tenPhim}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {movie.lstLichChieuTheoPhim.slice(0, expandedMovies[movie.maPhim] ? undefined : 4).map((showTime, index) => {
                        const { ngayChieu, gioChieu } = formatDateTime(showTime.ngayChieuGioChieu);
                        return (
                          <div
                            key={index}
                            className="bg-gray-50 p-2 rounded text-sm hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                            onClick={() => {
                              navigate(`/purchase/${showTime.maLichChieu}`);
                            }}
                          >
                            <div className="text-gray-600">{ngayChieu}</div>
                            <div className="font-medium text-green-600">{gioChieu}</div>
                          </div>
                        );
                      })}
                    </div>

                    {!expandedMovies[movie.maPhim] && movie.lstLichChieuTheoPhim.length > 4 && (
                      <div className="mt-2 text-sm text-gray-500">+{movie.lstLichChieuTheoPhim.length - 4} lịch chiếu khác</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">Chọn một chi nhánh để xem lịch chiếu</div>
      )}
    </div>
  );
};

export default MovieSchedule;
