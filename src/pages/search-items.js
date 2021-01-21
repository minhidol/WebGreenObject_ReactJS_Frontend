import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import MenuSection from '../components/menu-section';

import {DataContext} from '../contextAPI/dataContext';
import MenuSort from '../components/menu-sort';
import {Link} from 'react-router-dom'


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

class SearchItems extends Component {

    static contextType = DataContext;

    constructor(props) {
        super(props);
    }

    render() {

        const { resultItems, searchKeys } = this.context;
        console.log(searchKeys);
        
        return(
            <Container>
                <Row>
                    <Col sm="3">
                        <MenuSection />
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
                        <MenuSort /> 
                        <Row>
                        {
                            resultItems.map(item => (
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
        );
    }
}

export default SearchItems;