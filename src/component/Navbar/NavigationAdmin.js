import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { shadows } from '@mui/system';
import { Box } from "@mui/material";
export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ boxShadow: 3 }}>
    <nav>
      <div className="header">
        <NavLink to="/">
          <i className="fab fa-hive" /> Admin
        </NavLink>
      </div>
      <ul
        className="navbar-links"
        style={{ transform: open ? "translateX(0px)" : "" }}
      >
        <li>
          <NavLink to="/Verification" activeClassName="nav-active">
            Verification
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddCandidate" activeClassName="nav-active">
            Add Candidate
          </NavLink>
        </li>
        <li>
          <NavLink to="/Details" activeClassName="nav-active">
            <i className="far fa-registered" /> Details
          </NavLink>
        </li>
      </ul>
      <i onClick={() => setOpen(!open)} className="fas fa-bars burger-menu"></i>
    </nav>
    </Box>
  );
}
