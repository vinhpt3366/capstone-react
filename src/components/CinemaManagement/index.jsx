import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHtRap } from "../../store/slices/htRap.slice";
import { fetchLichChieuHtRap } from "../../store/slices/htRap.lichChieu.slice";
import { MA_NHOM } from "../../constants";
import MovieSchedule from "./CinemaSchedule";

const CinemaManagement = () => {
  const dispatch = useDispatch();
  const { htRap } = useSelector((state) => state.htRap);
  const { lichChieuHtRap } = useSelector((state) => state.lichChieuHtRap);

  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    dispatch(fetchHtRap());
  }, []);

  useEffect(() => {
    if (htRap?.length > 0) {
      fetchLichChieu(htRap[0].maHeThongRap);
    }
  }, [htRap]);

  useEffect(() => {
    if (lichChieuHtRap?.lstCumRap?.length > 0) {
      setSelectedBranch(lichChieuHtRap.lstCumRap[0]);
    }
  }, [lichChieuHtRap]);

  const fetchLichChieu = (maHeThongRap) => {
    if (selectedChain == maHeThongRap) return;
    const data = {
      maHeThongRap: maHeThongRap,
      maNhom: MA_NHOM,
    };
    setSelectedChain(maHeThongRap);
    dispatch(fetchLichChieuHtRap(data));
  };

  return (
    <div className="hidden md:block max-w-[1200px] mx-auto px-4 text-gray-950" id="cinema-management">
      <div className="flex h-[600px] w-full mx-auto border rounded-lg overflow-hidden bg-white">
        <div className={`w-1/8 border- bg-white`}>
          {htRap.map((chain) => (
            <div
              key={chain.biDanh}
              onClick={() => {
                fetchLichChieu(chain.maHeThongRap);
              }}
              className={`w-full p-4 flex items-center gap-3 h-20 hover:bg-gray-100 transition-all duration-300 relative
              ${selectedChain === chain.maHeThongRap ? "bg-gray-100" : ""}
              ${selectedChain === chain.maHeThongRap ? "after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-blue-500" : ""}
            `}
            >
              <div
                className={`w-12 h-12 rounded- overflow-hidden bg-white flex items-center justify-center border transition-transform duration-300
              ${selectedChain === chain.maHeThongRap ? "scale-110" : ""}
            `}
              >
                <img src={chain.logo} alt={chain.name} className="w-8 h-8 object-contain" />
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/3 border-r flex flex-col h-full">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            <div className="divide-y">
              {lichChieuHtRap &&
                lichChieuHtRap.lstCumRap.length > 0 &&
                lichChieuHtRap.lstCumRap.map((branch) => (
                  <div
                    key={branch.maCumRap}
                    onClick={() => setSelectedBranch(branch)}
                    className={`w-full p-4 text-left h-20 hover:bg-gray-50 transition-all duration-300 relative
              ${selectedBranch?.maCumRap === branch.maCumRap ? "bg-gray-50" : ""}
              ${selectedBranch?.maCumRap === branch.maCumRap ? "after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-blue-500" : ""}
            `}
                  >
                    <h3
                      className={`font-medium text-sm mb-1 transition-colors duration-300
              ${selectedBranch?.maCumRap === branch.maCumRap ? "text-blue-600" : ""}
            `}
                    >
                      {branch.tenCumRap}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{branch.diaChi}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <MovieSchedule selectedBranch={selectedBranch} />
      </div>
    </div>
  );
};

export default CinemaManagement;
