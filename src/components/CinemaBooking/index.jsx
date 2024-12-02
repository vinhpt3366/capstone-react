import { useEffect, useState } from "react";
import { fetchDsPhongVe } from "../../store/slices/dsPhongVe.slice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import toast from "react-hot-toast";
import { fetchDatVe } from "../../store/slices/datVe.slice";

const CinemaBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isNaN(parseInt(id))) {
      navigate("/");
    }
    dispatch(fetchDsPhongVe(id));
  }, []);

  const {
    dsPhongVe: { thongTinPhim, danhSachGhe },
    error,
  } = useSelector((state) => state.dsPhongVe);
  const { currentUser } = useSelector((state) => state.user);

  const handleSelectSeat = (ghe) => {
    const isSelected = selectedSeats.some((seat) => seat.maGhe === ghe.maGhe);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat.maGhe !== ghe.maGhe));
    } else {
      setSelectedSeats([...selectedSeats, ghe]);
    }
  };

  const renderError = () => {
    return <div className="text-center text-red-500 font-medium">{error}</div>;
  };

  const renderSeats = () => {
    const rows = [];
    for (let i = 0; i < danhSachGhe?.length; i += 16) {
      rows.push(danhSachGhe.slice(i, i + 16));
    }

    return (
      <div className="flex flex-col gap-1">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            <div className="w-8 h-8 flex items-center justify-center text-gray-500 font-medium">{String.fromCharCode(65 + rowIndex)}</div>
            {row.map((ghe) => {
              const isSelected = selectedSeats.some((seat) => seat.maGhe === ghe.maGhe);
              const seatClasses = `
                w-8 h-8
                rounded-lg text-xs font-medium
                flex items-center justify-center
                transition-colors duration-200
                ${
                  ghe.daDat
                    ? "bg-red-500 hover:bg-red-500 cursor-not-allowed opacity-75 text-white"
                    : isSelected
                    ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                    : ghe.loaiGhe === "Vip"
                    ? "bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer"
                    : "bg-gray-600 hover:bg-gray-700 text-white cursor-pointer"
                }
              `;

              return (
                <button key={ghe.maGhe} className={seatClasses} disabled={ghe.daDat} onClick={() => handleSelectSeat(ghe)}>
                  {ghe.tenGhe}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const handleClickBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Vui lòng chọn ghế để đặt vé!");
      return;
    }
    if (!currentUser) {
      openModal();
      return;
    }
    const taiKhoanNguoiDung = currentUser.taiKhoan;
    const maLichChieu = thongTinPhim.maLichChieu;
    const danhSachVe = selectedSeats;
    handleDatVe({ taiKhoanNguoiDung, maLichChieu, danhSachVe });
  };

  const handleDatVe = async (data) => {
    try {
      await dispatch(fetchDatVe(data)).unwrap();
      toast.success("Đặt vé thành công!");
      navigate("/profile");
    } catch (error) {
      toast.error(error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-5xl mx-auto px-2 py-6 text-gray-950">
      {/* Movie Info */}
      <div className="text-center mb-6">
        {error ? (
          renderError()
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">{thongTinPhim?.tenPhim}</h2>
            <p className="text-gray-600 mb-1">
              {thongTinPhim?.tenCumRap} - {thongTinPhim?.tenRap}
            </p>
            <p className="text-gray-600">
              Suất chiếu: {thongTinPhim?.ngayChieu} {thongTinPhim?.gioChieu}
            </p>
          </>
        )}
      </div>

      {/* Screen */}
      <div className="relative mb-12">
        <div
          className="w-[80%] h-12 mx-auto bg-gradient-to-b from-white to-gray-300
            transform perspective-[100px] -rotate-x-3 shadow-lg"
        ></div>
        <p className="text-center text-gray-500 mt-3">Màn hình</p>
      </div>

      {/* Seats Layout */}
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <div className="min-w-[600px]">
          {" "}
          <div className="flex justify-center gap-1 mb-2">
            <div className="w-8"></div>
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="w-8 text-center text-gray-500 text-sm">
                {(i + 1).toString().padStart(2, "0")}
              </div>
            ))}
          </div>
          {renderSeats()}
        </div>
      </div>

      {/* Seat Types Info */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gray-600"></div>
          <span className="text-sm">Ghế thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-yellow-500"></div>
          <span className="text-sm">Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-red-500 opacity-75"></div>
          <span className="text-sm">Ghế đã đặt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-500"></div>
          <span className="text-sm">Ghế đang chọn</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-tr from-white to-green-100 rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Thông tin đặt vé</h3>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">{thongTinPhim?.tenPhim}</h2>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <div className="text-gray-500 sm:w-24 sm:flex-shrink-0">Cụm rạp:</div>
                      <div className="font-medium text-gray-800">{thongTinPhim?.tenCumRap}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <div className="text-gray-500 sm:w-24 sm:flex-shrink-0">Rạp:</div>
                      <div className="font-medium text-gray-800">{thongTinPhim?.tenRap}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <div className="text-gray-500 sm:w-24 sm:flex-shrink-0">Địa chỉ:</div>
                      <div className="text-gray-600">{thongTinPhim?.diaChi}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <div className="text-gray-500 sm:w-24 sm:flex-shrink-0">Suất chiếu:</div>
                      <div>
                        <span className="font-medium text-gray-800">
                          {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-3">
              <div className="font-medium text-gray-700 w-full">Ghế đã chọn:</div>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((ghe) => (
                  <div key={ghe.maGhe} className="flex items-center bg-green-50 border border-green-200 rounded-full px-3 py-1">
                    <span className={`w-6 h-6 rounded-full ${ghe.loaiGhe === "Vip" ? "bg-yellow-500" : "bg-green-500"}  text-white flex items-center justify-center text-sm mr-2`}>{ghe.tenGhe}</span>
                    <span className="text-green-700 font-medium">{ghe.giaVe.toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between items-center">
              <div className="text-gray-700 font-medium">Tổng tiền:</div>
              <div className="text-2xl font-bold text-green-600">{selectedSeats.reduce((sum, ghe) => sum + ghe.giaVe, 0).toLocaleString()}đ</div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg mt-4 transition-colors duration-200" onClick={handleClickBooking}>
              Đặt vé
            </button>
          </div>
        </div>
      )}

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CinemaBooking;
