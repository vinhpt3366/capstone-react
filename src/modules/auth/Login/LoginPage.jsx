import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../../store/slices/user.slice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetError } from "../../../store/slices/user.slice";
import { UserCircle2 } from "lucide-react";
export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [showMatKhau, setShowMatKhau] = useState(false);

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // validate
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
    dispatch(fetchLogin(formData));
  };

  useEffect(() => {
    document.getElementById("taiKhoan")?.focus();
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`${error}`);
      setFormData((prevData) => ({
        ...prevData,
        ["matKhau"]: "",
      }));
      document.getElementById("matKhau")?.focus();
    }
  }, [error]);

  useEffect(() => {
    if (currentUser && currentUser.maLoaiNguoiDung === "QuanTri") {
      toast.success("Đăng nhập thành công");
      // navigate("/admin");
      navigate("/");
    } else if (currentUser) {
      toast.success("Đăng nhập thành công");
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-blue-500">
              <UserCircle2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Đăng nhập</h2>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="taiKhoan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tài khoản
              </label>
              <input
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                value={formData.taiKhoan}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tài khoản"
                // required
              />
            </div>
            <div className="relative">
              <label htmlFor="matKhau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mật khẩu
              </label>
              <input
                type={showMatKhau ? "text" : "password"}
                name="matKhau"
                id="matKhau"
                value={formData.matKhau}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // required
              />
              <i
                onClick={() => {
                  setShowMatKhau(!showMatKhau);
                }}
                className="absolute right-0 top-10 material-icons-outlined text-muted mr-4 text-gray-500"
              >
                {!showMatKhau ? "visibility" : "visibility_off"}
              </i>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-2.5 text-center"
            >
              {isLoading ? "Đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="mb-0 text-slate-500 dark:text-zink-200">
              Bạn chưa có tài khoản ?{" "}
              <Link to="/register" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-blue-500 dark:hover:text-blue-500">
                {" "}
                Đăng ký
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
