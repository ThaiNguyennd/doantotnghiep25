import React from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const BooksPage: React.FC = () => {
  const books = [
    {
      id: 1,
      title: 'Đắc Nhân Tâm',
      author: 'Dale Carnegie',
      category: 'Tự lực',
      price: '89.000đ',
      status: 'active'
    },
    {
      id: 2,
      title: 'Nhà Giả Kim',
      author: 'Paulo Coelho',
      category: 'Tiểu thuyết',
      price: '79.000đ',
      status: 'active'
    },
    // Add more books as needed
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sách</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <FaPlus className="mr-2" />
          Thêm sách mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className="border rounded-lg px-4 py-2"
          />
          <select className="border rounded-lg px-4 py-2">
            <option value="">Tất cả thể loại</option>
            <option value="fiction">Tiểu thuyết</option>
            <option value="business">Kinh doanh</option>
            <option value="self-help">Tự lực</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
            Lọc
          </button>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên sách
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tác giả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thể loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{book.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    book.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Hiển thị 1-10 của 100 kết quả
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
            Trước
          </button>
          <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksPage; 