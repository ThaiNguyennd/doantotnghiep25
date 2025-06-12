import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import EbooksPage from './pages/EbooksPage';
import AudiobooksPage from './pages/AudiobooksPage';
import FreeBooksPage from './pages/FreeBooksPage';
import DashboardPage from './pages/admin/DashboardPage';
import BooksPage from './pages/admin/BooksPage';
import UsersPage from './pages/admin/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="audiobooks" element={<AudiobooksPage />} />
          <Route path="free-books" element={<FreeBooksPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
