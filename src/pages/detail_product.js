import React, {Component} from 'react'
import {DataContext} from '../contextAPI/dataContext'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import axios from 'axios'

const info_product_h23={
    fontSize:'23px',
    paddingTop:'20px'
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

const _input={
    marginTop: '12px',
    width: '500px',
    height: '50px',
    padding: '6px 12px',
    fontSize: '13px',
    lineHeight: '1.42857143',
    color: '#555',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom:'10px',
    marginLeft:'20px'
}

const star = {
    color:'#ffc107',
    marginTop:'-10px'
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


class DetailProduct extends Component{
    static contextType = DataContext

    constructor(props){
        super(props)
        this.state={
            product:[],
            rating:null,
            hover:null,
            comment:'',
            commentError:'',
            evalute:[],
            _evalute:{}
            
        }
    }
    
    componentDidMount(){
        const id = this.props.match.params.id

        const res = JSON.parse(localStorage.getItem('products'))
        const data = res.filter(item => {
            return item.id == id
        })
        this.setState({
            product:data
        })
    

        if(data[0].evalute_comment == null){
            this.setState({
                evalute:[]
            })
        }
        else{
            this.setState({
                evalute:data[0].evalute_comment
            })
        }
       
    }


    componentDidUpdate(){
        console.log('detail update')
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    isValidComment(){
        let commentError = ''
        if(!this.state.comment){
            commentError='Vui lòng nhập bình luận'
        }
        if(commentError){
            this.setState({commentError})
            return false
        }
        return true
    }

    handleSubmit = event =>{
        event.preventDefault();
        const {name, postComment} = this.context
        const {product} = this.state

        if(this.isValidComment()){
            const evalute = {
                id:product[0].id,
                comment:this.state.comment,
                star:this.state.rating,
                name:name
            }
            postComment(evalute)
            axios.put('https://greenobjectdjangobackend.herokuapp.com/api/post_evalute/', JSON.stringify(evalute),{
                headers:{'Content-type':'application/json'}

            }).then(res=>{
                console.log(res)
                var temp = this.state.evalute
                temp.push(evalute)

                this.setState({
                    evalute:temp
                })
                
                this.setState({
                    rating:null,
                    hover:null,
                    comment:'',
                })
                
            })
            .catch(err=>console.error(err))
            alert('Gửi bình luận thành công. Vui lòng đợi kiểm duyệt')  
        }
        else{
            alert('Vui lòng nhập bình luận')
        }
    }

    render(){
        const {product, evalute} = this.state
        const {checklogin} = this.context
        
        return(
            <div className="register" style={_container}>
            <div className='details_product12'>
                {
                    product.map(item => (
                        <div className="details">
                            <div className="box">
                                <h2>Hình ảnh sản phẩm</h2>
                                <img src={'https://greenobjectdjangobackend.herokuapp.com/media/'+item.img} alt='error'/>
                            </div>
                            <div className="info_product">
                                <h2>{item.name}</h2>
                                <span>Giá tiền: {item.price}</span> 
                                <h2 style={info_product_h23}>Loại sản phẩm: {item.category}</h2>
                                <button className="cart" style={button} onClick={() => this.context.addToCart(item)}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))
                }
                {(checklogin) &&
                <div className='evolution'>
                    <h2>Đánh giá và nhận xét sản phẩm</h2>
                        <form onSubmit={this.handleSubmit}>
                            {[...Array(5)].map((star,index)=>{
                                const _rating = index+1
                                return (
                                    <label>
                                        <input 
                                            className="rating_a"
                                            type='radio' 
                                            name='rating' 
                                            value={_rating}
                                            onClick={()=>this.setState({
                                                rating:_rating
                                            })}
                                            />
                                        <FaStar 
                                            className="star" 
                                            size={40} 
                                            color={_rating <= (this.state.rating || this.state.hover) ? "#ffc107":"#e4e5e9"}
                                            onMouseEnter={() => this.setState({
                                                hover:_rating
                                            })}
                                            onMouseLeave={() => this.setState({
                                                hover:null
                                            })}
                                            />
                                    </label>
                                )
                            })}
                                <h2>Bình luận</h2>
                                <input 
                                    type='text' 
                                    name='comment'
                                    value={this.state.comment}
                                    placeholder='Nhập bình luận của bạn tại đây'
                                    onChange={this.handleChange}
                                    style={_input}
                                />
                                <button className="submit_comment">Gửi bình luận</button>
                            </form>
                        </div>
                }
                {
                    (checklogin==false &&
                        <div className='require'>
                            <h2>Vui lòng đăng nhập để đưa ra đánh giá</h2>
                        </div>)
                }
                <div className='list_comment'>
                    <h2>Danh sách bình luân và đánh giá</h2>
                    {
                        (evalute.length == 0 && <h2>Chưa có bình luân nào</h2>)
                    }
                    {
                        (evalute != [] &&
                            evalute.map(_item=>(
                                <div className='list_rating'>
                                    <div className='list'>
                                        <h2>{_item.name}</h2>
                                        <div className="star_star">
                                            {[...Array(_item.star)].map(()=>{
                                                return (
                                                    <FaStar style={star}/>
                                                )
                                            })}
                                        </div>
                                        
                                        <p>{_item.comment}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
         </div>
        )
    }
}

export default DetailProduct