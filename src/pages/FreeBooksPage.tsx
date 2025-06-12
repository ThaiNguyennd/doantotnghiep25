import React from 'react';
import FeaturedBooks from '../components/FeaturedBooks';

const FreeBooksPage: React.FC = () => {
  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Sách Miễn Phí</h1>
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Khám phá kho sách miễn phí</h2>
          <p className="text-gray-700">
            Tận hưởng hàng nghìn đầu sách miễn phí chất lượng cao, được chọn lọc kỹ lưỡng từ các tác giả nổi tiếng.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="col-span-full mb-6">
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 border rounded-lg">
                <option value="">Sắp xếp theo</option>
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="rating">Đánh giá cao</option>
              </select>
              <select className="px-4 py-2 border rounded-lg">
                <option value="">Thể loại</option>
                <option value="fiction">Tiểu thuyết</option>
                <option value="business">Kinh doanh</option>
                <option value="self-help">Tự lực</option>
                <option value="education">Giáo dục</option>
              </select>
            </div>
          </div>
        </div>
        <FeaturedBooks />
      </div>
    </main>
  );
};

export default FreeBooksPage; 