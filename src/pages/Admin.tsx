import SideBar from '../components/SideBar.tsx';
import Users from '../components/Users.tsx';

const Admin = () => {
    return (
        <div className="flex top-16 relative">
            <SideBar></SideBar>
            <Users />
        </div>
    );
};

export default Admin;
