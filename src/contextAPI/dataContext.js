import React, {Component} from 'react'
import axios from "axios"
import jwt_decode from 'jwt-decode'

export const DataContext = React.createContext();

  
export class DataProvider extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            name:'',
            cartItems:[],
            id_product:'',
            products:[],
            count:0,
            total:'0 đ',
            checklogin:false,
            address:'',
            phone:'',
            id:0,
            nameAdmin:'',
            list_bill:[],
            resultItems: [], //
            searchKeys: [], //

            itemsOrderStar: [], //
            itemsOrderTime: [], //
            itemsOrderPrice: [], //
            theBest:[],
        }
        this.addToCart = this.addToCart.bind(this)
        this.CheckLogin = this.CheckLogin.bind(this)
        this.sendProductId = this.sendProductId.bind(this)
        this._increase = this._increase.bind(this)
        this._reduction = this._reduction.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.getPriceProduct = this.getPriceProduct.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.logOut = this.logOut.bind(this)
        this.postComment = this.postComment.bind(this)
        this.removeDataCart = this.removeDataCart.bind(this)
        this.setUserId = this.setUserId.bind(this)
        this.setListBill = this.setListBill.bind(this)
        this.search = this.search.bind(this)
        this.setAdmin = this.setAdmin.bind(this)
    }

    componentDidMount(){
        console.log("context api");     
        axios.get('https://greenobjectdjangobackend.herokuapp.com/api/list_product/')
        .then(data=>{
            this.setState({
                products: data.data
            })
        })

        axios.get('https://greenobjectdjangobackend.herokuapp.com/api/itemsOrderStar/')
        .then(data=>{
            this.setState({
                itemsOrderStar: data.data
            })
            const temp = []
            for(var i = data.data.length-1; i > data.data.length-9; i--){
                temp.push(data.data[i])
            }
            console.log(temp)
            this.setState({
                theBest:temp
            })
        })

        axios.get('https://greenobjectdjangobackend.herokuapp.com/api/itemsOrderTime/')
        .then(data=>{
            this.setState({
                itemsOrderTime: data.data
            })
        })

        axios.get('https://greenobjectdjangobackend.herokuapp.com/api/itemsOrderPrice/')
        .then(data=>{
            this.setState({
                itemsOrderPrice: data.data
            })
        })

        const dataCart = JSON.parse(localStorage.getItem('dataCart'))
        if(dataCart !== null){
            this.setState({cartItems:dataCart})
        }

        const itemsOrderStar = JSON.parse(localStorage.getItem('itemsOrderStar'))
        if(itemsOrderStar !== null){
            this.setState({itemsOrderStar:itemsOrderStar})
        }

        const itemsOrderTime = JSON.parse(localStorage.getItem('itemsOrderTime'))
        if(itemsOrderTime !== null){
            this.setState({itemsOrderTime:itemsOrderTime})
        }

        const itemsOrderPrice = JSON.parse(localStorage.getItem('itemsOrderPrice'))
        if(itemsOrderPrice !== null){
            this.setState({itemsOrderPrice:itemsOrderPrice})
        }

        const theBest = JSON.parse(localStorage.getItem('theBest'))
        if(theBest !== null){
            this.setState({theBest:theBest})
        }

        const name = JSON.parse(localStorage.getItem('name'))
        if(name !== null){
            
            this.setState({
                name:name,
                // checklogin:true
            })
        }


        const total = JSON.parse(localStorage.getItem('total'))
        if(total !== null){
            this.setState({
                total:total
            })
        }
        const products = JSON.parse(localStorage.getItem('products'))
        if(products !== null){
            this.setState({
                products:products
            })
        }


        if(localStorage.getItem('access_token') != null){
            var decode = jwt_decode(localStorage.getItem('access_token'))
            console.log("user_id: ", decode.user_id)
            this.setState({
                name:decode.name,
                checklogin:true,
                address:decode.address,
                id:decode.user_id,
                phone:decode.phone
            })
            if(decode.user_id == 1){
                this.setState({
                    name:"ADMIN"
                })
            }
        }

    }

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cartItems))
        localStorage.setItem('total', JSON.stringify(this.state.total))
        localStorage.setItem('products', JSON.stringify(this.state.products))
        localStorage.setItem('name', JSON.stringify(this.state.name))
        localStorage.setItem('address', JSON.stringify(this.state.address))
        localStorage.setItem('phone', JSON.stringify(this.state.phone))
        localStorage.setItem('checkLogin', JSON.stringify(this.state.checklogin))
        localStorage.setItem('itemsOrderStar', JSON.stringify(this.state.itemsOrderStar))
        localStorage.setItem('itemsOrderTime', JSON.stringify(this.state.itemsOrderTime))
        localStorage.setItem('itemsOrderPrice', JSON.stringify(this.state.itemsOrderPrice))
        localStorage.setItem('theBest', JSON.stringify(this.state.theBest))
    }

    search(key) {
        let list = [];
        this.state.products.map(x => {
            if(x.name.toLowerCase().includes(key.toLowerCase())){
                list.push(x);
            }
        });

        this.setState(
            {
                resultItems: [...list],
                searchKeys: [key, ...this.state.searchKeys]
            }
        );
        
        console.log(list);
    }

    setAdmin(_name){
        this.setState({
            name:_name,
            checklogin:true
        })
    }

    setListBill(list_bill){
        this.setState({
            list_bill:list_bill
        })
    }

    setUserId(_id){
        this.setState({
            id:_id
        })
    }

    logOut(){
        var a = []
        this.setState({
            cartItems:a
        })
        this.setState({
            name:null,
            checklogin:false
        })

        localStorage.removeItem('access_token')
        localStorage.removeItem('dataCart')
        localStorage.removeItem('name')
    }

    postComment(eva){
        const {products} = this.state
        
        products.forEach(item=>
            {
                if(item.id === eva.id){
                    item.evalute_comment.push(eva)
                }
            }
        )
        
        this.setState({
            products:products
        })
        
    }

    removeDataCart(){
        const {products} = this.state
        products.forEach(item=>
            {
                item.count_client = 1
            })
        this.setState({
            cartItems:[]
        })
    }

    CheckLogin(name, phone, address, id){    
        this.setState({
            address:address,
            phone:phone,
            name:name,
            id:id,
            checklogin:true
        })
    }

    sendProductId(id){
        this.setState({
            id_product:id
        })
    }

    addToCart(product){
        const check = this.state.cartItems.every(item=>{
            return item.id !== product.id
        })
        if(this.state.checklogin == true){
            if(check){
                this.setState({
                    cartItems: this.state.cartItems.concat(product)
                })
                alert('Sản phẩm đã được thêm vào giỏ hàng')
            }
            else{
                alert('Sản phẩm đã có trong giỏ hàng')
            }
        }
        else{
            alert('Vui lòng đăng nhập')
        }
    }

    _reduction(product){
        const {cartItems} = this.state;
        cartItems.forEach(item => {
            if(item.id === product.id){
                item.count_client === 1 ? item.count_client = 1 : item.count_client -= 1
            }
        })
        this.setState({
            cartItems:cartItems
        })
        this.getTotal()
    }


    _increase(product){
        const {cartItems} = this.state;
        cartItems.forEach(item=>{
            if(item.id === product.id && item.count > item.count_client){
                item.count_client += 1
            }
            else if(item.id === product.id && item.count <= item.count_client){
                alert('Sản phẩm đã hết hàng')
            }
        })

        this.setState({
            cartItems:cartItems
        })
        this.getTotal()
    }
    
    removeProduct(items){
        if(window.confirm("Do you want to delete this product?")){
            const {cartItems} = this.state
            cartItems.forEach((item, index) =>{
                if(item.id === items.id){
                    cartItems.splice(index, 1)
                }
            })
            this.setState({
                cartItems:cartItems
            })
            this.getTotal()
        }
    }

    getPriceProduct_Number(a, b){
        var temp_str = a.substring(0, a.length-1)
        var _numTotal = Number(temp_str.split('.').join(''))*b
        return _numTotal
    }

    getTotal(){
        const {cartItems} = this.state
        const total = cartItems.reduce((sum, item)=>{
            return sum+this.getPriceProduct_Number(item.price, item.count_client)
        }, 0)
        
        var a = ' đ'
        var string_total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+a
        this.setState({
            total: string_total
        })
    }

    getPriceProduct(a, b){
        var temp_str = a.substring(0, a.length-1)
        var _numTotal = Number(temp_str.split('.').join(''))*b
        var a = ' đ'
        var string_total = _numTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+a
        return string_total;
    }
   

    render(){
        const {products, count, total, address, id, phone, resultItems, searchKeys, nameAdmin, theBest} = this.state
        return <DataContext.Provider value={{
            cartItems:this.state.cartItems,
            addToCart:this.addToCart ,
            isLoggedIn:this.state.isLoggedIn,
            CheckLogin:this.CheckLogin,
            log:this.state.log,
            name:this.state.name,
            _checkLogin1: this._checkLogin1,
            sendProductId:this.sendProductId,
            products,
            count,
            _reduction: this._reduction,
            _increase:this._increase,
            removeProduct:this.removeProduct,
            getPriceProduct:this.getPriceProduct,
            total,
            getTotal:this.getTotal,
            logOut:this.logOut,
            checklogin: this.state.checklogin,
            address,
            id,
            phone,
            postComment:this.postComment,
            removeDataCart:this.removeDataCart,
            setUserId:this.setUserId,
            setListBill:this.setListBill,
            list_bill:this.state.list_bill,
            search: this.search,
            resultItems,
            searchKeys,
            setAdmin:this.setAdmin,
            nameAdmin,
            theBest
            
        }}>
            {this.props.children}
        </DataContext.Provider>
    }
}