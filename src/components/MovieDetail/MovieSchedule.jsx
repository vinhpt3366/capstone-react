import { useState, useRef, useEffect } from "react";
import { Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CinemaSchedule = ({ data }) => {
  const navigate = useNavigate();

  const [selectedSystem, setSelectedSystem] = useState(null);
  const scrollContainerRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setSelectedSystem(data[0]?.maHeThongRap);
  }, [data]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Tab Navigation */}
      <div className="relative mb-6">
        {/* Scroll Left Button */}
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1 hover:bg-gray-50">
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Tab Container */}
        <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide mx-8" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="inline-flex gap-2 p-1">
            {data.map((system) => (
              <button
                key={system.maHeThongRap}
                onClick={() => setSelectedSystem(system.maHeThongRap)}
                className={`
                  min-w-[180px] h-12
                  inline-flex items-center gap-2 px-3
                  rounded-lg transition-all
                  ${selectedSystem === system.maHeThongRap ? "bg-blue-50 border-2 border-blue-500" : "border-2 border-transparent hover:bg-gray-50"}
                `}
              >
                <img src={system.logo} alt={system.tenHeThongRap} className="w-8 h-8 object-contain flex-shrink-0" />
                <span className="font-medium text-sm truncate">{system.tenHeThongRap}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Right Button */}
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1 hover:bg-gray-50">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-6">
        {data
          .find((sys) => sys.maHeThongRap === selectedSystem)
          ?.cumRapChieu.map((cinema) => (
            <div key={cinema.maCumRap} className="mb-8">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h2 className="font-medium text-base lg:text-lg">{cinema.tenCumRap}</h2>
                <div className="flex items-center gap-1 text-gray-500 text-xs lg:text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{cinema.diaChi}</span>
                </div>
              </div>

              {Object.entries(
                cinema.lichChieuPhim.reduce((acc, schedule) => {
                  const date = new Date(schedule.ngayChieuGioChieu).toLocaleDateString("vi-VN");
                  if (!acc[date]) acc[date] = [];
                  acc[date].push(schedule);
                  return acc;
                }, {})
              ).map(([date, schedules]) => (
                <div key={date} className="mb-6">
                  <h3 className="font-medium text-lg mb-4">{date}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schedules
                      .sort((a, b) => new Date(a.ngayChieuGioChieu) - new Date(b.ngayChieuGioChieu))
                      .map((schedule) => {
                        const time = new Date(schedule.ngayChieuGioChieu).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        return (
                          <div key={schedule.maLichChieu} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm truncate mr-2">{schedule.tenRap}</span>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex-shrink-0">{schedule.thoiLuong} phút</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{time}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="font-medium text-green-600 text-sm">{formatPrice(schedule.giaVe)}</span>
                              <button
                                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-600 text-white text-xs lg:text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => navigate(`/purchase/${schedule.maLichChieu}`)}
                              >
                                Đặt vé
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CinemaSchedule;
