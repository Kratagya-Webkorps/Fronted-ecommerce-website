import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from '../_root/pages/productFields/SideBar';


const MainLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-row p-16">
        <SideBar/>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
