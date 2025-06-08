import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
import Header from './components/Header.tsx';
import Users from './components/Users.tsx';
import Tags from './components/Tags.tsx';
import Login from './components/Login.tsx';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />{' '}
                {/* Nhóm route admin, tất cả đều bắt đầu bằng /admin */}
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Admin />} /> {/* /admin */}
                    <Route path="users" element={<Users />} />{' '}
                    <Route path="tags" element={<Tags />} />{' '}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
