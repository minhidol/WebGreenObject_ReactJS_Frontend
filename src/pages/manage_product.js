import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "reactstrap";
import {DataContext} from '../contextAPI/dataContext'
import {Redirect} from 'react-router-dom'



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

const input = {
    float:'left',
    width:'50%',
    marginTop: '-8px',
    marginLeft:'15px',
    height: '34px',
    padding: '6px 12px',
    fontSize: '13px',
    lineHeight: '1.42857143',
    color: '#555',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',

}
const _input = {
    // marginTop: '0px',
    // marginLeft:'11%',
    // width: '70%',
    // height: '34px',
    // padding: '6px 12px',
    // fontSize: '13px',
    // lineHeight: '1.42857143',
    // color: '#555',
    // backgroundColor: '#fff',
    // backgroundImage: 'none',
    // border: '1px solid #ccc',
    // borderRadius: '4px',
    // marginBottom:'10px',
    // float:'left'
}

const defaultState = {
    name:'',
    price:'',
    description:'',
    category:'',
    category_concrete:'',
    count:'',
    count_client:0,
    count_star:0,
    count_star_people:0,
}

const check = ()=>{
    return JSON.parse(localStorage.getItem('name')) != "" 
}

class ManageProduct extends Component{
    
    static contextType = DataContext

    constructor(props){
        super(props)
        this.state = {
            active_add: false,
            name:'',
            price:'',
            description:'',
            category:'',
            category_concrete:'',
            count:'',
            count_client:0,
            count_star:0,
            count_star_people:0,
            img:null,
            checklogin:check()

        }
        this.active_add = this.active_add.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    componentDidMount(){
        console.log("m")
        const {checklogin} = this.context
        if(checklogin == false){
                this.setState({
                    checklogin:false
                })
            }

    }
    componentDidUpdate(){
        const {checklogin} = this.context
        // if(checklogin == false){
        //         this.setState({
        //             checkLogin:false
        //         })
        //     }
    }

    active_add(){
        this.setState({
            active_add:true
        })
    }

    handleChange = event=> {
        this.setState({
              [event.target.name]: event.target.value
         })

    }

    handleImageChange = e =>{
        this.setState({
            img:e.target.files[0]
        })
        // console.log(e.target.files[0].name)
    }

    onSubmit(e){
        e.preventDefault()
        let product = new FormData()
        product.append('name', this.state.name)
        product.append('price', this.state.price)
        product.append('description', this.state.description)
        product.append('category', this.state.category)
        product.append('category_concrete', 'none')
        product.append('img', this.state.img, this.state.img.name)
        product.append('count', this.state.count)
        product.append('count_client', 1)
        product.append('count_star', 0)
        product.append('count_star_people', 0)
        
        axios.post('https://greenobjectdjangobackend.herokuapp.com/api/add_product/', product, {
            headers:{
                'Content-type':'multipart/form-data'
            }
        }).then(
            result=>{
                console.log(result.data)
                alert('Thêm sản phẩm thành công')

            }
        ).catch(
            error=>{
                console.log(error)
            }
        )
        this.setState(defaultState)

    }

    render(){

        const {checklogin} = this.context
        console.log("login: ", this.state.checklogin)
        // console.log("")

        if(checklogin==false){
            return <Redirect to='/admin'/>
        }
        // else{
        if(checklogin==true || this.state.checklogin==true){
        return(
            <div className="register" style={_container}>
            <div className='admin'>
                <h2>Quản lý sản phẩm</h2>
                <div className='list_product_admin'>
                    <button>Danh sách sản phẩm</button>
                </div>
                <div className='add_product'>
                    <button onClick={this.active_add}>Thêm sản phẩm</button>
                    {   this.state.active_add &&
                        <div className='add_info_product'>
                            <h2>Thêm một sản phẩm mới</h2>
                            <form className='form_add' onSubmit={this.onSubmit}>
                                <div className='product_name'>
                                    <h3 className='title_product'>Tên sản phẩm:</h3>
                                    <input
                                        className='input_name'
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='product_category'>
                                    <h3 className='title_category'>Loại sản phẩm:</h3>
                                    <select
                                        className='input_category'
                                        name='category'
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        style={_input}
                                    >
                                        <option value='Chọn loại sản phẩm'>Chọn loại sản phẩm</option>
                                        <option value='Phụ kiện'>Phụ kiện</option>
                                        <option value='Thời trang'>Thời trang</option>
                                        <option value='Đồ chơi'>Đồ chơi</option>
                                        <option value='Đồ dùng học tập'>Đồ dùng học tập</option>
                                        <option value='Đồ nội thất'>Đồ nội thất</option>
                                        <option value='Nhà cửa và đời sống'>Nhà cửa và đời sống</option>
                                    </select>
                                </div>
                                <div className='product_price'>
                                    <h3 className='title_price'>Giá tiền:</h3>
                                    <input
                                        className='input_price'
                                        name='price'
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='product_count'>
                                    <h3 className='title_count'>Số lượng:</h3>
                                    <input
                                        className='input_count'
                                        name='count'
                                        value={this.state.count}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='product_img'>
                                    <h3 className='title_img'>Hình ảnh:</h3>
                                    <input
                                        type="file" 
                                        className='input_img'
                                        name='img'
                                        // value={this.state.img}
                                        accept='image/png, image/jpeg'
                                        onChange={this.handleImageChange}
                                    />
                                </div>
                                <div className='product_description'>
                                    <h3 className='title_description'>Mô tả thêm:</h3>
                                    <textarea
                                        className='input_description'
                                        name='description'
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='them_san_pham'>
                                    <button type='submit'>
                                        Thêm sản phẩm
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
           </div>
           </div>
            
        )}
        
    }
}

export default ManageProduct;