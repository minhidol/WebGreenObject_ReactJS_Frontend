import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class MenuSort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpenPrice : false,
            dropdownOpenStar : false,
            dropdownOpenTime : false,
        }
        this.setDropdownOpenPrice = this.setDropdownOpenPrice.bind(this);
        this.setDropdownOpenStar = this.setDropdownOpenStar.bind(this);
        this.setDropdownOpenTime = this.setDropdownOpenTime.bind(this);
    }

    setDropdownOpenPrice() {
        this.setState({dropdownOpenPrice: !this.state.dropdownOpenPrice,})
    }

    setDropdownOpenStar() {
        this.setState({dropdownOpenStar: !this.state.dropdownOpenStar,})
    }

    setDropdownOpenTime() {
        this.setState({dropdownOpenTime: !this.state.dropdownOpenTime,})
    }
    
    render() {
        return(
            <Row style={{
                marginTop:'25px',
                marginBottom:'30px',
                marginLeft:'5px'
            }}>
                <Col sm="3"> 
                    <Dropdown isOpen={this.state.dropdownOpenPrice} 
                              toggle={() => this.setDropdownOpenPrice()}
                              >
                        <DropdownToggle caret style={{
                                                        marginTop:'10px',
                                                        backgroundColor:'white', 
                                                        color:'#999', 
                                                        padding:'10px',
                                                        border:'1px solid #dedede'}}>
                            Sắp xếp theo giá
                        </DropdownToggle>
                        <DropdownMenu>
                            <Link to='/category/price-down-to-up'><DropdownItem>Từ thấp đến cao</DropdownItem></Link>
                            <Link to='/category/price-up-to-down'><DropdownItem>Từ cao đến thấp</DropdownItem></Link>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
    
                <Col sm="4">
                    <Dropdown isOpen={this.state.dropdownOpenStar} toggle={() => this.setDropdownOpenStar()}>
                        <DropdownToggle caret style={{
                                                        marginTop:'10px',
                                                        backgroundColor:'white', 
                                                        color:'#999', 
                                                        padding:'10px',
                                                        border:'1px solid #dedede',
                                                        }}>
                            Xếp hạng theo đánh giá
                        </DropdownToggle>
                        
                        <DropdownMenu>
                            <Link to='/category/star-down-to-up'><DropdownItem>Từ thấp đến cao</DropdownItem></Link>
                            <Link to='/category/star-up-to-down'><DropdownItem>Từ cao đến thấp</DropdownItem></Link>
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col sm="3" style={{}}>
                    <Dropdown isOpen={this.state.dropdownOpenTime} toggle={() => this.setDropdownOpenTime()}>
                        <DropdownToggle caret style={{
                                                        marginTop:'10px',
                                                        backgroundColor:'white', 
                                                        color:'#999', 
                                                        padding:'10px',
                                                        border:'1px solid #dedede',
                        }}>
                            Sắp xếp thời gian
                        </DropdownToggle>
                        
                        <DropdownMenu>
                            <Link to='/category/time-up-to-down'><DropdownItem>Sản phẩm cập nhật gần đây</DropdownItem></Link>
                            <Link to='/category/time-down-to-up'><DropdownItem>Sản phẩm tồn kho</DropdownItem></Link>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
        );
    }
}

export default MenuSort;