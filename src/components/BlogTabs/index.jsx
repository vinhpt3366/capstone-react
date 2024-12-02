import { useState } from "react";
import { Clock, Star, Tag } from "lucide-react";

const BlogTabs = () => {
  const [activeTab, setActiveTab] = useState("news");

  const tabs = [
    {
      id: "news",
      label: "Điện Ảnh 24h",
      icon: <Clock className="w-4 h-4" />,
      content: [
        {
          id: 1,
          title: "TENET công bố ngày khởi chiếu chính thức tại Việt Nam",
          excerpt: "Đêm qua theo giờ Việt Nam, hãng phim Warner Bros. đưa ra thông báo chính thức về ngày khởi chiếu cho bom tấn TENET tại các thị trường bên ngoài Bắc Mỹ, trong đó có Việt Nam.",
          image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
          category: "Tin Mới",
        },
        {
          id: 2,
          title: "Khi phụ nữ không còn ở thế trốn chạy của nạn nhân",
          excerpt: "Là bộ phim tâm lý li kỳ với chủ đề tội phạm, Bằng Chứng Vô Hình mang đến một góc nhìn mới về hình ảnh những người phụ nữ thời hiện đại.",
          image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
          category: "Tin Mới",
        },
      ],
    },
    {
      id: "reviews",
      label: "Review",
      icon: <Star className="w-4 h-4" />,
      content: [
        {
          id: 3,
          title: "Review: Diễn viên đặc biệt của Bằng Chứng Vô Hình",
          excerpt: "Bằng Chứng Vô Hình tiết lộ thêm với khán giả một diễn viên vô cùng đặc biệt, đi diễn như đi chơi và không hề nghe theo sự chỉ đạo của đạo diễn.",
          image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
          category: "Review",
        },
      ],
    },
    {
      id: "promotions",
      label: "Khuyến mãi",
      icon: <Tag className="w-4 h-4" />,
      content: [
        {
          id: 4,
          title: "Tháng 7 này, những ưu đãi bạn không thể bỏ lỡ!",
          excerpt: "Danh sách những ưu đãi hấp dẫn cho các tín đồ điện ảnh trong tháng 7.",
          image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
          category: "Khuyến mãi",
        },
      ],
    },
  ];
  const mainReviews = [
    {
      title: "Kẻ Vô Hình - Còn gì đáng sợ hơn kẻ giết người bệnh hoạn vô hình?",
      description: "Phiên bản hiện đại của The Invisible Man là một trong những phim kinh dị xuất sắc nhất năm nay.",
      image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
      category: "Review",
    },
    {
      title: "Cậu Bé Ma 2 - Bạn trai của 'bé Beo' là đây chứ đâu xa",
      description: "Brahms: The Boy II có những màn hù dọa ấn tượng nhưng cái kết lại không tương xứng với phần mở đầu hứa hẹn.",
      image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
      category: "Review",
    },
  ];

  const sideReviews = [
    {
      title: "Nhím Sonic - Cười thả ga cùng chàng nhím siêu thanh",
      image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
    },
    {
      title: "Tháng Năm Hạnh Phúc Ta Từng Có - Buông bỏ chưa...",
      image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
    },
    {
      title: "Sắc Đẹp Dối Trá - Hương Giang kể chuyện đời...",
      image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
    },
    {
      title: "Birds of Prey - Màn lột xác hoành tráng của Harley Quinn",
      image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
    },
  ];

  return (
    <div className="max-w-[1200px] px-4 mx-auto pt-6" id="blog-tabs">
      {/* Custom Tabs */}
      <div className="relative">
        <div className="flex">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-3 
                font-medium text-sm cursor-pointer
                transition-colors duration-200
                ${activeTab === tab.id ? "text-red-500" : "text-gray-600 hover:text-gray-900"}
                after:content-['']
                after:absolute after:bottom-0 after:left-0 
                after:w-full after:h-0.5
                after:bg-red-500
                after:transition-transform after:duration-200
                after:scale-x-0
                ${activeTab === tab.id ? "after:scale-x-100" : ""}
              `}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />
      </div>

      {/* Tab Content */}
      <div className="mt-6 mb-12">
        {tabs.map((tab) => (
          <div key={tab.id} className={`${activeTab === tab.id ? "block" : "hidden"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tab.content.map((article) => (
                <div key={article.id} className="group cursor-pointer">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-red-500">{article.category}</div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-500 transition-colors">{article.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Reviews */}
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-6">
              {mainReviews.map((review, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                    <img src={review.image} alt={review.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold leading-tight text-gray-800 group-hover:text-red-500 transition-colors">{review.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Reviews */}
          <div className="col-span-4 space-y-4">
            {sideReviews.map((review, index) => (
              <div key={index} className="flex gap-4 group cursor-pointer">
                <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded">
                  <img src={review.image} alt={review.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h3 className="text-sm font-medium leading-tight text-gray-800 group-hover:text-red-500 transition-colors">{review.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTabs;
