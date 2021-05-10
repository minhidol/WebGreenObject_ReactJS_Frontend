import React, {Component} from "react"
import { Link} from "react-router-dom"
import {DataContext} from '../contextAPI/dataContext'



import {
    Card, CardImg, CardText, CardBody, Button, Row, Col
  } from 'reactstrap';

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

class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }

    componentDidMount(){
        console.log("Products did mount");
    }                                                                               
    
    static contextType = DataContext

    render(){
        console.log('good  product')
        const {theBest} = this.context
        
        return(
            <div className="container" style={{paddingBottom:'50px'}}>
                <div className="title">
                    <h2 style={{color:"#333", fontSize: "32px"}}>Sản phẩm được quan tâm</h2>
                </div>
                <Row style={{marginTop:"10px"}}>
                    {theBest.map(product =>(
                            <Col sm="3" style={margin} key={product.id}>
                                <Card style={card}>
                                    <CardImg 
                                        top 
                                        width="100%" 
                                        height="220px"
                                        src={'https://greenobjectdjangobackend.herokuapp.com/media/'+product.img}
                                        alt="error" />
                                    <CardBody>
                                    <Link to={`/${product.id}`} className ="card-title" tag="h5" style={card_body}>{product.name}</Link>
                                        <CardText style={text_body}>{product.price}</CardText>
                                        <Button style={button} onClick={() => this.context.addToCart(product)}>add to cart</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        )
    }
}

export default Products;