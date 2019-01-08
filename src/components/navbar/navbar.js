import React from "react";
import {
    Navbar,
    NavbarBrand, } from "reactstrap";
import './navbar.css';

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="NavigationBar">
                <Navbar className="NavBar" light expand="md">
                    <NavbarBrand>
                        {/*<img src={ Wifiku } alt="Logo" />*/}
                        <strong>Intelligent System Project</strong>
                    </NavbarBrand>
                    {/*<Nav className="ml-auto" navbar>*/}
                        {/*<NavItem>*/}
                            {/*<NavLink href="/components/">Image-Classification</NavLink>*/}
                        {/*</NavItem>*/}
                    {/*</Nav>*/}
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;
