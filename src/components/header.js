import React, { useState, Component, useContext } from 'react';
import _img from './images/background1.jpg'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import logo_notification from './images/noti.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF , faInstagram} from '@fortawesome/free-brands-svg-icons';
import CartIcon from './images/shopping-cart-solid.svg'
import {DataContext} from '../contextAPI/dataContext'
import LogoImg from './images/abcd.jpeg';
import '../App.css'
import InputSearch from '../components/input-search';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const a = {
 height:"15px",
 width:"20px",
}

const b = {
  height:"15px",
  width:"20px",
}

const navCart ={
  cursor:'pointer',
  position:'relative',
}

const span ={
  position: 'absolute',
  background:'red',
  fontSize:'10px',
  top:'-5px',
  right:'-3px',
  color:'white',
  padding:'3px 5px',
  borderRadius:'50%',
}



const _Navbar = (props) => {
  const text={
    textDecoration:"none",
  }
  const [isOpen, setIsOpen] = useState(false);
  
  const {cartItems, name, logOut} = useContext(DataContext)

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="Header">
      <div id="_Navbar">
        <Navbar color="" light expand="md">
          <NavbarBrand>
            <Link to="/" style={text}>Trang chủ</Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                {name!="ADMIN" && <NavLink>
                    <Link to="/admin" style={text}>Kênh bán hàng</Link>
                </NavLink>}
              </NavItem>
              <NavItem>
                <NavLink>
                <a href="https://www.facebook.com/drnguyenvanchinh/"><FontAwesomeIcon id="icon_fb" icon={faFacebookF} style={a}/></a>
                <a href="https://www.facebook.com/drnguyenvanchinh/"><FontAwesomeIcon id="icon_fb" icon={faInstagram} style={b}/></a>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {(name!="ADMIN") &&
                  <NavLink>
                    <Link to="/notification/" style={text}><img id="logo_noti" src={logo_notification}></img>Thông báo</Link>
                  </NavLink>
                }
                  </NavItem>
                  <NavItem>
                    {
                      (name!="ADMIN") && 
                      <NavLink>
                        <Link to="/help/" style={text}>Trợ giúp</Link>
                      </NavLink>
                    }
                  </NavItem>
                  <NavItem>
                  <NavLink>
                  {
                    (!name) && <Link to="/register/" style={text}>Đăng ký</Link>
                  }
                  {
                    (name) && <Link to="/login/" style={text}>Hello {name}</Link>
                  }

                  </NavLink>
                  </NavItem>
                  <NavItem>
                  <NavLink>
                  {
                    (!name) && <Link to="/login/" style={text}>Đăng nhập</Link>
                  }
                  {
                    (name) && <Link href="/" style={text} onClick={logOut}> Đăng xuất</Link>

                  }

                  </NavLink>
                  </NavItem>
                  <NavItem>
                    { (name!="ADMIN") &&
                    <NavLink style={navCart}>
                    <span style={span}>{cartItems.length}</span>
                      <Link to='/cart'>
                        <img src={CartIcon} alt="" width="20"/>
                      </Link>
                    </NavLink>
                    }
                  </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
        {name != "ADMIN" && 
          <InputSearch/>
        }
        
      </div>
  );
}

export default _Navbar;

