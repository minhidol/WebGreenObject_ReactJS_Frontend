import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from 'axios'
import {DataContext} from '../contextAPI/dataContext'

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

class ManageBill extends Component{
    static contextType = DataContext
    constructor(props){
        super(props)
        this.state ={
            list_bill:[],
            checkLogin:check()
        }
    }

    componentDidMount(){
        const {checklogin} = this.context
        if(checklogin == false){
                this.setState({
                    checkLogin:false
                })
            }
        axios.get('https://greenobjectdjangobackend.herokuapp.com/api/list_bill/')
        .then(data=>{
            var temp = []
            var dem = 0;
            for(var i = 0; i < data.data.length;i++){
                temp.push(data.data[i])
            }
            const {setListBill} = this.context
            this.setState({
                list_bill:temp
            })
            setListBill(temp)
        })
        .catch(err=>console.log(err))
    }

    render(){
        const {list_bill} = this.state
        const {checklogin} = this.context
        if((checklogin == true || this.state.checkLogin == true) && list_bill.length == 0){
            return (
                <div style={{textAlign:'center', fontSize:'18px', fontWeight:'600', height:'230px', marginTop:'20px'}}>Nothing Bill</div>
            )
        }
        if(checklogin == false){
            return <Redirect to='/admin'/>
        }

        if(checklogin==true || this.state.checkLogin==true){
            return(
                <div className="register" style={_container}>
                <div className='admin'>
                    <h2>Trang Admin</h2>
                    <div className='manager_bill'>
                        <Link to='/manager_bill'>Danh sách đơn hàng</Link>
                    </div>
                    <div className="listOfOrders">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái</th>
                                    <th>Thông tin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list_bill.map((item)=>
                                        <tr>
                                            <th scope="row">{item._id.$oid}</th>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.numberPhone}</td>
                                            <td
                                                style={{
                                                    color:'red'
                                                }}
                                                >
                                                {item.status}
                                            </td>
                                            <td>
                                                <Link to={`bill/${item._id.$oid}`}
                                                    style={{
                                                        fontSize:'15px',
                                                        fontWeight:'400',
                                                        color:'#007bff',
                                                    }}
                                                    >
                                                        Chi tiết
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
               </div>
               </div>
                
            )
        }
    }
}

export default ManageBill;