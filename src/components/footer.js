import React, {Component} from "react"
import {Row, Col} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import LogoImg from './images/abcd.jpeg';


const HoverText = styled.p`
	:hover {
		color: #7aaa19;
		cursor: pointer;
	}
`
const a = {
    
    height: "35px",
    width:"40px",
    borderRight:"groove 2px #6686cb",
    padding:"10px",
    paddingLeft:"10px"
}

const logofacebook = {
    width:"30%",
    color:"white"
}
const titlefacebook ={
    width:"60%"
}
const connect_facbook={
    background:"#4867aa",
    width:"180px",
    height:"35px",
    marginBottom:"5px",
    marginLeft:"0px",
    marginTop:"28px"
}

const connect_insta={
    background:"#FF7F00",
    width:"180px",
    height:"35px",
    marginBottom:"5px",
    marginLeft:"0px",
    marginTop:"28px"
}

const b = {
    
    height: "35px",
    width:"40px",
    borderRight:"groove 2px #FF7F00",
    padding:"10px",
    paddingLeft:"10px"
}
class Footer extends Component{
    
    render(){
        return(
            <div id= "footer">
                <div id="main">
                <Row>
                    <Col sm="3">
                        <div style={{marginLeft:'15px'}} className="banquyen">
                            <h2>Bản quyền thuộc về</h2>
                        </div>
                        <div id="logo_header">
                            <Link to="/"><img src={LogoImg} width="150px" style={{marginTop:'-50px',marginLeft:'31%'}} /></Link>
                        </div>
                    </Col>
                    <Col sm="3">
                        <div id="_connect">
                            <h2>Kết nối với chúng tôi</h2>
                            <Row style={connect_facbook} id="facebook_footer">
                                <a href="https://www.facebook.com/drnguyenvanchinh/">
                                    <div style={logofacebook}>
                                        <HoverText><FontAwesomeIcon id="icon_fb" icon={faFacebookF} style={a}/></HoverText>
                                    </div>
                                </a>
                                <a href="https://www.facebook.com/drnguyenvanchinh/">
                                    <div style={titlefacebook}>
                                        <p id="title_icon">Facebook</p>
                                    </div>
                                </a>
                            </Row>
                            <Row style={connect_insta} id="facebook_footer">
                                <a href="https://www.facebook.com/drnguyenvanchinh/">
                                    <div style={logofacebook}>
                                        <HoverText><FontAwesomeIcon id="icon_fb" icon={faInstagram} style={b}/></HoverText>
                                    </div>
                                </a>
                                <a href="https://www.facebook.com/drnguyenvanchinh/">
                                    <div style={titlefacebook}>
                                        <p id="title_icon">Instagram</p>
                                    </div>
                                </a>
                            </Row>
                        </div>
                        
                    </Col>
                     <Col sm="3">
                        <div className="support">
                        <h2>Hỗ trợ</h2>
                        <ul style={{marginTop:'20px', marginLeft:'-20px'}}>
                            <li style={{paddingTop:'10px'}}><Link to='/'>Quy định mua hàng</Link></li>
                            <li style={{paddingTop:'10px'}}><Link to='/'>Chính sách hỗ trợ</Link></li>
                            <li style={{paddingTop:'10px'}}><Link to='/'>Điều khoản sử dụng</Link></li>
                        </ul>
                        </div>
                    </Col>
                    <Col sm="3">
                        <div className='lienhe'>
                            <h2>Liên hệ</h2>
                            <p style={{paddingTop:'20px'}}><span style={{fontWeight:600}}>Email:</span> ĐNT@gmail.com</p>
                        </div>
                    </Col> 
                </Row>
                </div>
            </div>
        )
    }
}

export default Footer;