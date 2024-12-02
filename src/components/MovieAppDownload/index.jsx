const MovieAppDownload = () => {
  return (
    <div className="relative min-h-[80vh] w-full mt-12" id="movie-app-download">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img src="https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto py-20 max-w-[1200px] px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
            <p className="text-lg text-gray-300 mb-8">Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>

            {/* Download Button */}
            <div className="space-y-4">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium transition-colors w-full md:w-auto text-center">APP MIỄN PHÍ - TẢI VỀ NGAY!</button>
              <p className="text-sm text-gray-400">TIX có hai phiên bản iOS & Android</p>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="block relative">
            <div className="w-[300px] h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-10">
                  <div className="w-20 h-4 mx-auto mt-1 bg-gray-900 rounded-full"></div>
                </div>

                {/* App Screenshot */}
                <img src="https://demo1.cybersoft.edu.vn/static/media/banner-slider-3.33a486d1.jpg" alt="Movie App Screenshot" className="w-full h-full object-cover" />

                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-7 bg-black bg-opacity-50 flex items-center justify-between px-6">
                  <div className="flex items-center gap-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAppDownload;
