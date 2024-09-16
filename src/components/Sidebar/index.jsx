import React from 'react';
import { FaHome, FaSearch, FaBell, FaEnvelope, FaUsers, FaUserAlt, FaEllipsisH } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-full w-[276px] bg-transparent fixed text-white flex flex-col justify-between p-4">
      <div>
        <div className="mb-8">
          <span className="text-2xl font-bold">X</span>
        </div>
        
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaHome size={20} />
            <span className="font-bold">Beranda</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaSearch size={20} />
            <span>Jelajahi</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaBell size={20} />
            <span>Notifikasi</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaEnvelope size={20} />
            <span>Pesan</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaUsers size={20} />
            <span>Komunitas</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaUserAlt size={20} />
            <span>Profil</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
            <FaEllipsisH size={20} />
            <span>Lainnya</span>
          </li>
        </ul>
      </div>
      
      {/* Posting Button */}
      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4 hover:bg-blue-600">Posting</button>
        
        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <div>
            <h4 className="font-bold">urbluesky_</h4>
            <p className="text-sm text-gray-400">@urbluesky__</p>
          </div>
          <FaEllipsisH size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
