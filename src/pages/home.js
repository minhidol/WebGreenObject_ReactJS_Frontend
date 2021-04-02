import React, {Component} from "react"
import Category from '../components/category'
import Products from '../components/good-products'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//import News from '../components/news'
import 'bootstrap/dist/css/bootstrap.min.css';
import _Cart from './cartProduct'
import News from '../components/news';

class home extends Component{
    
    componentDidMount(){
        console.log("home didmout");
    }

    render(){
        return(
            <div id='home'>
                <Category/>
                <Products/>
                
                {/* <News /> */}
           </div>
            
        )
    }
}

export default home;