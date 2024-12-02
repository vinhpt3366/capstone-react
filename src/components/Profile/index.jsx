import { useEffect } from "react";
import { Ticket, MapPin, Calendar, Clock, CreditCard, User, Mail, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTtNguoiDung } from "../../store/slices/ttNguoiDung.slice";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const BookingHistory = ({ thongTinDatVe }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Lịch Sử Đặt Vé</h2>

      <div className="grid gap-8">
        {thongTinDatVe.map((booking) => (
          <div key={booking.maVe} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{booking.tenPhim}</h3>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">Mã vé: {booking.maVe}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700 font-medium">{formatDate(booking.ngayDat)}</span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-500" />
                <span className="text-gray-700 font-medium">{booking.thoiLuongPhim} phút</span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-medium">{formatCurrency(booking.giaVe)}</span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Ticket className="w-6 h-6 text-orange-500" />
                <span className="text-gray-700 font-medium">{booking.danhSachGhe.length} ghế</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 text-lg">{booking.danhSachGhe[0].tenHeThongRap}</p>
                  <p className="text-blue-600 font-medium">{booking.danhSachGhe[0].tenRap}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Ghế: </span>
                {booking.danhSachGhe.map((ghe) => (
                  <span key={ghe.maGhe} className="inline-block bg-white px-2 py-1 rounded-md text-blue-600 text-sm font-medium mr-2 mb-2">
                    {ghe.tenGhe}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ttNguoiDung } = useSelector((state) => state.ttNguoiDung);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }
    dispatch(fetchTtNguoiDung(currentUser.taiKhoan));
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Thông tin tài khoản</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <User className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Tài khoản</p>
                  <p className="font-medium text-gray-800">{ttNguoiDung?.taiKhoan}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <User className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Họ tên</p>
                  <p className="font-medium text-gray-800">{ttNguoiDung?.hoTen}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Mail className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{ttNguoiDung?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Phone className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium text-gray-800">{ttNguoiDung?.soDT || "Chưa cập nhật"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {ttNguoiDung?.thongTinDatVe && <BookingHistory thongTinDatVe={ttNguoiDung?.thongTinDatVe} />}
      </div>
    </div>
  );
};

export default Profile;
