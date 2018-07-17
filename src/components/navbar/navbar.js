import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from "reactstrap";
import './navbar.css';
import Wifiku from "../../Wifiku.jpg";

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="NavigationBar">
                <Navbar className="NavBar" light expand="md">
                    <NavbarBrand>
                        {/*<img src={ Wifiku } alt="Logo" />*/}
                        <strong>Wifiku</strong>
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">All Around you</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;
