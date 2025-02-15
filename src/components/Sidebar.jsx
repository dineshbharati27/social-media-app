import React from 'react';
import { Home, Search, Film, MessageCircle, PlusSquare, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home />, label: 'Feed', link: "" },
    { icon: <Search />, label: 'Search', link: "search" },
    { icon: <MessageCircle />, label: 'Messages', link: "messages" },
    { icon: <Film />, label: 'My Blogs', link: "myblogs" },
    { icon: <PlusSquare />, label: 'Create', link: "create" },
    { icon: <User />, label: 'Profile', link: "profile" },  
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="w-1/6 h-full p-3 pt-5"> {/* Slightly reduced padding */}
      <h1 className="text-3xl font-bold pl-4 mb-8">Blog App</h1> {/* Reduced to 3xl for the logo */}
      <ul className="pl-4">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link}>
            <li
              className="flex items-center space-x-4 py-3 cursor-pointer hover:bg-gray-200 rounded-lg p-2"
            >
              <div className="text-2xl">{item.icon}</div> {/* Icon size reduced to 2xl */}
              <span className="text-lg">{item.label}</span> {/* Label size reduced to lg */}
            </li>
          </Link>
        ))}
      </ul>
      <div onClick={handleLogout} className="flex items-center space-x-4 py-3 pl-6 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
        <div className='text-2xl'><LogOut/></div>
        <span className='text-lg'>Logout</span>
      </div>

  </div>
  
  );
};

export default Sidebar;