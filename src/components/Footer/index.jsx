const Footer = () => {
  const footerLinks = {
    information: {
      title: "Information",
      links: [
        { text: "Our History", href: "#" },
        { text: "Partners", href: "#" },
        { text: "Info Pages", href: "#" },
        { text: "Offices", href: "#" },
        { text: "Work in Getit", href: "#" },
      ],
    },
    customers: {
      title: "Customers",
      links: [
        { text: "Minds", href: "#" },
        { text: "Help", href: "#" },
        { text: "Info", href: "#" },
        { text: "Security", href: "#" },
        { text: "See all", href: "#" },
      ],
    },
    services: {
      title: "Services",
      links: [
        { text: "Storage", href: "#" },
        { text: "Technology", href: "#" },
        { text: "Customer Experience", href: "#" },
        { text: "Organization", href: "#" },
        { text: "Sites & Servers", href: "#" },
      ],
    },
    solutions: {
      title: "Solutions",
      links: [
        { text: "Get Commerce Getitpay", href: "#" },
        { text: "Get Commerce Cloud", href: "#" },
      ],
    },
  };

  const paymentMethods = [
    {
      name: "Bring",
      src: "https://movie0706.cybersoft.edu.vn/hinhanh/cgv.png",
    },
    { name: "Klarna", src: "https://movie0706.cybersoft.edu.vn/hinhanh/cinestar.png" },
    { name: "Mastercard", src: "https://movie0706.cybersoft.edu.vn/hinhanh/galaxy-cinema.png" },
    { name: "Visa", src: "https://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png" },
    { name: "Vipps", src: "https://movie0706.cybersoft.edu.vn/hinhanh/lotte-cinema.png" },
    { name: "Svea", src: "https://movie0706.cybersoft.edu.vn/hinhanh/megags.png" },
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {paymentMethods.map((method, index) => (
              <img key={index} src={method.src} alt={`${method.name} logo`} className="h-8 object-contain" />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex mt-8 text-sm text-gray-400 items-center justify-center">© 2023 Getit Digital</div>
      </div>
    </footer>
  );
};

export default Footer;
