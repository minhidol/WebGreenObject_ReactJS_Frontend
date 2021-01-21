import React, { Component } from 'react';
//import {DataContext} from '../contextAPI/dataContext';
import {Link} from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';

class MenuSection extends Component {
    
    render() {
        return(
            <div class="menu_sort">
            <h2>Danh mục sản phẩm</h2>
            <hr></hr>
            <ul style={{paddingBottom:'20px', listStyle:'none'}}>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Tất cả'>Tất cả</Link></li>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Thời trang'>Thời trang</Link></li>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Phụ kiện'>Phụ kiện</Link></li>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Đồ chơi'>Đồ chơi</Link></li>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Đồ dùng học tập'>Đồ dùng học tập</Link></li>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Nhà cửa và đời sống'>Nhà cửa và đời sống</Link></li>
                <li style={{paddingBottom:'15px'}}><Link to='/category/Đồ nội thất'>Đồ nội thất</Link></li>
            </ul>
        </div>
        )
    }
}

export default MenuSection;