import React, {Component} from 'react'
import {DataContext} from '../contextAPI/dataContext'
import {Link, Redirect} from 'react-router-dom'
import { Table } from 'reactstrap';
import axiosInstance from '../axiosApi';
import axios from 'axios'
const h2={
    fontSize:'25px'
}

const _container={
    height:'auto',
    paddingTop:'20px',
    float:'left',
    // textAlign:'center',
    fontSize:'30px',
    border: '1px solid #dedede',
    boxShadow:'0px 0px 5px 5px #ccc',
    width:'100%',
    backgroundColor:'#f4f4f4',
    paddingBottom:'30px'
}

const divH2={
    paddingTop:'15px',
    paddingBottom:'40px',
    marginLeft: '.9375rem',
    color: '#ee4d2d',
    fontSize: '1.85rem',
    lineHeight: '1.875rem',
    height: '1.875rem',
    // textAlign:'center',
    marginBottom: '.0625rem',
}

const divH3={
    paddingTop:'15px',
    paddingBottom:'40px',
    marginLeft: '.9375rem',
    color: '#ee4d2d',
    fontSize: '1.7rem',
    lineHeight: '1.875rem',
    height: '1.875rem',
    marginBottom: '.0625rem',
}


const sp ={
    width:'45%',
    textAlign:'center',
    size:'20px'
}

const th ={
    textAlign:'center'
}

const nameH2 = {
    paddingTop:'10px',
    paddingLeft:'20px',
    fontWeight:'700',
    color:'#222',
    fontSize:'18px',


}

const edit = {
    paddingTop:'10px',
    paddingLeft:'20px',
    fontWeight:'700',
    color:'#222',
    fontSize:'18px',
}

const check = () =>{
    return JSON.parse(localStorage.getItem('name')) != ""
}
console.log('check123: ', check())
class Payment extends Component{
    
    static contextType = DataContext

    constructor(props){
        super(props)
        this.state={
            info_cart:{},
            isInEditMode:false,
            name:'',
            address:'',
            phone:'',
            editName:false,
            editAddress: false,
            editNumberPhone:false,
            checkLogin:check(),
            postedBill:false
        }
        this.postBill = this.postBill.bind(this)
        this.editName = this.editName.bind(this)
        this.editPhone = this.editPhone.bind(this)
        this.editAddress = this.editAddress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        let cart = {}
        const {checklogin, cartItems, name, getPriceProduct, total, id, address} = this.context
        this.setState({
            name:name,
            address:address
        })
        var array_cart = []
        var a = {}
        for(var i = 0; i < cartItems.length; i++){
            a = {'Tên sản phẩm':cartItems[i].name, 
                'Số lượng':cartItems[i].count_client, 
                'Tổng tiền': getPriceProduct(cartItems[i].price, cartItems[i].count_client)}
            array_cart.push(a)
        }
        var json = {'Thông tin chi tiết': array_cart, 
                    'name':name,
                    'id_user':id, 
                    'Tổng tiền': total, 
                    'Trạng thái':'Đang chờ', 
                    'Địa chỉ':address}
        this.setState({
            info_cart:json
        })
        var con = localStorage.getItem('name')
        var a = localStorage.getItem('total')
        const _name = JSON.parse(localStorage.getItem('name'))
        if(_name !== null){
            this.setState({
                name:_name
            })
        }
        const _address = JSON.parse(localStorage.getItem('address'))
        if(_address !== null){
            this.setState({
                address:_address
            })
        }

        const _phone = JSON.parse(localStorage.getItem('phone'))
        if(_phone !== null){
            this.setState({
                phone:_phone
            })
        }
    }

    componentDidUpdate(){
        const check = JSON.parse(localStorage.getItem('name'))
        if(check == null){
            this.setState({
                checkLogin:false
            })
        }
    }

    handleChange = event=> {
        this.setState({
            [event.target.name]: event.target.value
         })
    }

    editName(){
        this.setState({
            editName:!this.state.editName
        })
    }

    editPhone(){
        this.setState({
            editNumberPhone:!this.state.editNumberPhone
        })
    }

    editAddress(){
        this.setState({
            editAddress:!this.state.editAddress
        })
    }

    postBill(){
        const {cartItems, getPriceProduct, total, id, removeDataCart} = this.context
        var array_cart = []
        var a = {}
        for(var i = 0; i < cartItems.length; i++){
            a = {'id':cartItems[i].id,
                'name_product':cartItems[i].name, 
                'count':cartItems[i].count_client, 
                '_count':cartItems[i].price,
                'total': getPriceProduct(cartItems[i].price, cartItems[i].count_client)
            }
            array_cart.push(a)
        }
        var json = {'info_details': array_cart, 
                    'id_user':id, 
                    'name':this.state.name,
                    'Total': total, 
                    'status':'Đang chờ', 
                    'address':this.state.address,
                    'numberPhone':this.state.phone
                }
        axios.put('https://greenobjectdjangobackend.herokuapp.com/api/postBill/', JSON.stringify(json), {
            headers:{'Content-type':'application/json'},
        }).then(
                res=>{
                        console.log(res)
                        alert('Gửi đơn hàng thành công')
                        this.setState({
                            postedBill:true
                        })
                        removeDataCart()
                        
                    })
        .catch(err => console.log(err))
    }

    
    render(){
        const {checklogin, cartItems, name, address, getPriceProduct, total, id} = this.context

        if((checklogin == true || this.state.checkLogin==true) && this.state.postedBill==false){
            return(
                <div className="register" style={_container}>
                <div className='table'>
                        <div className='info_client'>
                            <h2 style={divH2}>Địa chỉ nhận hàng</h2>
                            <div className='info_name'>
                                <h2>Họ và tên: </h2> 
                                {!this.state.editName ?(      
                                    <h2 id='state_name' style={{color:'blue'}}>{this.state.name}</h2> 
                                    )
                                    :
                                    <input type='text' 
                                        name='name'
                                        className='input_edit'
                                        value={this.state.name}
                                        onChange={this.handleChange}/>
                                }   
                                <button onClick={this.editName}>Thay đổi</button>
                            </div>
                            <div className='info_numberphone'>
                                <h2>Số điện thoại: </h2>
                                {!this.state.editNumberPhone ?  
                                    <h2 id='state_phone' style={{color:'blue'}}>{this.state.phone}</h2> 
                                    :
                                    <input type='text' 
                                        name='phone'
                                        onChange={this.handleChange}
                                        className='input_edit'
                                        value={this.state.phone}/>
                                }
                                <button onClick={this.editPhone}>Thay đổi</button>
                            </div>
                            <div className='info_address'>
                                <h2>Địa chỉ: </h2>
                                {!this.state.editAddress ?  
                                    <h2 id='state_address' style={{color:'blue'}}>{this.state.address}</h2> 
                                    :
                                    <input type='text' 
                                        name='address'
                                        onChange={this.handleChange}
                                        className='input_edit'
                                        value={this.state.address}/>
                                }
                                <button onClick={this.editAddress}>Thay đổi</button>
                            </div>
                        </div>

                        <div className='name_details'>
                            <h2 style={divH3}>Chi tiết đơn hàng</h2>
                        </div>
                        
                        <Table  className='_table'>
                            <thead>
                                <tr>
                                    <th style={th}>Ảnh</th>
                                    <th style={sp}>Sản phẩm</th>
                                    <th>Đơn giá </th>
                                    <th>Số lượng</th>
                                    <th>Số tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map(item => 
                                    <tr>    
                                            <td style={th}>
                                                <img src={'https://greenobjectdjangobackend.herokuapp.com/media/'+item.img} alt='error' height='50' width='50' style={th}/>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.count_client}</td>
                                            <td>{getPriceProduct(item.price, item.count_client)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div className="total">
                            <h3>Total: {total}</h3>
                            <button to='/payment' className='dathang' onClick={() => this.postBill()}>Đặt hàng</button>
                        </div>
                    </div>
                    </div>
            
            )
        }
        else if((checklogin==false && this.state.checkLogin==false) || this.state.postedBill == true)
        {
            return <Redirect to='/login'/>
        }
        
    }
}

export default Payment
