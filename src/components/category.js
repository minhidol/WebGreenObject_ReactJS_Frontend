import React, {Component} from "react"
import Fashion from './images/thoitrang.jpg'
import Furniture from './images/noithat.jpg'
import School from './images/dodunghoctap.jpg'
import HomeLife from './images/vatdung.jpg'
import Toy from './images/dochoi.jpg'
import Acc from './images/phukien.jpg'

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
  } from 'reactstrap';
import {Link} from 'react-router-dom'
const margin={
    marginTop:"10px"
};
class Category extends Component{
    
    componentDidMount(){
        console.log("Category did mount");
    }

    render(){
        return(
            <div className="container">
                <div className="title">
                    <h2 style={{color:"#333", fontSize: "32px"}}>Danh mục sản phẩm</h2>
                    <p style={{fontSize:'17px'}}>Cơ hội tìm kiếm trong hơn 100 sản phẩm</p>
                </div>
                <Row>
                <Col sm="4" style={{marginTop:'10px'}}>
                        <Card>
                            <Link to='/category/Thời trang' style={{marginTop:'10px'}}>
                                <img width="90%" src={Fashion} alt="Card image cap" style={{marginLeft:'5%', marginRight:'3%'}}/>
                            </Link>
                            <CardBody>
                                <CardTitle tag="h5" style={{textAlign:'center'}}>
                                    <Link to='/category/Thời trang' style={{fontSize:'18px'}}>Thời trang</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col sm="4" style={{marginTop:'10px'}}>
                        <Card>
                            <Link to='/category/Đồ nội thất' style={{marginTop:'10px'}}>
                                <img width="90%" src={Furniture} alt="Card image cap" style={{marginLeft:'5%', marginRight:'3%'}}/>
                            </Link>
                            <CardBody>
                                <CardTitle tag="h5" style={{textAlign:'center'}}>
                                    <Link to='/category/Đồ nội thất' style={{fontSize:'18px'}}>Đồ nội thất</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="4" style={{marginTop:'10px'}}>
                        <Card>
                            <Link to='/category/Đồ dùng học tập' style={{marginTop:'10px'}}>
                                <img width="90%" src={School} height='209' alt="Card image cap" style={{marginLeft:'5%', marginRight:'3%'}}/>
                            </Link>
                            <CardBody>
                                <CardTitle tag="h5" style={{textAlign:'center'}}>
                                    <Link to='/category/Đồ dùng học tập' style={{fontSize:'18px'}}>Đồ dùng học tập</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="4" style={{marginTop:'10px'}}>
                    <Card>
                            <Link to='/category/Nhà cửa và đời sống' style={{marginTop:'10px'}}>
                                <img width="90%" src={HomeLife} height='209' alt="Card image cap" style={{marginLeft:'5%', marginRight:'3%'}}/>
                            </Link>
                            <CardBody>
                                <CardTitle tag="h5" style={{textAlign:'center'}}>
                                    <Link to='/category/Nhà cửa và đời sống' style={{fontSize:'18px'}}>Nhà cửa và đời sống</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col sm="4" style={{marginTop:'10px'}}>
                    <Card>
                            <Link to='/category/Đồ chơi' style={{marginTop:'10px'}}>
                                <img width="90%" src={Toy} height='209' alt="Card image cap" style={{marginLeft:'5%', marginRight:'3%'}}/>
                            </Link>
                            <CardBody>
                                <CardTitle tag="h5" style={{textAlign:'center'}}>
                                    <Link to='/category/Đồ chơi' style={{fontSize:'18px'}}>Đồ chơi</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col sm="4" style={{marginTop:'10px'}}>
                    <Card>
                            <Link to='/category/Đồ chơi' style={{marginTop:'10px'}}>
                                <img width="90%" src={Acc} height='209' alt="Card image cap" style={{marginLeft:'5%', marginRight:'3%'}}/>
                            </Link>
                            <CardBody>
                                <CardTitle tag="h5" style={{textAlign:'center'}}>
                                    <Link to='/category/Đồ chơi' style={{fontSize:'18px'}}>Đồ chơi</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>                    
                </Row>
            </div>
        )
    }
}

export default Category;