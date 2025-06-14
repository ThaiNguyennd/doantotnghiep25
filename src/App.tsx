import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import EbooksPage from './pages/EbooksPage';
import AudiobooksPage from './pages/AudiobooksPage';
import FreeBooksPage from './pages/FreeBooksPage';
import BookDetailPage from './pages/BookDetailPage';
import ReadBookPage from './pages/ReadBookPage';
import DashboardPage from './pages/admin/DashboardPage';
import BooksPage from './pages/admin/BooksPage';
import UsersPage from './pages/admin/UsersPage';
import TagsPage from './pages/admin/TagsPage';

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
                    <Route path="books/:id" element={<BookDetailPage />} />
                    <Route path="read/:id" element={<ReadBookPage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="tags" element={<TagsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
