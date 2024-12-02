// import React from "react";
import { Star, Clock, Calendar, Tag } from "lucide-react";
import MovieSchedule from "./MovieSchedule";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLichChieuPhim } from "../../store/slices/lichChieuPhim.slice";
import TrailerModal from "../MovieItem/TrailerModal";

const MovieDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lichChieuPhim } = useSelector((state) => state.lichChieuPhim);
  const { tenPhim, danhGia, hinhAnh, ngayKhoiChieu, trailer, moTa, heThongRapChieuDetailsPage } = lichChieuPhim;

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isNaN(parseInt(id))) {
      navigate("/");
    }
    dispatch(fetchLichChieuPhim(id));
  }, []);

  const formatDate = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const ngayChieu = date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return ngayChieu;
  };

  const scheduleRef = useRef(null);

  const scrollToSchedule = () => {
    scheduleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 mt-14">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-950">
        {/* Movie Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Movie Poster */}
          <div className="lg:w-1/3">
            <div className="relative pb-[150%]">
              <div className="absolute inset-0 bg-gray-200">
                <img src={hinhAnh} alt={tenPhim} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-950">{tenPhim}</h1>

            {/* Rating and Duration */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-medium">{danhGia}/10</span>
              </div>
              <div className="flex items-center text-gray-950">
                <Clock className="w-5 h-5 text-gray-500 mr-1" />
                <span>120 phút</span>
              </div>
            </div>

            {/* Movie Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <span className="font-medium">Khởi chiếu: </span>
                  <span>{formatDate(ngayKhoiChieu)}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Tag className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <span className="font-medium">Thể loại: </span>
                  <span>Hành động, Hài hước, Tâm lý</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Nội dung phim</h2>
              <p className="text-gray-600 leading-relaxed">{moTa}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-colors" onClick={scrollToSchedule}>
                ĐẶT VÉ NGAY
              </button>
              <button className="px-6 py-3 border border-gray-300 bg-gray-100 rounded font-medium hover:bg-gray-300 transition-colors" onClick={() => setIsTrailerOpen(true)}>
                XEM TRAILER
              </button>
            </div>
          </div>
        </div>

        {/* Showtimes Section */}
        <div className="border-t border-gray-200 p-6" ref={scheduleRef}>
          <MovieSchedule data={heThongRapChieuDetailsPage} />
        </div>
      </div>
      {/* Trailer Modal */}
      <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} trailerUrl={trailer} />
    </div>
  );
};

export default MovieDetail;
