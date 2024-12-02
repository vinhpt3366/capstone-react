import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { fetchRegister } from "../../../store/slices/user.slice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    hoTen: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.taiKhoan.trim() === "") {
      toast.error("Vui lòng nhập tài khoản");
      document.getElementById("taiKhoan")?.focus();
      return;
    }
    if (formData.matKhau.trim() === "") {
      toast.error("Vui lòng nhập mật khẩu");
      document.getElementById("matKhau")?.focus();
      return;
    }
    if (formData.nhapLaiMatKhau.trim() === "") {
      toast.error("Vui lòng nhập lại mật khẩu");
      document.getElementById("nhapLaiMatKhau")?.focus();
      return;
    }
    if (formData.matKhau !== formData.nhapLaiMatKhau) {
      toast.error("Mật khẩu nhập lại không khớp");
      document.getElementById("nhapLaiMatKhau")?.focus();
      return;
    }
    if (formData.hoTen.trim() === "") {
      toast.error("Vui lòng nhập họ tên");
      document.getElementById("hoTen")?.focus();
      return;
    }
    if (formData.email.trim() === "") {
      toast.error("Vui lòng nhập email");
      document.getElementById("email")?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không hợp lệ");
      document.getElementById("email")?.focus();
      return;
    }
    handleRegister(formData);
  };

  const handleRegister = async (formData) => {
    try {
      await dispatch(fetchRegister(formData)).unwrap();
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-blue-500">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Đăng ký</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="taiKhoan" className="block text-sm font-medium text-gray-700">
                Tài khoản
              </label>
              <input
                id="taiKhoan"
                name="taiKhoan"
                type="text"
                value={formData.taiKhoan}
                onChange={handleChange}
                placeholder="Nhập tài khoản"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="matKhau" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="matKhau"
                  name="matKhau"
                  type={showPassword ? "text" : "password"}
                  value={formData.matKhau}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <i
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-0 top-3 material-icons-outlined text-muted mr-4"
                >
                  {!showPassword ? "visibility" : "visibility_off"}
                </i>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="nhapLaiMatKhau" className="block text-sm font-medium text-gray-700">
                Nhập lại mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="nhapLaiMatKhau"
                  name="nhapLaiMatKhau"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.nhapLaiMatKhau}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <i
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="absolute right-0 top-3 material-icons-outlined text-muted mr-4"
                >
                  {!showConfirmPassword ? "visibility" : "visibility_off"}
                </i>
              </div>
            </div>

            <div>
              <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700">
                Họ Tên
              </label>
              <input
                id="hoTen"
                name="hoTen"
                type="text"
                value={formData.hoTen}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Đăng ký
          </button>
        </form>

        <div className="text-center">
          <span className="text-gray-600">Bạn đã có tài khoản? </span>
          <Link to="/login" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-blue-500 dark:hover:text-blue-500">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
