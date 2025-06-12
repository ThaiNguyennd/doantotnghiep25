import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Về Waka</h3>
            <p className="text-gray-400 mb-4">
              Waka - Thư viện sách điện tử hàng đầu Việt Nam, mang đến cho bạn trải nghiệm đọc sách tuyệt vời.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">Giới thiệu</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Liên hệ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Chính sách bảo mật</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ebooks" className="text-gray-400 hover:text-white">Sách điện tử</Link>
              </li>
              <li>
                <Link to="/audiobooks" className="text-gray-400 hover:text-white">Sách nói</Link>
              </li>
              <li>
                <Link to="/free-books" className="text-gray-400 hover:text-white">Sách miễn phí</Link>
              </li>
              <li>
                <Link to="/summaries" className="text-gray-400 hover:text-white">Sách tóm tắt</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FaPhone className="w-5 h-5 mr-2" />
                <span>1900 545 482</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="w-5 h-5 mr-2" />
                <span>support@waka.vn</span>
              </li>
              <li className="text-gray-400 mt-4">
                Địa chỉ: Tầng 6, Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Waka. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 