import { useSelector } from "react-redux";
import styles from "./Loading.module.css";

const Loading = () => {
  const { isLoading, loadingText } = useSelector((state) => state.loading);
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Loading Content */}
      <div className="relative bg-white rounded-lg shadow-xl p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className={styles.spinner}>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>

          {/* Text */}
          <p className="text-gray-700 font-medium text-center min-w-[200px]">{loadingText}</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
