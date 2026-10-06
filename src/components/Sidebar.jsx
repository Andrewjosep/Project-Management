import React from 'react'
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar bg-dark text-light p-3">
            <h5 className="mb-4">
                Menu
            </h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <NavLink to="/" className="nav-link text-light">
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink to="/projects" className="nav-link text-light">
                        Projects
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink to="/tasks" className="nav-link text-light">
                        Tasks
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink to="/team" className="nav-link text-light">
                        Team
                    </NavLink>
                </li>
                {/* <li className="nav-item mb-2">
                    <NavLink to="/profile" className="nav-link text-light">
                        Profile
                    </NavLink>
                </li> */}
            </ul>

        </div>
    )
}

export default Sidebar
