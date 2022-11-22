import React from "react";
import {Link, Outlet} from "react-router-dom";
import styled, {css} from "styled-components"

const Navbar = ({children}) => {
    return (
        <Container>
        <Link to="/">Home</Link>
        <Spacer />
        <Link to="/projects">Projects</Link>

            {children}
            <Outlet />
        </Container>

    );
}

const Container = styled.div`
        text-align: center;
       position: absolute;
        top: 15px;
        width: 10px;
        `

const Spacer = styled.span`
margin-left: 25px;
`


export default Navbar;
