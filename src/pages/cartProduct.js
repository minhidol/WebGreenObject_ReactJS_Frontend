import React, {Component} from 'react'
import {DataContext} from '../contextAPI/dataContext'
import {Link, Redirect} from 'react-router-dom'
import { Table } from 'reactstrap';


const divH2={
    paddingTop:'20px',
    paddingBottom:'40px',
    marginLeft: '.9375rem',
    color: '#ee4d2d',
    fontSize: '1.75rem',
    lineHeight: '1.875rem',
    height: '1.875rem',
    textAlign:'center',
    marginBottom: '.0625rem',
}

const _container={
    height:'auto',
    paddingTop:'20px',
    float:'left',
    textAlign:'center',
    fontSize:'30px',
    border: '1px solid #dedede',
    boxShadow:'0px 0px 5px 5px #ccc',
    width:'100%',
    backgroundColor:'#f4f4f4',
    paddingBottom:'30px'
}

const sp ={
    width:'45%',
    textAlign:'center',
    size:'20px'
}

const th ={
    textAlign:'center'
}

const check = ()=>{
    return JSON.parse(localStorage.getItem('name')) != "" 
}

console.log('cd: ',check())

class Cart extends Component{

    constructor(props){
        super(props)
        this.state={
            checkLogin:check()
        }
    }

    static contextType = DataContext
    
    componentDidMount(){
        this.context.getTotal()
    }
    componentDidUpdate(){
        const check = JSON.parse(localStorage.getItem('name'))
        if(check == null){
            this.setState({
                checkLogin:false
            })
        }
    }

    render(){
        const {cartItems, _increase, _reduction, removeProduct, getPriceProduct, total, checklogin, products} = this.context

        console.log(cartItems.length)
        if((checklogin == true || this.state.checkLogin == true) && cartItems.length == 0){
            return (
                <div style={{textAlign:'center', fontSize:'18px', fontWeight:'600', height:'230px', marginTop:'20px'}}>Nothing Product</div>
            )
        }
        if(checklogin == true || this.state.checkLogin==true){
            return(
                <div className="register" style={_container}>
                <div className='table'>
                    <h2 style={divH2}>Giỏ hàng của bạn</h2>
                    <Table  className='_table'>
                        <thead>
                            <tr>
                                <th style={th}>Ảnh</th>
                                <th style={sp}>Sản phẩm</th>
                                <th>Đơn giá </th>
                                <th style={th}>Số lượng</th>
                                <th>Số tiền</th>
                                <th style={th}>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(item => 
                                <tr>
                                        <td>
                                            <img src={'https://greenobjectdjangobackend.herokuapp.com/media/'+item.img} alt='error' height='50' width='50' style={th}/>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <div className='amount'>
                                                <button className="count" onClick={()=>_reduction(item)}> - </button>
                                                <span>{item.count_client}</span>
                                                <button className="count" onClick={()=>_increase(item)}> + </button>
                                            </div>
                                        </td>
                                        <td>{getPriceProduct(item.price, item.count_client)}</td>
                                        <td>
                                            <div className='delete' onClick={() => removeProduct(item)}>
                                                X
                                            </div>
                                        </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="total">
                        <Link to='/payment'>Thanh toán</Link>
                        <h3>Total: {total}</h3>
                    </div>
                </div>
                </div>
            )
        }
        else if(checklogin==false && this.state.checkLogin==false)
        {
            return <Redirect to='/login'/>
        }

    }
}
    


export default Cart