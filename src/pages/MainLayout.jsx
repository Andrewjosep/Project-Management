import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default MainLayout
