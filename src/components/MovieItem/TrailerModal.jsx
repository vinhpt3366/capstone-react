import { X } from "lucide-react";

const TrailerModal = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen) return null;

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYoutubeId(trailerUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="absolute -right-3 top-2 z-20 transform -translate-y-full mb-2">
          <div className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={onClose} aria-label="Đóng">
            <X size={24} className="text-white hover:text-gray-300" />
          </div>
        </div>

        {/* Video container */}
        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
