import React, {Component} from 'react'
import {DataContext} from '../contextAPI/dataContext'
import axios from 'axios'
import {Table, Input, Form, FormGroup, Label} from "reactstrap"
import {Redirect} from "react-router-dom"


const _container={
    height:'auto',
    paddingTop:'20px',
    float:'left',
    fontSize:'30px',
    border: '1px solid #dedede',
    boxShadow:'0px 0px 5px 5px #ccc',
    width:'100%',
    backgroundColor:'#f4f4f4',
    paddingBottom:'30px'
}

const check = ()=>{
    return JSON.parse(localStorage.getItem('name')) != "" 
}

class DetailBill extends Component{
    static contextType = DataContext

    constructor(props){
        super(props)
        this.state={
           bill:[],
           status:'',
           radio1:"apple",
           confirmed:false,
           checkLogin:check()
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentDidMount(){
        const {checklogin} = this.context
        if(checklogin == false){
                this.setState({
                    checkLogin:false
                })
            }
        const {list_bill} = this.context
        const id = this.props.match.params.id
        const data = list_bill.filter(item=>{
            return item._id.$oid == id 
        })
        this.setState({
            bill:data
        })
        var status = {
            '_id':{
                "$oid":id
            }
        }
        console.log(data)
        axios.post('https://greenobjectdjangobackend.herokuapp.com/api/billDetail/', JSON.stringify(status),{
            headers:{'Content-type':'application/json'}
        }).then(res=>{
            var _data = []
            _data.push(res.data)
            this.setState({
                bill:_data
            })
        }).catch(err=>console.log(err))
    }   


    componentDidUpdate(){
       
    }

    handleChange = event => {
       this.setState({
           status:event.target.value
       })
       console.log(event.target)
    }

    onSubmit(event){
        event.preventDefault();
        var status = {
            '_id':{
                '$oid':this.state.bill[0]._id.$oid
            },
            'status':this.state.status
        }
        axios.put('https://greenobjectdjangobackend.herokuapp.com/api/updateBill/', JSON.stringify(status),{
            headers:{'Content-type':'application/json'}
        }).then(res=>{
            console.log(res)
            this.setState({
                confirmed:true
            })
        })
        .catch(err=>console.log(err))
        

    }

    
    render(){
       const {bill, status, confirmed} = this.state
       const {checklogin} = this.context

       if(confirmed==true){
        return <Redirect to='/manage_bill'/>
        }
        if(checklogin == false){
            return <Redirect to='/admin'/>
        }
        else if(confirmed == false){
        return(
            <div className="register" style={_container}>
                <div className='details_product12'>
                    { bill.map(item=> (
                    <div className="details_bill">
                        <h2 style={{
                                        textAlign:'center',
                                        fontSize: '21px',
                                        fontWeight: '600',
                                        color:"rgb(238, 77, 45)"
                                    }}>Thông tin chi tiết đơn hàng</h2>
                        <div className="info_bill">
                            <h2>Họ và tên: <span style={{paddingLeft:'15px', fontSize:'17px', color:'blue'}}>{item.name}</span></h2>
                            <h2>Điện thoại: <span style={{paddingLeft:'15px', fontSize:'17px', color:'blue'}}>{item.numberPhone}</span></h2>
                            <h2>Địa chỉ: <span style={{paddingLeft:'15px', fontSize:'17px', color:'blue'}}>{item.address}</span></h2>
                        </div>
                        <div className="table_bill">
                            <h2>Danh sách sản phẩm</h2>
                            <Table bordered style={{marginTop:"20px"}}>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Đơn giá </th>
                                        <th>Số lượng</th>
                                        <th>Số tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                        item.info_details.map(_item=>
                                        (
                                            <tr>    
                                                    <td>{_item.name_product}</td>
                                                    <td>{_item._count}</td>
                                                    <td>{_item.count}</td>
                                                    <td>{_item.total}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div className="total1">
                            <h3>Total:   {item.Total}</h3>
                        </div>
                        <div className="status_bill">
                            <h2>Trạng thái đơn hàng</h2>
                            <form class="form_bill" onSubmit={this.onSubmit}>
                                <div className="radio_xacnhan">
                                    <label>
                                        <input  className="radio" 
                                                type="radio" 
                                                name="xacnhan"  
                                                value="Xác nhận đơn hàng" 
                                                checked={this.state.status === "Xác nhận đơn hàng"}
                                                onChange={this.handleChange} 
                                        />
                                        Xác nhận đơn hàng
                                    </label>    
                                </div>
                                <div className="radio_danhan">
                                    <label>
                                        <input  className="radio" 
                                                type="radio"  
                                                value="Đã nhận hàng" 
                                                onChange={this.handleChange} 
                                                checked={this.state.status === "Đã nhận hàng"}
                                        />
                                        Đã nhận hàng
                                    </label>
                                </div>
                                <div className="radio_huy">
                                    <label>
                                        <input  className="radio" 
                                                type="radio"  
                                                value="Hủy đơn hàng" 
                                                onChange={this.handleChange} 
                                                checked={this.state.status === "Hủy đơn hàng"}
                                        />
                                        Hủy đơn hàng
                                    </label>
                                </div>
                                <div className="save">
                                    <button className="_save">
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
        )
    }
    }
}

export default DetailBill