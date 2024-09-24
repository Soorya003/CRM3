import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import '../styles/Sidebar.css'
const Sidebar = () => {
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <>
      <div className="sidebar">
        <ul>
          {userRole === "admin" ? (
            <>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/product-post">Product Post</NavLink>
              </li>
              <li>
                <NavLink to="/view-complaints">View Complaints</NavLink>
              </li>
              <li>
                <NavLink to="/update-complaint-status">
                  Update Complaint Status
                </NavLink>
              </li>
              <li>
                <NavLink to="/view-feedback">View Feedback</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/buy-product">Buy Product</NavLink>
              </li>
              <li>
                <NavLink to="/post-complaint">Post Complaint</NavLink>
              </li>
              <li>
                <NavLink to="/see-complaint-status">
                  See Complaint Status
                </NavLink>
              </li>
              <li>
                <NavLink to="/give-feedback">Give Feedback</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
