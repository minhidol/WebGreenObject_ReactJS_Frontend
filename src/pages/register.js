import React, {Component} from "react";
import axios from "axios";
import axiosInstance from '../axiosApi'

import {Redirect} from 'react-router-dom'
import {DataContext} from '../contextAPI/dataContext'
import jwt_decode from "jwt-decode"
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const form_register ={
    width:"50%",
    height:'auto',
    margin:'0 auto',
    boxSizing:'border-box',
    padding:'15px'
    
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

const container12 = {
    height:'auto',
    paddingTop:'20px',
    float:'left',
    textAlign:'center',
    fontSize:'30px',
    border: '1px solid #dedede',
    boxShadow:'0px 0px 5px 5px #ccc',
    width:'60%',
    marginLeft:'20%',
    backgroundColor:'white',
    marginTop:'15px',
    // paddingBottom:'-50px'
    // paddingBottom:'400px'
   // paddingBottom:'1000px'
}

const _container1={
    marginTop:'10px',
    float:'left',
    width:'100%',
    textAlign:'center',
    fontSize:'30px',
    border: '1px solid black',
    boxShadow:'0px 0px 5px 5px #ccc',
    width:'60%',
    marginBottom:'15px',
    marginLeft:'20%',
    position:'fixed'


}

const _input={
    marginTop: '12px',
    width: '100%',
    height: '34px',
    padding: '6px 12px',
    fontSize: '13px',
    lineHeight: '1.42857143',
    color: '#555',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom:'10px',

}

const defaultState = {
    name:"",
    username:"",
    password:"",
    address:"",
    nameError:"",
    usernameError:"",
    passwordError:"",
    addressError:"",
    phone:"",
    phoneError:"",
    list_username:[],
    token:"",
    loggedIn:false,
    login_navbar: false,
    user_exist:false,
    phone:"",
    phoneError:""
}

const confirm = {
    marginTop:'20px',
    marginBottom:'20px',
    padding:'5px 10px',
    border:'1px solid grey',
    borderRadius:'5px',
    fontSize:'18px',
    backgroundColor:'#999',
    color:'whitesmoke'
}


const _confirm = {

}

class Products extends Component{
    constructor(props){
        super(props)
        this.state=defaultState;
    }

    componentDidMount(){
        
    }
    handleChange = event=> {
        this.setState({
              [event.target.name]: event.target.value
         })

    }
    static contextType = DataContext

    validate = ()=>{
        
        let nameError=''
        let usernameError=''
        let passwordError=''
        let addressError=''
        let phoneError = ''
        String.prototype.isNumber = function(){return /^\d+$/.test(this);}

        const _username = { username: this.state.username}
        axios.post('https://greenobjectdjangobackend.herokuapp.com/api/checkUserIsExists/', JSON.stringify(_username),{
                headers:{'Content-type':'application/json'},
            }).then(
                result => {
                    console.log(result.data.check)
                    if(result.data.check == "No"){
                        this.setState({
                            login_navbar:true
                        })
                    }
                    else{
                        this.setState({
                            usernameError:'Tài khoản đã tồn tại'
                        })
                        return false
                    }
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        
        if(!this.state.name){
            nameError = "Họ và tên không được để trống"
        }
        if(!this.state.username){
            usernameError = "Tên tài khoản không được để trống"
        }
        else if(this.state.username.length < 7){
            usernameError = "Tên tài khoản phải chứa ít nhất 7 ký tự"
        }
        
        if(!this.state.password){
            passwordError = "Password không được để trống"
        }
        else if(this.state.password.length < 8){
            passwordError = "Password phải chứa ít nhất 8 ký tự"
        }
        if(!this.state.address){
            addressError = "Địa chỉ không được để trống"
        }
        if(!this.state.phone){
            phoneError = "Điện thoại không được để trống"
        }
        else if(this.state.phone.isNumber() != true){
            phoneError = "Điện thoại không được chứa chữ cái"
        }
        else if(this.state.phone.length < 9){
            phoneError = "Điện thoại phải chứa ít nhất 9"
        }
        else if(this.state.phone.length > 11){
            phoneError = "Điện thoại không được chứa quá 11 số"
        }
        if(nameError || usernameError || passwordError || addressError||phoneError){
            this.setState({ addressError,nameError, usernameError, passwordError, phoneError})
            return false
        }
        return true
    }

    checkValidName = () => {
        console.log('name')
        let nameError=''
        if(!this.state.name){
            nameError = "Họ và tên không được để trống"
        }
        if(nameError){
            this.setState({nameError})
        }
        else{
            this.setState({nameError})
        }

        
    }
    checkValidUserName = () => {
        let usernameError=''
        const _username = { username: this.state.username}
        axios.post('https://greenobjectdjangobackend.herokuapp.com/api/checkUserIsExists/', JSON.stringify(_username),{
                headers:{'Content-type':'application/json'},
            }).then(
                result => {
                    console.log(result.data.check)
                    if(result.data.check == "No"){
                        this.setState({
                            login_navbar:true
                        })
                    }
                    else{
                        this.setState({
                            usernameError:'Tài khoản đã tồn tại'
                        })
                    }
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        
        if(!this.state.username){
            usernameError = "Tên tài khoản không được để trống"
        }
        else if(this.state.username.length < 7){
            usernameError = "Tên tài khoản phải chứa ít nhất 7 ký tự"
        }
        if(usernameError){
            this.setState({usernameError})
        }else{
            this.setState({usernameError})
        }
    }
    checkValidPass = () => {
        let passwordError=''
        if(!this.state.password){
            passwordError = "Password không được để trống"
        }
        else if(this.state.password.length < 8){
            passwordError = "Password phải chứa ít nhất 8 ký tự"
        }
        if(passwordError){
            this.setState({passwordError})
        }
        else{
            this.setState({passwordError})
        }
    }
    checkValidAddress = () => {
        let addressError=''
        if(!this.state.address){
            addressError = "Địa chỉ không được để trống"
        }
        if(addressError){
            this.setState({addressError})
        }
        else{
            this.setState({
                login_navbar:true
            })
            this.setState({addressError})
        }
    }
    checkValidPhone = () => {
        let phoneError=''
        String.prototype.isNumber = function(){return /^\d+$/.test(this);}
        if(!this.state.phone){
            phoneError = "Điện thoại không được để trống"
        }
        else if(this.state.phone.isNumber() != true){
            phoneError = "Điện thoại không được chứa chữ cái"
        }
        else if(this.state.phone.length < 9){
            phoneError = "Điện thoại phải chứa ít nhất 9"
        }
        else if(this.state.phone.length > 11){
            phoneError = "Điện thoại không được chứa quá 11 số"
        }
        if(phoneError){
            this.setState({phoneError})
        }
        else{
            this.setState({phoneError})
        }
    }
    handleSubmit = event =>{
        event.preventDefault();
        const isValid = this.validate()
        const {CheckLogin} = this.context
        if(isValid){

            const users = {
                name:this.state.name,
                username:this.state.username,
                password:this.state.password,
                address:this.state.address,
                phone:this.state.phone
            }
    
            axios.post('https://greenobjectdjangobackend.herokuapp.com/api/user/create/', JSON.stringify(users),{
                headers:{'Content-type':'application/json'},
            })

            .then(response=>{

                axiosInstance.post('/login/', {
                    username: this.state.username,
                    password: this.state.password
                }).then(
                    result => {
                        axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                        var token = result.data.access;
                        var decoded = jwt_decode(token)
                        localStorage.setItem('access_token', result.data.access);
                        localStorage.setItem('refresh_token', result.data.refresh);
                        //localStorage.setItem('name', decoded.name)
                        this.setState({
                            loggedIn:true
                        })
                        alert('Đăng ký thành công')
                        CheckLogin(this.state.name, this.state.phone, this.state.address, decoded.user_id)
                    }
                )
            })
            .catch(error =>{    
                alert('Đăng ký thất bại')
            })
        }
    }
        
    render(){
        const {checklogin} = this.context
        if(checklogin == true)
            return <Redirect to='/'></Redirect>
        return(

            <div className="register" style={_container}>
                <div className="_register" style={container12}>
                <div className="title_register">
                    <h1>Đăng ký</h1>
                </div>
                <div className='form_register' style={form_register}>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input 
                                name='name' 
                                placeholder='Họ và tên' 
                                value={this.state.name}
                                onChange={this.handleChange}
                                onBlur={this.checkValidName}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.nameError}</div>
                        </div>
                        <div>
                            <input 
                                name='username' 
                                placeholder='Tên đăng nhập' 
                                value={this.state.username}
                                onChange={this.handleChange}
                                onBlur={this.checkValidUserName}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.usernameError}</div>
                        </div>
                        <div>
                            <input 
                                name='phone' 
                                placeholder='Số điện thoại' 
                                value={this.state.phone}
                                onChange={this.handleChange}
                                onBlur={this.checkValidPhone}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.phoneError}</div>
                        </div>
                        <div>
                            <input 
                                type='password'
                                name='password' 
                                placeholder='Mật khẩu' 
                                value={this.state.password}
                                onChange={this.handleChange}
                                onBlur={this.checkValidPass}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.passwordError}</div>
                        </div>
                        <div>
                            <input 
                                name='address'
                                placeholder='Địa chỉ'
                                value={this.state.address}
                                onChange={this.handleChange}
                                onBlur={this.checkValidAddress}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.addressError}</div>
                        </div>

                        <div className='_confirm' style={_confirm}>
                            <button type='submit' className="confirm" style={confirm}>
                                Đăng ký 
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
       
    }
}

export default Products;