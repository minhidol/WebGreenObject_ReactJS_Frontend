import React, { Component } from 'react';
//import {DataContext} from '../contextAPI/dataContext';
import {Link} from "react-router-dom";

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
import { Row, Col } from 'reactstrap';
import MenuSection from '../components/menu-section';
import MenuSort from '../components/menu-sort';
import {DataContext} from '../contextAPI/dataContext';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const margin={
    marginTop:"10px",
    
};

const card={
    height:'100%'
}
const text_body={
    color:'red',
    marginTop:'50px'
}
const card_body={
    height:'15px',
   // marginTop:'10px'
}

const button={
    backgroundColor:'#e2492b',
    borderColor: "rgba(0,0,0,.09)!important",
    boxShadow: "inset 0 0.125rem 0.0625rem 0 rgba(0,0,0,.05)",
    color: "#fff",
    marginRight: "5%",
    fontSize: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "5px"
}


class SectionProducts extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {
            sectionItems: [],
            dropdownOpenPrice : false,
            dropdownOpenStar : false,
            dropdownOpenTime : false,
        }

        this.setDropdownOpenPrice = this.setDropdownOpenPrice.bind(this);
        this.setDropdownOpenStar = this.setDropdownOpenStar.bind(this);
        this.setDropdownOpenTime = this.setDropdownOpenTime.bind(this);

        this.Rerender = this.Rerender.bind(this);
        this.SortItems = this.SortItems.bind(this);
        this.compareNumbersPrice = this.compareNumbersPrice.bind(this);
        this.compareNumbersStar = this.compareNumbersStar.bind(this);
    }

    SortItems(section, type, order) {
        const data = JSON.parse(localStorage.getItem('products'));
        const itemsOrderStar = JSON.parse(localStorage.getItem('itemsOrderStar'));
        const itemsOrderPrice = JSON.parse(localStorage.getItem('itemsOrderPrice'));
        const itemsOrderTime = JSON.parse(localStorage.getItem('itemsOrderTime'));
        const { resultItems } = this.context;
        // const itemsOrderStar = data;
        // const itemsOrderPrice = data;
        // const itemsOrderTime = data;

        if (section == "Tất cả" && type == "price")
        {
            if(order) {
                return itemsOrderPrice;
            }
            else {
                return itemsOrderPrice.reverse();
            }
        }

        if (section == "Tất cả" && type == "star")
        {
            if(order) {
                return itemsOrderStar;
            }
            else {
                return itemsOrderStar.reverse();
            }
        }

        if (section == "Tất cả" && type == "time")
        {
            if(order) {
                return itemsOrderTime;
            }
            else {
                return itemsOrderTime.reverse();
            }
        }

        if (section != "Tất cả" && section != "Search" && type == "price")
        {
            let list = [];
            itemsOrderPrice.map(x => {
                if(x.category.includes(section)) {
                    list.push(x);
                }
            })

            if(order) {
                return list;
            }
            else {
                return list.reverse();
            }
        }

        if (section != "Tất cả" && section != "Search" && type == "star")
        {
            let list = [];
            itemsOrderStar.map(x => {
                if(x.category.includes(section)) {
                    list.push(x);
                }
            })

            if(order) {
                return list;
            }
            else {
                return list.reverse();
            }
        }

        if (section != "Tất cả" && section != "Search" && type == "time")
        {
            let list = [];
            itemsOrderTime.map(x => {
                if(x.category.includes(section)) {
                    list.push(x);
                }
            })

            if(order) {
                return list;
            }
            else {
                return list.reverse();
            }
        }

        if (section == "Search" && type == "price")
        {
            if(order) {
                return resultItems.sort(this.compareNumbersPrice);
            }
            else {
                return resultItems.sort(this.compareNumbersPrice).reverse();
            }
        }

        if (section == "Search" && type == "star")
        {
            if(order) {
                return resultItems.sort(this.compareNumbersStar);
            }
            else {
                return resultItems.sort(this.compareNumbersStar).reverse();
            }
        }

        if (section == "Search" && type == "time")
        {
            let items = [...resultItems];
            if(order) {
                return items; 
            }
            else {
                return items.reverse();
            }
        }
    }
    
    componentDidMount() {
        
        const section = this.props.match.params.section;
        const data = JSON.parse(localStorage.getItem('products'));

        let list = []
        switch(section) {
            case 'Tất cả':
                this.setState({
                    sectionItems: data,
                    section: 'Tất cả',
                })
                break;
            case 'price-down-to-up':
                list = this.SortItems("Search", "price", true);
                this.setState({
                    sectionItems: [...list],
                    section: "Search",
                })
                break;
            case 'price-up-to-down':
                list = this.SortItems("Search", "price", false);
                this.setState({
                    sectionItems: [...list],
                    section: "Search",
                })
                break;
            case 'time-down-to-up':
                list = this.SortItems("Search", "time", true);
                this.setState({
                    sectionItems: [...list],
                    section: "Search",
                })
                break;
            case 'time-up-to-down':
                list = this.SortItems("Search", "time", false);
                this.setState({
                    sectionItems: [...list],
                    section: "Search",
                })
                break;
            case 'star-down-to-up':
                list = this.SortItems("Search", "star", true);
                this.setState({
                    sectionItems: [...list],
                    section: "Search",
                })
                break;
            case 'star-up-to-down':
                list = this.SortItems("Search", "star", false);
                this.setState({
                    sectionItems: [...list],
                    section: "Search",
                })
                break;
            
            default:
                list = [];
                data.map(x => {
                    if(x.category.includes(section)) {
                        console.log(x)
                        list.push(x);
                    }
                })
                
                this.setState({
                    sectionItems: [...list],
                    section: section,
                })
        }
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

    Rerender(section_para) {
        
        //const section = this.props.match.params.section;
         //const section = this.props.match.params.section;
         const data = JSON.parse(localStorage.getItem('products'));
         let section = section_para;
         //const itemsOrderStar = JSON.parse(localStorage.getItem('itemsOrderStar'));
         //const itemsOrderPrice = JSON.parse(localStorage.getItem('itemsOrderPrice'));
         //const itemsOrderTime = JSON.parse(localStorage.getItem('itemsOrderTime'))
         
         let list = []
         switch(section) {
             case 'Tất cả':
                 this.setState({
                     sectionItems: data,
                     section: 'Tất cả',
                 })
                 break;
             case 'price-down-to-up':
                 list = this.SortItems(this.state.section, "price", true);
                 this.setState({
                     sectionItems: [...list],
                 })
                 break;
             case 'price-up-to-down':
                 list = this.SortItems(this.state.section, "price", false);
                 this.setState({
                     sectionItems: [...list],
                 })
                 break;
             case 'time-down-to-up':
                 list = this.SortItems(this.state.section, "time", true);
                 this.setState({
                     sectionItems: [...list],
                 })
                 break;
             case 'time-up-to-down':
                 list = this.SortItems(this.state.section, "time", false);
                 this.setState({
                     sectionItems: [...list],
                 })
                 break;
             case 'star-down-to-up':
                 list = this.SortItems(this.state.section, "star", true);
                 this.setState({
                     sectionItems: [...list],
                 })
                 break;
             case 'star-up-to-down':
                 list = this.SortItems(this.state.section, "star", false);
                 this.setState({
                     sectionItems: [...list],
                 })
                 break;
             //
             default:
                 list = [];
                 data.map(x => {
                     if(x.category.includes(section)) {
                         list.push(x);
                     }
                 })
                 
                 this.setState({
                     sectionItems: [...list],
                     section: section,
                 })
         }
 
         this.forceUpdate();
     }
     compareNumbersPrice(a, b) {
        let a_value = a.price.replace('.', '').replace(" đ", '');
        let b_value = b.price.replace('.', '').replace(" đ", '');

        return parseInt(a_value) - parseInt(b_value);
    }

    compareNumbersStar(a, b) {

        let a_value = a.count_star_people > 0 ?  a.count_star_people / a.count_star : 0;
        let b_value = b.count_star_people > 0 ?  b.count_star_people / b.count_star : 0;

        return a_value - b_value;
    }
    
    render() {
        const { sectionItems } = this.state;
        return(
            <Container>
                <Row>
                    <Col sm="3">
                    <div class="menu_sort">
                        <h2>Danh mục sản phẩm</h2>
                        <hr></hr>
                        <ul style={{paddingBottom:'20px', listStyle:'none'}}>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Tất cả')}><Link to='/category/Tất cả'>Tất cả</Link></li>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Thời trang')}><Link to='/category/Thời trang'>Thời trang</Link></li>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Phụ kiện')}><Link to='/category/Phụ kiện'>Phụ kiện</Link></li>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Đồ chơi')}><Link to='/category/Đồ chơi'>Đồ chơi</Link></li>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Đồ dùng học tập')}><Link to='/category/Đồ dùng học tập'>Đồ dùng học tập</Link></li>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Nhà cửa và đời sống')}><Link to='/category/Nhà cửa và đời sống'>Nhà cửa và đời sống</Link></li>
                            <li style={{paddingBottom:'15px'}} onClick={() => this.Rerender('Đồ nội thất')}><Link to='/category/Đồ nội thất'>Đồ nội thất</Link></li>
                        </ul>
                    </div>
                    </Col>
                    <Col sm="8" style={{
                                            marginTop:'30px',
                                            backgroundColor: "white",
                                            marginLeft:'20px'
                                      }}>
                        <h2 style={{
                                        paddingLeft:'20px',
                                        paddingTop:'20px',
                                        fontSize:'27px'
                                }}>Kết quả tìm kiếm</h2>   
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
                                        <Link to='/category/price-down-to-up'><DropdownItem onClick={() => this.Rerender('price-down-to-up')}>Từ thấp đến cao</DropdownItem></Link>
                                        <Link to='/category/price-up-to-down'><DropdownItem onClick={() => this.Rerender('price-up-to-down')}>Từ cao đến thấp</DropdownItem></Link>
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
                                        <Link to='/category/star-down-to-up'><DropdownItem onClick={() => this.Rerender('star-down-to-up')}>Từ thấp đến cao</DropdownItem></Link>
                                        <Link to='/category/star-up-to-down'><DropdownItem onClick={() => this.Rerender('star-up-to-down')}>Từ cao đến thấp</DropdownItem></Link>
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
                                        <Link to='/category/time-up-to-down'><DropdownItem onClick={() => this.Rerender('time-up-to-down')}>Sản phẩm cập nhật gần đây</DropdownItem></Link>
                                        <Link to='/category/time-down-to-up'><DropdownItem onClick={() => this.Rerender('time-down-to-up')}>Sản phẩm tồn kho</DropdownItem></Link>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>

                        <Row style={{marginLeft:'5px'}}>
                        {
                            sectionItems.map(item => (
                                <Col sm="4">
                                    <Card style={card}>
                                    <CardImg 
                                        top 
                                        width="100%" 
                                        height="220px"
                                        src={'https://greenobjectdjangobackend.herokuapp.com/media/'+item.img}
                                        alt="error" />
                                    <CardBody>
                                    <Link to={`/${item.id}`} className ="card-title" tag="h5" style={card_body}>{item.name}</Link>
                                        <CardText style={text_body}>{item.price}</CardText>
                                        <Button style={button} onClick={() => this.context.addToCart(item)}>add to cart</Button>
                                    </CardBody>
                                </Card>
                                </Col>
                            ))
                        }
                        </Row>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SectionProducts;