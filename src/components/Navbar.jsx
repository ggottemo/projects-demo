import React from "react";
import {Link, Outlet} from "react-router-dom";

const Navbar = ({children}) => {
    return (
        <div>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Outlet/>
            {children}
        </div>

    );
}

export default Navbar;