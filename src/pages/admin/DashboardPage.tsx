import React from 'react';
import { FaBook, FaUsers, FaDownload, FaStar } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Tổng số sách',
      value: '10,234',
      icon: <FaBook className="w-8 h-8 text-blue-500" />,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Người dùng',
      value: '45,678',
      icon: <FaUsers className="w-8 h-8 text-green-500" />,
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Lượt tải',
      value: '89,123',
      icon: <FaDownload className="w-8 h-8 text-purple-500" />,
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Đánh giá',
      value: '4.8',
      icon: <FaStar className="w-8 h-8 text-yellow-500" />,
      change: '+0.2',
      changeType: 'increase'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <div className={`mt-4 text-sm ${
              stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
            }`}>
              {stat.change} so với tháng trước
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium text-gray-800">Sách mới được thêm</p>
                <p className="text-sm text-gray-500">Đắc Nhân Tâm - Dale Carnegie</p>
              </div>
              <span className="text-sm text-gray-500">2 giờ trước</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 