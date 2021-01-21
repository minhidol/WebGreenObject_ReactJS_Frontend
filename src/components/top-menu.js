import React, { useState, useContext } from 'react';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { DataContext } from '../contextAPI/dataContext';

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
  DropdownItem,
  NavbarText
} from 'reactstrap';

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {cartItems, name, logOut} = useContext(DataContext)
  
  return (
    <div>
      <Navbar color="light" light expand="md">
        {/* <NavbarBrand href="/">trang chu</NavbarBrand>
        <NavbarToggler onClick={toggle} /> */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/seller">Kênh người bán</Link>
              </NavLink>
            </NavItem>

            <NavbarText>Kết nối</NavbarText>

            <NavItem>
                <NavLink >
                    <a href="https://www.facebook.com/drnguyenvanchinh/"><FontAwesomeIcon id="icon_fb" icon={faFacebookF} /></a>
                </NavLink>
            </NavItem>
            
            <NavItem>
                <NavLink>
                    <a href="https://www.facebook.com/drnguyenvanchinh/"><FontAwesomeIcon id="icon_fb" icon={faInstagram} /></a>
                </NavLink>
            </NavItem>
          </Nav>
          
          <Nav navbar>          
            <NavItem>
              <NavLink>
                <Link to='/news'>Thông báo</Link>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <Link to='/help'>Trợ giúp</Link>
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink>
                  {
                    (!name) && <Link to="/login/" >Đăng nhập</Link>
                  }
                  {
                    (name) && <Link href="/" onClick={logOut}> Đăng xuất</Link>

                  }
              </NavLink>
            </NavItem>
             
            <NavItem>
              <NavLink>
                  {
                    (!name) && <Link to="/register/">Đăng ký</Link>
                  }

                  {
                    (name) && <Link to="/login/" >Hello {name}</Link>
                  }
              </NavLink>
            </NavItem>
          </Nav>          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopMenu;