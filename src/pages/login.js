import React, {Component} from "react";
import axiosInstance from '../axiosApi'
import jwt_decode from "jwt-decode"
import { Redirect } from "react-router-dom";
import {DataContext} from '../contextAPI/dataContext'
import {Container} from 'reactstrap'

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
    marginBottom:'10px'
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
    list_username:[],
    token:"",
    loggedIn:false,
    login_navbar: false,
    user_exist:false
}




class Products extends Component{
    static contextType = DataContext
    constructor(props){
        super(props)
        this.state=defaultState;
    }

    
    handleChange = event=> {
        this.setState({
            [event.target.name]: event.target.value
         })
    }
    componentDidMount(){
        console.log('did mount')
    }

    componentDidUpdate(){
        
    }

    validate = ()=>{
        
        let usernameError=''
        let passwordError=''
        
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
        if(usernameError || passwordError){
            this.setState({usernameError, passwordError})
            return false
        }
        return true
    }
    checkValidName = () => {
        console.log('name')
        let usernameError=''
        if(!this.state.username){
            usernameError = "Họ và tên không được để trống"
        }
        if(usernameError){
            this.setState({usernameError})
        }
        else{
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
    
            this.setState({
                login_navbar:true
            })
            this.setState({passwordError})
        }
    }
    handleSubmit = event =>{
        event.preventDefault();
        const isValid = this.validate()
        const {CheckLogin, setUserId} = this.context
        if(isValid){
            axiosInstance.post('/login/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                response => {  
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                    var token = response.data.access;
                    var decoded = jwt_decode(token)
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    this.setState({
                        loggedIn:true,
                    })
                    alert('Đăng nhập thành công')
                    setUserId(decoded.user_id)
                    CheckLogin(decoded.name, decoded.phone, decoded.address, decoded.user_id)
                }
            )
            .catch(error=>{
                if(error.response.status === 401){
                    alert('Mật khẩu hoặc tên đăng nhập không hợp lệ')
                }
            })
        }
    }

    render(){
        const {checklogin} = this.context
        if(checklogin == true)
            return <Redirect to='/'/>
        return(
            <div className="register" style={_container}>
                <div className="_register" style={container12}>
                    <div className="title_register">
                    <h1 style={{fontSize:'30px'}}>Đăng Nhập</h1>
                </div>
                <div className='form_register' style={form_register}>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input 
                                name='username' 
                                placeholder='Tên đăng nhập' 
                                value={this.state.username}
                                onChange={this.handleChange}
                                onBlur={this.checkValidName}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.usernameError}</div>
                        </div>
                        <div>
                            <input 
                                type='password'
                                name='password' 
                                placeholder='Mật khẩu' 
                                value={this.state.password}
                                onChange={this.handleChange}
                                style={_input}
                                onBlur={this.checkValidPass}
                            />
                            <div style={{color:'red'}}>{this.state.passwordError}</div>
                        </div>
                        <div>
                            <button type='submit' style={{
                                                            marginTop:'10px',
                                                            padding:'8px',
                                                            backgroundColor:'whitesmoke',
                                                            border:'1px solid grey'
                                                        }}>
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
                </div>
                {/* <div className="title_register">
                    <h1>Đăng Nhập</h1>
                </div>
                <div className='form_register' style={form_register}>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input 
                                name='username' 
                                placeholder='Tên đăng nhập' 
                                value={this.state.username}
                                onChange={this.handleChange}
                                onBlur={this.checkValidName}
                                style={_input}
                            />
                            <div style={{color:'red'}}>{this.state.usernameError}</div>
                        </div>
                        <div>
                            <input 
                                type='password'
                                name='password' 
                                placeholder='Mật khẩu' 
                                value={this.state.password}
                                onChange={this.handleChange}
                                style={_input}
                                onBlur={this.checkValidPass}
                            />
                            <div style={{color:'red'}}>{this.state.passwordError}</div>
                        </div>
                        <div>
                            <button type='submit'>
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div> */}
            </div>
    
            
        )
    }
}

export default Products;